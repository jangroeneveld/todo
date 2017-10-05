import * as React from "react";
import { List, ListItem, Typography, Paper } from "material-ui";
import { Link } from "react-router-dom";
import { LinkModel } from "./link.model";
import { HomeComponent } from "../home/home.component";
import { links } from "./links";

export class LinksComponent extends React.Component<{}, {}> {

	render() {
		return (
			<List >
				{links.filter(link => {
					console.log(link);
					return link.listed === true;
				}).map(link => {
					return <Link to={"/" + link.address} style={{ textDecoration: "none" }} >
						<ListItem>
							<Typography type="button" color="accent">{link.address}</Typography>
						</ListItem>
					</Link>;
				})}
			</List>
		);
	}
}