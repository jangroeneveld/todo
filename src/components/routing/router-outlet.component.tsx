import * as React from "react";
import { Route } from "react-router-dom";
import { HomeComponent } from "../home/home.component";
import { links } from "./links";
import { Grid } from "material-ui";

export class RouterOutletComponent extends React.Component<{}, {}> {
	render() {
		return (
			<Grid container style={{maxWidth: "100%"}} justify="space-around">
				<Grid item xs={12} md={6} xl={4}>
					<Route path="/" redirectTo="/home" />
					{links.map(link => {
						return <Route path={"/" + link.address} exact={link.exact} component={link.component} />;
					})}
				</Grid>
			</Grid>
		)
	}
}