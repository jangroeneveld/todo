import * as React from "react";
import * as firebase from "firebase";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ApplicationComponent } from "./components/application/application.component";
import { MuiThemeProvider, createMuiTheme } from "material-ui";
import { blue, amber } from "material-ui/colors";
import { HashRouter } from "react-router-dom";
const config = require("./resources/firebase.config.json");

const rootEl = document.getElementById("root");

const theme = createMuiTheme({
	palette: {
		type: "light",
		primary: blue,
		secondary: amber
	},
	overrides: {
		MuiButton: {
			// Name of the styleSheet
			root: {
				// Name of the rule
				background: "linear-gradient(-45deg, #3a6186 30%, #89253e 90%);",
				borderRadius: 3,
				border: 0,
				color: "white",
				height: 48,
				padding: "0 30px",
				boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .60)",
			}
		}
	}
});

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

render(
	<AppContainer>
		<MuiThemeProvider theme={theme}>
			<HashRouter>
				<ApplicationComponent />
			</HashRouter>
		</MuiThemeProvider>
	</AppContainer>,
	rootEl
);

declare let module: { hot: any };

if (module.hot) {
	module.hot.accept();
}