import { Button, Grid, Paper, TextField, Typography } from "material-ui";
import * as React from "react";

export class AddProjectComponent extends React.Component<{ addProject: (newProjectName: string) => void }, {}> {

	state = { newProjectName: "" };

	render() {
		return (
			<Paper>
				<Typography type="title" gutterBottom>
					Add new project
				</Typography>
				<Grid container>
					<Grid item xs={12}>
						<TextField fullWidth label="New project name"
							value={this.state.newProjectName}
							placeholder="New project"
							onChange={this.handleNameChange("newProjectName")} />
					</Grid>
					<Grid item xs={12}>
						{(this.state.newProjectName.length > 3) && <Button raised onClick={this.createProject}>Add project</Button>}
					</Grid>
				</Grid>
			</Paper>
		);
	}

	handleNameChange = name => (event) => {
		this.setState({ [name]: event.target.value });
	}

	createProject = () => {
		this.props.addProject(this.state.newProjectName);
		this.setState({ newProjectName: "" });
	}
}