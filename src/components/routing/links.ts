import { LinkModel } from "./link.model";
import { HomeComponent } from "../home/home.component";
import { ProjectsComponent } from "../projects/projects.component";
import { NotesComponent } from "../notes/notes.component";

export const links: LinkModel[] = [
	{ address: "home", exact: true, component: HomeComponent, listed: true },
	{ address: "projects", exact: true, component: ProjectsComponent, listed: true },
	{ address: "project/:project", exact: true, component: NotesComponent, listed: false}
];