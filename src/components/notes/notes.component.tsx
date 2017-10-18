import * as React from "react";
import * as uuid from "uuid";
import { Paper, Typography, Grid, Card } from "material-ui";
import { Link, Match } from "react-router-dom";

export class NotesComponent extends React.Component<{ match: Match }, {}> {

	state = {
		notes: [
			{ id: uuid(), name: "Note" },
			{ id: uuid(), name: "Note" },
			{ id: uuid(), name: "Note" },
			{ id: uuid(), name: "Note" }
		]
	};

	render() {
		return (
			<div>
				<Grid container>
					<Grid item xs={12}>
						<Paper>
							<Typography type="title" gutterBottom>
								{this.props.match.name}
							</Typography>
						</Paper>
					</Grid>

					{this.state.notes.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(note => {
						return <Grid key={note.id} item xs={12} sm={6}>
							<Card style={{ height: 200 }} className="selectable-project">
								<Typography type="button" color="accent" noWrap gutterBottom>{note.name}</Typography>
							</Card>
						</Grid>;
					})}
				</Grid>
			</div>
		);
	}
}