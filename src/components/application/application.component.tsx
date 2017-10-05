import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, List, Drawer, Divider, MuiThemeProvider, createMuiTheme } from "material-ui";
import { Menu, ChevronLeft } from "material-ui-icons";
import "./application.component.scss";
import { RouterOutletComponent } from "../routing/router-outlet.component";
import { LinksComponent } from "../routing/links.component";
import Paper from "material-ui/Paper/Paper";
import { SpeechInitialize } from "../../speech-control/speech-initialize";

export class ApplicationComponent extends React.Component<{}, {}> {
	state = { drawerOpen: false };

	componentDidMount() {
		let speechInitialize = new SpeechInitialize();
	}

	render() {
		return <div>
			<AppBar style={{marginTop: 0, padding: 0}} position="static">
				<Toolbar>
					<IconButton color="contrast" aria-label="Menu" onClick={() => { this.setState({ drawerOpen: !this.state.drawerOpen }); }}>
						<Menu />
					</IconButton>
					<Typography type="title" color="inherit" style={{ flex: 1 }}>
						Duly
					</Typography>
					<Button color="contrast">Login</Button>
				</Toolbar>
			</AppBar>
			<Drawer type="persistent" style={{padding: 0, margin: 0 }} open={this.state.drawerOpen} onClick={() => { this.setState({ drawerOpen: !this.state.drawerOpen }); }}>
				<Paper style={{ width: 300, height: "auto" }}>
					<List >
						<IconButton >
							<ChevronLeft onClick={() => { this.setState({ drawerOpen: !this.state.drawerOpen }); }} />
						</IconButton>
						<Divider />
					</List>
					<LinksComponent />
				</Paper>
			</Drawer>
			<RouterOutletComponent />
		</div>;
	}
}
