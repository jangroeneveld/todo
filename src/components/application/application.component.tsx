import * as React from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { AppBar, Toolbar, IconButton, Typography, Button, List, Drawer, Divider, MuiThemeProvider, createMuiTheme, Avatar } from "material-ui";
import { Menu, ChevronLeft } from "material-ui-icons";
import "./application.component.scss";
import { RouterOutletComponent } from "../routing/router-outlet.component";
import { LinksComponent } from "../routing/links.component";
import Paper from "material-ui/Paper/Paper";
import { SpeechInitialize } from "../../speech-control/speech-initialize";

export class ApplicationComponent extends React.Component<{}, {}> {
	state = {
		drawerOpen: false,
		currentUser: null
	};
	provider = new firebase.auth.GoogleAuthProvider();
	database = firebase.firestore();

	async componentDidMount() {
		new SpeechInitialize();
		await firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({currentUser: user});
			} else {
				this.setState({currentUser: null});
			}
		});
	}

	render() {
		return <div>
			<AppBar position="static">
				<Toolbar>
					<IconButton color="contrast" aria-label="Menu" onClick={() => { this.setState({ drawerOpen: !this.state.drawerOpen }); }}>
						<Menu />
					</IconButton>
					<Typography type="title" color="inherit" style={{ flex: 1 }}>
						Duly
					</Typography>
					{!this.state.currentUser && <Button color="contrast" onClick={this.signIn}>Login</Button>}
					{this.state.currentUser && <Avatar src={this.state.currentUser.photoURL} onClick={this.signOut}/>}
				</Toolbar>
			</AppBar>
			<Drawer type="persistent" open={this.state.drawerOpen} onClick={() => { this.setState({ drawerOpen: !this.state.drawerOpen }); }}>
				<Paper style={{ width: 300, height: "auto"}}>
					<List >
						<IconButton >
							<ChevronLeft onClick={() => { this.setState({ drawerOpen: !this.state.drawerOpen }); }} />
						</IconButton>
						<Divider />
					</List>
					<LinksComponent />
				</Paper>
			</Drawer>
			<MuiThemeProvider theme={this.getTheme.bind(this)}>
				<RouterOutletComponent />
			</MuiThemeProvider>
		</div>;
	}

	getTheme() {
		return createMuiTheme({
			overrides: {
				MuiPaper: {
					root: {
						padding: 16
					}
				}
			}
		});
	}

	signIn = () => {
		firebase.auth().signInWithPopup(this.provider).then(result => {
			if (result.user) {
				this.database.collection("users").doc(result.user.uid).get().then((document) => {
					if (!document.exists) {
						this.database.collection("users").doc(result.user.uid).set({
							uid: result.user.uid,
							photoURL: result.user.photoURL,
							ownedProjects: [],
							subscribedProjecs: []
						});
					}
				});
			}
		});
	}

	signOut = () => {
		firebase.auth().signOut();
		this.setState({currentUser: null});
	}
}
