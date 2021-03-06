import * as React from "react";
import { Paper, Grid, Button, Card, CardMedia, CardContent } from "material-ui";
import { Link } from "react-router-dom";

export class HomeComponent extends React.Component<{}, {}> {
	render() {
		return (
			<Grid container style={{ width: "100%", margin: 0 }} spacing={40} justify="center" align="center">
				<Grid item xs={12} md={6}>
					<Card raised style={{ maxWidth: 380, height: 400, padding: 0, margin: "auto" }}>
						<CardMedia style={{ height: 300 }} image="http://www.personal.psu.edu/users/n/y/nys5290/Project-Image.jpg" />
						<CardContent>
							<Link to="/projects"><Button raised>Projects</Button></Link>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		);
	}
}