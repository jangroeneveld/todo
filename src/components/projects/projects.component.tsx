import * as React from "react";
import * as uuid from "uuid";
import * as annyang from "annyang";
import * as firebase from "firebase";
import "firebase/firestore";
import { Typography, Paper, Button, Grid, Card } from "material-ui";
import { AddProjectComponent } from "./add-project.component";
import { Launch } from "material-ui-icons";
import { Link } from "react-router-dom";
import "./projects.component.scss";
import { ProjectModel } from "./project.model";

export class ProjectsComponent extends React.Component<{}, {}> {

	async componentDidMount() {
		let commands = {
			"select project :val": (val: string) => {
				console.log(val);
				let project = [].concat(this.state.ownedProjects, this.state.subscribedProjects).find(p => p.name.toLowerCase() === val.toLowerCase());
				if (project) { location.href = location.origin + "/#/project/" + project.id; }
			},
			"new project :name": (name: string) => {
				this.addProject(name);
				this.forceUpdate();
			}
		};
		annyang.addCommands(commands);
		await firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.getProjects();
			}
		});
		this.getProjects();
	}

	componendDidUnmount() {
		annyang.removeCommands(["select project :val", "new project :name"]);
	}

	state = {
		ownedProjects: [
			{ name: "Project a", id: uuid() }
		],
		subscribedProjects: []
	};

	render() {
		return (
			<div>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<Paper>
							<Typography type="title" gutterBottom>
								Owned Projects
							</Typography>
						</Paper>
					</Grid>

					{this.state.ownedProjects.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(project => {
						return <Grid key={project.id} item xs={12} sm={6}>
							<Link to={"/project/" + project.id} style={{ textDecoration: "none" }}>
								<Card style={{ height: 200 }} className="selectable-project">
									<Typography type="button" color="accent" noWrap gutterBottom>{project.name}</Typography>
								</Card>
							</Link>
						</Grid>;
					})}
					<Grid item xs={12}>
						<AddProjectComponent addProject={this.addProject} />
					</Grid>

					<Grid item xs={12}>
						<Paper>
							<Typography type="title" gutterBottom>
								Subscribed Projects
							</Typography>
						</Paper>
					</Grid>

					{this.state.subscribedProjects.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(project => {
						return <Grid key={project.id} item xs={12} sm={6}>
							<Link to={"/project/" + project.id} style={{ textDecoration: "none" }}>
								<Card style={{ height: 200 }} className="selectable-project">
									<Typography type="button" color="accent" noWrap gutterBottom>{project.name}</Typography>
								</Card>
							</Link>
						</Grid>;
					})}
				</Grid>
			</div>
		);
	}

	addProject = async (newProjectName: string) => {
		if (!firebase.auth().currentUser) return;
		let project: ProjectModel = new ProjectModel();
		project.name = newProjectName;
		project.id = uuid();
		project.ownerUid = firebase.auth().currentUser.uid;
		await firebase.firestore().collection("projects").doc(project.id).get().then(result => {
			if (result.exists) {
				this.addProject(newProjectName);
				return;
			} else {
				firebase.firestore().collection("projects").doc(project.id).set({
					name: project.name,
					ownerUid: project.ownerUid,
					memberUids: project.memberUids,
					id: project.id
				}).then(() => {
					firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then(user => {
						let ownedProjects = user.data().ownedProjects;
						ownedProjects.push(project.id);
						firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({ownedProjects: ownedProjects});
					});
					let ownedProjects = this.state.ownedProjects;
					ownedProjects.push(project);
					this.setState(ownedProjects);
				});
			}
		});
	}

	getProjects = () => {
		if (!firebase.auth().currentUser) return;
		firebase.firestore().collection("projects").where("ownerUid", "==", firebase.auth().currentUser.uid).onSnapshot(querySnapshot => {
			let ownedProjects = [];
			querySnapshot.forEach(doc => {
				ownedProjects.push(doc.data());
			});
			this.setState({ownedProjects});
		});
		firebase.firestore().collection("projects").where("memberUids." + firebase.auth().currentUser.uid, "==", true).onSnapshot(querySnapshot => {
			let subscribedProjects = [];
			querySnapshot.forEach(doc => {
				subscribedProjects.push(doc.data());
			});
			this.setState({subscribedProjects});
		});
	}
}
