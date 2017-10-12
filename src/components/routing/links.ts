import { LinkModel } from "./link.model";
import { HomeComponent } from "../home/home.component";
import { ProjectsComponent } from "../projects/projects.component";
import { MeetingComponent } from "../dsu/meeting/meeting.component";
import { ProjectComponent } from "../projects/project/project.component";

export const links: LinkModel[] = [
	{ address: "home", exact: true, component: HomeComponent, listed: true },
	{ address: "", exact: true, component: HomeComponent, listed: false },
	{ address: "projects", exact: true, component: ProjectsComponent, listed: true },
	{ address: "project/:project", exact: true, component: ProjectComponent, listed: false},
	{ address: "meeting/:meeting", exact: true, component: MeetingComponent, listed: false }
];