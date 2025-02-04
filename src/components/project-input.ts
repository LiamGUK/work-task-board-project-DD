// / <reference path="./base-component.ts" />
// / <reference path="../decorators/autobind.ts" />
// / <reference path="../utils/validation.ts" />
// / <reference path="../state/project-state.ts" />

// Need to include .js extension in TS import for when its compiled back to JS - If using bundling tool like webpack can omit the file extensions.
import { Component } from "./base-component";
// import { Validatable, validate } from "../utils/validation.js";

// If wanting to import multiple items under one name can group them with *
import * as Validation from "../utils/validation";
import { AutoBind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

// namespace App {
// main class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}

  // union return type on method to either return a tuple or noting (void)
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
    };

    if (
      // Can now use all imported functions/variables from validation file under Validation name assigned in group import
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again");
      return; // return nothing to work with void return type on function
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind // Decorator attached to method directly to auto bind this key word when called in below eventListener.
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;

      // Save to global single state array
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
// }
