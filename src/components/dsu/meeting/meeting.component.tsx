import * as React from "react";
import { Grid, Typography, Paper, List, ListItem, Checkbox, TextField, Button } from "material-ui";

export class MeetingComponent extends React.Component<{}, {}> {
	state = {
		members: ["Bruno", "Jan", "Mark", "Mike"],
		tasksYesterday:  [
			{ description: "Research naar libaries om te gebruiken", completed: false },
			{ description: "Mentorgesprek", completed: false }
		],
		newTasks: [""]
	};

	render() {
		return (
			<Grid container>
				{this.state.members.map(member => {
					return <Grid item xs={12}>
						<Paper>
							<Typography type="display1" gutterBottom>
								{member}
							</Typography>
							<Typography type="title" gutterBottom>
								Yesterday
							</Typography>
							<List>
								{this.state.tasksYesterday.map(task => {
									return <ListItem>
										<Checkbox checked={task.completed} onChange={() => {task.completed = !task.completed; this.forceUpdate(); }}/>
										<Typography onClick={() => {task.completed = !task.completed; this.forceUpdate(); }}>{task.description}</Typography>
									</ListItem>;
								})}
							</List>
							<Typography type="title" gutterBottom>
								today
							</Typography>
								{this.state.newTasks.map(task => {
									return <TextField multiline fullWidth style={{marginBottom: 16}}/>;
								})}
								<Button raised color="accent" onClick={() => { this.state.newTasks.push(""); this.forceUpdate(); }}>+ </Button>
							<Typography type="title" gutterBottom style={{marginTop: 16}}>
								problems
							</Typography>
							<TextField multiline fullWidth/>
						</Paper>
					</Grid>;
				})}
			</Grid>
		);
	}
}

class Task {
	description: string;
	completed: boolean = false;
}