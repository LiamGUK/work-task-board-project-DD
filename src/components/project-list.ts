// / <reference path="./base-component.ts" />
// / <reference path="../decorators/autobind.ts" />
// / <reference path="../state/project-state.ts" />
// / <reference path="../models/project.ts" />
// / <reference path="../models/dragdrop.ts" />

import { Component } from "./base-component";
import { DragTarget } from "../models/dragdrop";
import { AutoBind } from "../decorators/autobind";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project-state";
import { ProjectItem } from "./project-item";

// namespace App {
// ProjectList Class - extend from Component class as pass in field element types as arguments to generic class to assign them as those types.
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(e: DragEvent): void {
    // Check if drag event has data assigned from startHandler method and has a matching type set on data method in startHandler = only then will this method execute.
    if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault(); // prevent default to allow drop action from drag action
      const listEl = this.element.querySelector("ul")!;
      // Adds styling for visual que of element being dragged over target
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dropHandler(e: DragEvent): void {
    // Grabs the id value set on event object in startHandler method - to identify which element is being dragged and dropped.
    const prjId = e.dataTransfer!.getData("text/plain");
    const actionType =
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished;
    projectState.moveProject(prjId, actionType);
  }

  @AutoBind
  dragLeaveHandler(_2: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = ""; // empty HTML on each render to prevent duplicates
    for (const prjItem of this.assignedProjects) {
      // Create new instance of ProjectItem class to use renderContent method to output content to page.
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") return prj.status === ProjectStatus.Active;
        else return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
}
// }
