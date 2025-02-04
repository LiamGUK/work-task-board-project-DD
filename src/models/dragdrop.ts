// namespaces - TS exclusive feature which allows to share blocks of code in one file and to share them in another .ts file to use in there.
// namespace App {

// ES6 Modules behaviour - Import and export code.
// Drag & drop interfaces
export interface Draggable {
  dragStartHandler(e: DragEvent): void;
  dragEndHandler(e: DragEvent): void;
}

// Add export key to expose to outside of file
export interface DragTarget {
  // Valid drag target element
  dragOverHandler(e: DragEvent): void;
  // DropHandler will handle element placement in element
  dropHandler(e: DragEvent): void;
  // Visual confirmation for drag action finishing or not
  dragLeaveHandler(e: DragEvent): void;
}

// Can add anything inside a namespace
// const variable = 'variable';
// class ExampleClass {}
// }
