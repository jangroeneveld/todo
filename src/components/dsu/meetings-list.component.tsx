import * as React from "react";
import { Grid, Typography, Paper } from "material-ui";
import { Link } from "react-router-dom";

import "./meetings-list.component.scss";

export class MeetingsListComponent extends React.Component<{}, {}> {
	meetings: string[] = ["1/10/17", "2/10/17", "1/10/17", "2/10/17", "1/10/17", "2/10/17"];

	render() {
		return (
			<Grid container>
				{this.meetings.map(meeting => {
					return <Grid xs={12} sm={6} md={4} item>
						<Link to="/meeting/a">
							<Paper className="selectable-meeting">
								<Typography type="title">{meeting}</Typography>
							</Paper>
						</Link>
					</Grid>;
				})}
			</Grid>
		);
	}
}