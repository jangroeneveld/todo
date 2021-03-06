import * as React from "react";
import * as firebase from "firebase";
import * as moment from "moment";
import * as uuid from "uuid";
import "firebase/firestore";
import { Grid, Typography, Paper, TextField, Button, List, ListItem } from "material-ui";
import { Link, Match } from "react-router-dom";
import { InvitationController } from "../../../controllers/invitation/invitation.controller";

import "./project.component.scss";
import { ProjectController } from "../../../controllers/project/project.controller";
import { ProjectModel } from "../../../controllers/project/project.model";

export class ProjectComponent extends React.Component<{ match: Match }, {}> {

	async componentDidMount() {
		this.projectController.getProjectContinuous(this.props.match.params.project, (project: ProjectModel) => {
			if (!project) return;
			this.setState({
				project: project,
				members: project.members || [],
			});
			firebase.firestore().collection("meetings").where("projectId", "==", project.id).onSnapshot(result => {
				let meetings = [];
				result.forEach(meeting => meetings.push(meeting.data()));
				this.setState({meetings});
			});
		});
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ currentUser: user ? user : null });
		});
	}

	projectController: ProjectController = new ProjectController();
	invitationController: InvitationController = new InvitationController();
	member: string;
	subscriber: string;

	state = {
		currentUser: null,
		project: null,
		members: [],
		meetings: []
	};

	render() {
		return (
			<Grid container>
				{(this.userIsOwner() && !!this.state.members.length) && <Grid item xs={12}>
					<Paper>
						<Button onClick={this.startNewMeeting} raised>Start meeting</Button>
					</Paper>
				</Grid>}
				{this.state.meetings.sort((m1, m2) => { return moment["default"].utc(m2.date) - moment["default"].utc(m1.date); }).map(meeting => {
					return <Grid xs={12} md={6} item>
						<Link to={"/meeting/" + meeting.id}>
							<Paper className="selectable-meeting">
								<Typography type="title">{meeting.date}</Typography>
							</Paper>
						</Link>
					</Grid>;
				})}
				<Grid xs={12} md={6} item>
					<Paper>
						<Typography type="title" gutterBottom>Members</Typography>
						<List>
							{this.state.members.map(member => {
								return <ListItem>{member}</ListItem>;
							})}
						</List>
					</Paper>
				</Grid>
				{this.userIsOwner() && ["member", "subscriber"].map(role => <Grid item xs={12} md={6}>
					<Paper>
						<Grid container spacing={8}>
							<Grid item xs={6}>
								<Typography type="title">Add a {role}</Typography>
							</Grid>
							<Grid item xs={6}>
								<Button raised onClick={this.postNewUser(role)} style={{float: "right"}}>Add {role}</Button>
							</Grid>
							<Grid item xs={12}>
								<TextField value={this[role]} onChange={this.handleChange(role)} fullWidth />
							</Grid>
						</Grid>
					</Paper>
				</Grid>)}
			</Grid>
		);
	}

	handleChange = name => (event: any) => {
		this[name] = event.target.value;
		this.forceUpdate();
	}

	postNewUser = name => () => {
		switch (name) {
			case "member":
				this.projectController.addMemberToProject(this.state.project, this.member);
				this.member = "";
				this.forceUpdate();
				break;
			case "subscriber":
				this.invitationController.sendInvitation(this.state.project.id, this.subscriber, this.state.project.name);
				this.subscriber = "";
				this.forceUpdate();
				break;
		}
	}

	userIsOwner = () => {
		if (!this.state.project || !this.state.currentUser) return false;
		return this.state.project.ownerUid === firebase.auth().currentUser.uid;
	}

	startNewMeeting = async () => {
		if (!firebase.auth().currentUser) return;
		let meeting = {
			date: moment["default"]().format("YYYY-MM-DD HH:mm:ss"),
			id: uuid(),
			projectId: this.state.project.id
		};
		await firebase.firestore().collection("meetings").doc(meeting.id).get().then(result => {
			if (result.exists) {
				this.startNewMeeting();
				return;
			} else {
				let tasksYesterday = {};
				this.state.members.forEach(member => tasksYesterday[member.toLowerCase()] = []);
				let newTasks = {};
				this.state.members.forEach(member => newTasks[member.toLowerCase()] = [{description: "", completed: false}]);
				if (this.state.project.lastMeetingId) {
					firebase.firestore().collection("meetings").doc(this.state.project.lastMeetingId).get().then(result => {
						tasksYesterday = result.data().newTasks;
						firebase.firestore().collection("meetings").doc(meeting.id).set({
							date: meeting.date,
							id: meeting.id,
							projectId: this.state.project.id,
							tasksYesterday: tasksYesterday,
							newTasks: newTasks
						}).then(async () => {
							await this.projectController.updateLastMeetingId(this.state.project.id, meeting.id);
							location.href = location.origin + "/#/meeting/" + meeting.id;
						});
						return;
					});
				}
				firebase.firestore().collection("meetings").doc(meeting.id).set({
					date: meeting.date,
					id: meeting.id,
					projectId: this.state.project.id,
					tasksYesterday: tasksYesterday,
					newTasks: newTasks
				}).then(async () => {
					await this.projectController.updateLastMeetingId(this.state.project.id, meeting.id);
					location.href = location.origin + "/#/meeting/" + meeting.id;
				});
			}
		});
	}
}