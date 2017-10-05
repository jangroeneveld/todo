import * as annyang from "annyang";

export class SpeechInitialize {

	constructor() {
		let commands = {
			"go to (the) home(page)": () => { location.href = location.origin + "/#/home"; },
			"go to (the) project (page)": () => { location.href = location.origin + "/#/projects"; },
			"go to (the) projects (page)": () => { location.href = location.origin + "/#/projects"; },
			"(go) back": () => { history.back(); },
			"*thing": (thing) => { console.log(thing) }
		};
		annyang.addCommands(commands);
		annyang.start();
	}
}