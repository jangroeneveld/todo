import { LinkModel } from "./link.model";
import { HomeComponent } from "../home/home.component";
import { ProjectsComponent } from "../projects/projects.component";

export const links: LinkModel[] = [
	{ address: "home", exact: true, component: HomeComponent },
	{ address: "projects", component: ProjectsComponent }
];