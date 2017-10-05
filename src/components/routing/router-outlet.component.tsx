import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { HomeComponent } from "../home/home.component";
import { links } from "./links";
import { Grid } from "material-ui";

export class RouterOutletComponent extends React.Component<{}, {}> {
	render() {
		return (
			<Grid container style={{width: "100%", margin: 0}} justify="space-around">
				<Grid style={{maxWidth: "100%"}} item xs={12}>
					{links.map(link => {
						return <Route path={"/" + link.address} exact={link.exact} component={link.component} />;
					})}
				</Grid>
			</Grid>
		);
	}
}