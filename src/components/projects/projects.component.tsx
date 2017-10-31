import "./projects.component.scss";
import "firebase/firestore";

import * as firebase from "firebase";
import { Button, Card, Grid, LinearProgress, Paper, Typography } from "material-ui";
import * as React from "react";
import { Link } from "react-router-dom";

import { InvitationController } from "../../controllers/invitation/invitation.controller";
import { ProjectController } from "../../controllers/project/project.controller";
import { ProjectModel } from "../../controllers/project/project.model";
import { UserController } from "../../controllers/user/user.controller";
import { AddProjectComponent } from "./add-project.component";

export class ProjectsComponent extends React.Component<{}, {}> {

	async componentDidMount() {
		await firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.getProjects();
			}
		});
		this.getProjects();
	}

	componendDidUnmount() {
		// annyang.removeCommands(["select project :val", "new project :name"]);
	}

	state = {
		ownedProjects: [],
		subscribedProjects: [],
		invitations: [],
		recievedOwnedProjects: true,
		recievedSubscribedProjects: true,
		recievedInvitations: true
	};

	invitationController: InvitationController = new InvitationController();
	projectController: ProjectController = new ProjectController();
	userController: UserController = new UserController();

	render() {
		return (
			<div>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<Paper>
							<Typography type="title" gutterBottom>
								Owned Projects
							</Typography>
							{!this.state.recievedOwnedProjects && <LinearProgress color="accent" mode="query" />}
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
							{!this.state.recievedSubscribedProjects && <LinearProgress mode="query" />}
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

					<Grid item xs={12}>
						<Paper>
							<Typography type="title" gutterBottom>
								Invitations
							</Typography>
							{!this.state.recievedInvitations && <LinearProgress mode="query" />}
						</Paper>
					</Grid>

					{this.state.invitations.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(invitation => {
						return <Grid key={invitation.id} item xs={12} sm={6}>
							<Card style={{ height: 200 }}>
								<Typography type="button" color="accent" noWrap gutterBottom>{invitation.projectName}</Typography>
								<Button onClick={() => { this.invitationController.acceptInivitation(invitation); }}> Accept </Button>
								<Button onClick={() => { this.invitationController.withdrawInvitation(invitation); }}> Decline </Button>
							</Card>
						</Grid>;
					})}
				</Grid>
			</div>
		);
	}

	addProject = async (newProjectName: string) => {
		let createdProject = await this.projectController.createProject(newProjectName);
		if (!createdProject) return;
		await this.userController.addOwnedProject(firebase.auth().currentUser.uid, createdProject);

		let ownedProjects = this.state.ownedProjects;
		ownedProjects.push(createdProject);
		this.setState(ownedProjects);
	}

	getProjects = async () => {
		if (!firebase.auth().currentUser) return;
		this.setState({ recievedOwnedProjects: false, recievedSubscribedProjects: false, recievedInvitations: false });
		this.projectController.getOwnedProjectsContinuous(firebase.auth().currentUser.uid, this.updateOwnedProjecs);
		this.projectController.getSubscribedProjectsContinuous(firebase.auth().currentUser.uid, this.updateSubscribedProjects);
		this.setState({
			invitations: await this.invitationController.getInvitationsForEmail(firebase.auth().currentUser.email),
			recievedInvitations: true
		});
	}

	updateOwnedProjecs = async (projects: ProjectModel[]) => {
		this.setState({ ownedProjects: projects, recievedOwnedProjects: true });
	}

	updateSubscribedProjects = async (projects: ProjectModel[]) => {
		this.setState({ subscribedProjects: projects, recievedSubscribedProjects: true });
	}
}
