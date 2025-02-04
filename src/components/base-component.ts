// namespace App {
// Component Base class - UI components rendered to screen
// Make class a generic as element and host element fields can change depending on type of element needed to be assigned.
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    // importNode method creates a copy of a html template element - need to pass in reference to template element in DOM and use content property to access all content.
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) this.element.id = newElementId; // Adds id to element to include style rules

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    const position: InsertPosition = insertAtStart ? "afterbegin" : "beforeend";
    this.hostElement.insertAdjacentElement(position, this.element);
  }

  // abstract methods - Both methods will need to be included in all instances of Component class
  abstract configure(): void;
  abstract renderContent(): void;
}
// }
