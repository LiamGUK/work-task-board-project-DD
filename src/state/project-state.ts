import { Project, ProjectStatus } from "../models/project";

// namespace App {
type Listener<T> = (items: T[]) => void;

class State<T> {
  // protected field = can be accessed from child classes but not from outside the class
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// Project State management - singleton class - instance created inside class to prevent other instance versions being created (can only be one).
export class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static instance: ProjectState;

  // Private constructor prevents any instances of class being created outside of class - TS would flag an error.
  private constructor() {
    super();
  }

  // Add static method of creating instance outside of class - will check if instance has already been created (will return itself) otherwise if not already created will create a new one.
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    // Create new instance of Project Class to ensure always passing in correct inputs
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  // Changes project status when dragged into finished projects box
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    // Checks if element has changed position via newStatus variable - if dropping in same place won't re-render element on page (event will cancel)
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      // Use slice to create a copy of array to pass and updated copied around app rather than updating original array (prevent bugs)
      listenerFn(this.projects.slice());
    }
  }
}

// Using singleton class ensures that you only use one instance of class in entire app - will use same projects array to store state items, each other class will ensure storing to same array
export const projectState = ProjectState.getInstance();
// }
