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