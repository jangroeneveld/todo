import * as React from "react";
import * as uuid from "uuid";
import { Paper, Typography, Grid, Card } from "material-ui";
import { Link } from "react-router-dom";
import { ProjectModel } from "../project.model";

export class ProjectComponent extends React.Component<{match: any}, {}> {

	state = {notes: [
		{id: uuid(), name: "Note"},
		{id: uuid(), name: "Note"},
		{id: uuid(), name: "Note"},
		{id: uuid(), name: "Note"}
	]};

	componentDidMount() {
		console.log(this.props.match.params.project);
		
	}

	render() {
		return(
			<div>
				<Paper>
					<Typography type="title" gutterBottom>
						hi
					</Typography>
				</Paper>
				<Grid container>
				{this.state.notes.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(note => {
					return <Grid key={note.id} item xs={12} sm={6}>
						<Card style={{height: 200}} className="selectable-project">
							<Typography type="button" color="accent" noWrap gutterBottom>{note.name}</Typography>
						</Card>
					</Grid>;
				})}
				</Grid>
			</div>
		);
	}
}