import * as React from "react";
import { Paper, Typography, TextField, Button, Grid } from "material-ui";

export class AddNoteComponent extends React.Component<{addNote: (note: string) => void}, {}> {

	state = {noteDescription: ""};

	render() {
		return(
			<Paper>
				<Typography type="title" gutterBottom>
					Add new project
				</Typography>
				<Grid container>
					<Grid item xs={12}>
						<TextField fullWidth label="Name" placeholder="New project" onChange={this.handleNameChange("newProjectName")}/>
					</Grid>
					<Grid item xs={12}>
						<Button raised color="accent" onClick={this.createProject}>Add project</Button>
					</Grid>
				</Grid>
			</Paper>
		);
	}

	handleNameChange = name => (event) => {
		this.setState({[name]: event.target.value});
	}

	createProject = () => {
		this.props.addNote(this.state.noteDescription);
	}
}