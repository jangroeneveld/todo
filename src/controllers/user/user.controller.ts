import * as firebase from "firebase";
import { UserModel } from "./user.model";
import { ProjectModel } from "../project/project.model";

export class UserController {

	async createUser (user: firebase.User) {
		if (!firebase.auth().currentUser) return false;
		await firebase.firestore().collection("users").doc(user.uid).get().then((document) => {
			if (!document.exists) {
				firebase.firestore().collection("users").doc(user.uid).set({
					email: user.email,
					uid: user.uid,
					photoURL: user.photoURL,
				});
				return true;
			}
		});
		return false;
	}

	async getUser (uid: string) {
		if (!firebase.auth().currentUser) return false;
		return await firebase.firestore().collection("users").doc(uid).get().then((document) => {
			return document.data() as UserModel;
		});
	}

	async addOwnedProject (uid: string, project: ProjectModel) {
		if (!firebase.auth().currentUser) return false;
		let user = await this.getUser(uid);
		if (!user) return false;
		await firebase.firestore().collection("users").doc(uid).update({ownedProjects: [project.id].concat(user.ownedProjects)});
		return true;
	}

	async addSubscribedProject (uid: string, project: ProjectModel) {
		if (!firebase.auth().currentUser) return false;
		let user = await this.getUser(uid);
		if (!user) return false;
		await firebase.firestore().collection("users").doc(uid).update({subscribedProjects: [project.id].concat(user.subscribedProjects)});
		return true;
	}
}