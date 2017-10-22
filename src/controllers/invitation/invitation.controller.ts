import * as firebase from "firebase";
import * as uuid from "uuid";
import { InvitationModel } from "./invitation.model";

export class InvitationController {

	async sendInvitation (projectId: string, userEmail: string, projectName: string) {
		let uniqueId = uuid();
		await firebase.firestore().collection("invitations").doc(uniqueId).set({projectId: projectId, userEmail: userEmail.toLowerCase(), id: uniqueId, projectName: projectName});
		return true;
	}

	async acceptInivitation (invitation: InvitationModel) {
		let userPromise = await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get();
		let user = userPromise.data();
		let subscribedProjects = [invitation.projectId].concat(user.subsribedProjects || []);
		firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({subscribedProjects});
		firebase.firestore().collection("projects").doc(invitation.projectId).update({subscriberUids: {[firebase.auth().currentUser.uid]: true}});
		firebase.firestore().collection("invitations").doc(invitation.id).delete();
		return true;
	}

	async withdrawInvitation (invitation: InvitationModel) {
		await firebase.firestore().collection("invitations").doc(invitation.id).delete();
		return true;
	}

	async getInvitationsForEmail (userEmail: string) {
		let invitations: InvitationModel[] = [];
		await firebase.firestore().collection("invitations").where("userEmail", "==", userEmail.toLowerCase()).get().then(snapshot => {
			snapshot.forEach(invitation => {
				let invite = invitation.data();
				invitations.push(invite as InvitationModel);
			});
		});
		return invitations;
	}
}