import * as React from "react";
import * as firebase from "firebase";
import { Grid, Typography, Paper, List, ListItem, Checkbox, TextField, Button } from "material-ui";
import { Match } from "react-router-dom";

export class MeetingComponent extends React.Component<{match: Match}, {}> {
	componentDidMount() {
		firebase.firestore().collection("meetings").doc(this.props.match.params.meeting).onSnapshot(result => {
			let meeting = result.data();
			this.setState({meeting, tasksYesterday: meeting.tasksYesterday, newTasks: meeting.newTasks});
			let members = [];
			firebase.firestore().collection("projects").doc(meeting.projectId).onSnapshot(result => {
				let project = result.data();
				console.log(project);
				this.setState({
					members: project.members,
					isReady: true
				});
			});
		});
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ currentUser: user ? user : null });
		});
	}

	componentDidUpdate() {
		console.log(this.state);
	}

	state = {
		currentUser: null,
		meeting: null,
		members: [],
		tasksYesterday: {},
		newTasks: {},
		comments: {},
		isReady: false
	};

	render() {
		return (
			<Grid container>
				{(this.state.members.length > 2) && this.state.members.map(member => {
					console.log(this.state);
					return <Grid item xs={12}>
						<Paper>
							<Typography type="display1" gutterBottom>
								{member}
							</Typography>
							<Typography type="title" gutterBottom>
								Yesterday
							</Typography>
							<List>
								{this.state.tasksYesterday[member.toLowerCase()].map(task => {
									return <ListItem>
										<Checkbox checked={task.completed} onChange={() => {task.completed = !task.completed; this.forceUpdate(); }}/>
										<Typography onClick={() => {task.completed = !task.completed; this.forceUpdate(); }}>{task.description}</Typography>
									</ListItem>;
								})}
							</List>
							<Typography type="title" gutterBottom>
								today
							</Typography>
								{this.state.newTasks[member.toLowerCase()].map(task => {
									return <TextField multiline value={task.description} onChange={this.updateTask(task)} fullWidth style={{marginBottom: 16}}/>;
								})}
								<Button raised color="accent" onClick={() => { this.state.newTasks[member.toLowerCase()].push({description: "", completed: false}); this.forceUpdate(); }}>+ </Button>
							<Typography type="title" gutterBottom style={{marginTop: 16}}>
								Comments
							</Typography>
							<TextField value={this.state.comments[member.toLowerCase()]} multiline fullWidth/>
						</Paper>
					</Grid>;
				})}
				<Button onClick={this.finishMeeting}>Finish meeting</Button>
			</Grid>
		);
	}

	updateTask = (task) => (event) => {
		task.description = event.target.value;
		this.forceUpdate();
	}

	finishMeeting = async () => {
		await firebase.firestore().collection("meetings").doc(this.state.meeting.id).update({
			tasksYesterday: this.state.tasksYesterday,
			newTasks: this.state.newTasks,
			comments: this.state.comments
		});
		location.href = location.origin + "/#/meetings/" + this.state.meeting.projectId;
	}
}

class Task {
	description: string = "";
	completed: boolean = false;
}