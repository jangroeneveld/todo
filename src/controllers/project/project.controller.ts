import * as firebase from "firebase";
import * as uuid from "uuid";
import { ProjectModel } from "./project.model";

export class ProjectController {

	async createProject (projectName: string) {
		if (projectName.length < 3) return false;
		if (!firebase.auth().currentUser) return false;
		let uid = firebase.auth().currentUser.uid;
		let uniqueId = uuid();
		await firebase.firestore().collection("projects").doc(uniqueId).get().then(result => {
			if (result.exists) {
				return this.createProject(projectName);
			}
		});
		return await firebase.firestore().collection("projects").doc(uniqueId).set({id: uniqueId, ownerUid: uid, name: projectName});
	}

	async addMemberToProject (project: ProjectModel, newMemberName: string) {
		if (!firebase.auth().currentUser) return false;
		await firebase.firestore().collection("projects").doc(project.id).update({members: [newMemberName].concat(project.members)});
		return true;
	}

	async addSubscriberToProject (project: ProjectModel, newSubscriberUid: string) {
		if (!firebase.auth().currentUser) return false;
		await firebase.firestore().collection("projects").doc(project.id).update({subscriberUids: {[newSubscriberUid]: true}});
		return true;
	}

	async getProject (projectId: string) {
		if (!firebase.auth().currentUser) return false;
		let project = firebase.firestore().collection("projects").doc(projectId).get().then(snapshot => {
			if (!snapshot.exists) return false;
			return snapshot.data() as ProjectModel;
		});
		return project;
	}

	async getProjectContinuous (projectId: string, callback: (ProjectModel) => void) {
		let project = firebase.firestore().collection("projects").doc(projectId).onSnapshot(snapshot => {
			if (!firebase.auth().currentUser || !snapshot.exists ) return null;
			callback(snapshot.data() as ProjectModel);
		});
	}

	async updateLastMeetingId (projectId: string, meetingId: string) {
		if (!firebase.auth().currentUser) return false;
		await firebase.firestore().collection("projects").doc(projectId).update({lastMeetingId: meetingId});
		return true;
	}
}