import * as annyang from "annyang";

export class SpeechInitialize {

	constructor() {
		let commands = {
			"go to (the) home(page)": () => { location.href = location.origin + "/#/home"; },
			"go to (the) project (page)": () => { location.href = location.origin + "/#/projects"; },
			"go to (the) projects (page)": () => { location.href = location.origin + "/#/projects"; },
			"(go) back": () => { history.back(); },
			"what is :query": (query: string) => { window.open("https://www.google.com/search?q=" + query)}
		};
		annyang.addCommands(commands);
		annyang.start({ autoRestart: true, continuous: false });
	}
}