import * as React from "react";
import * as uuid from "uuid";
import * as annyang from "annyang";
import { Typography, Paper, Button, Grid, Card } from "material-ui";
import { AddProjectComponent } from "./add-project.component";
import { Launch } from "material-ui-icons";
import { Link } from "react-router-dom";
import "./projects.component.scss";
import { ProjectModel } from "./project.model";

export class ProjectsComponent extends React.Component<{}, {}> {

	componentDidMount() {
		let commands = {
			"select project :val": (val: string) => {
				console.log(val);
				let project = this.state.projects.find(p => p.name.toLowerCase() === val.toLowerCase());
				if (project) { location.href = location.origin + "/#/project/" + project.id; }
			},
			"new project :name": (name: string) => {
				this.addProject(name);
				this.forceUpdate();
			}
		};
		annyang.addCommands(commands);
	}

	componendDidUnmount() {
		annyang.removeCommands(["select project :val", "new project :name"]);
	}

	state = {projects: [
		{name: "Project", id: uuid()},
		{name: "a", id: uuid()},
		{name: "c", id: uuid()},
		{name: "B", id: uuid()},
		{name: "project", id: uuid()},
	]};

	render() {
		return (
			<div>
				<Paper>
					<Typography type="title" gutterBottom>
						Projects
					</Typography>
					<Typography type="caption" gutterBottom>
						Different groups of notes
					</Typography>
				</Paper>
				<Grid container spacing={8}>
				{this.state.projects.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(project => {
					return <Grid key={project.id} item xs={12} sm={6}>
						<Link to={"/project/" + project.id} style={{textDecoration: "none"}}>
							<Card style={{height: 200}} className="selectable-project">
								<Typography type="button" color="accent" noWrap gutterBottom>{project.name}</Typography>
							</Card>
						</Link>
					</Grid>;
				})}
				</Grid>
				<AddProjectComponent addProject={this.addProject}/>
			</div>
		);
	}

	addProject = (newProjectName: string) => {
		console.log(newProjectName);
		let projects = this.state.projects;
		projects.push({name: newProjectName, id: uuid()});
		this.setState({projects: projects});
	}
}
