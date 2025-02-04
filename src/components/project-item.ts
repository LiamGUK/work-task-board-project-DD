// / <reference path="./base-component.ts" />
// / <reference path="../decorators/autobind.ts" />
// / <reference path="../models/project.ts" />
// / <reference path="../models/dragdrop.ts" />

// ES6 module imports
import { Draggable } from "../models/dragdrop";
import { Project } from "../models/project";
import { Component } from "./base-component";
import { AutoBind } from "../decorators/autobind";

// namespace App {
// ProjectItem Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  get persons() {
    if (this.project.people === 1) return "1 person";
    else return `${this.project.people} persons`;
  }

  @AutoBind
  dragStartHandler(e: DragEvent) {
    // dataTransfer part of drag event object - allows to attach data to event which can be read when drag event finishes.
    e.dataTransfer!.setData("text/plain", this.project.id);
    // effectAllowed controls the visual effect of mouse cursor during event and intention of drag event - setting 'move' informs browser that element will change position.
    e.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(e: DragEvent) {
    console.log(e, "DRAG END");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
// }
