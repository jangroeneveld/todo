import * as React from "react";
import { Paper, Typography, TextField, Button, Grid } from "material-ui";

export class AddProjectComponent extends React.Component<{addProject: (newProjectName: string) => void}, {}> {

	state = {newProjectName: ""};

	render() {
		return(
			<Paper>
				<Typography type="title" gutterBottom>
					Add new project
				</Typography>
				<Grid container>
					<Grid item xs={12}>
						<TextField fullWidth label="New project name" placeholder="New project" onChange={this.handleNameChange("newProjectName")}/>
					</Grid>
					<Grid item xs={12}>
						<Button raised onClick={this.createProject}>Add project</Button>
					</Grid>
				</Grid>
			</Paper>
		);
	}

	handleNameChange = name => (event) => {
		this.setState({[name]: event.target.value});
	}

	createProject = () => {
		this.props.addProject(this.state.newProjectName);
	}
}