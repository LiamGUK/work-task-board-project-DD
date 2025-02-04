// Importing a namespace into another .ts file - Rather than importing all into one global file import namespaces into just the files required to prevent global breakages in code due to missing imports

// / <reference path="components/project-list.ts" />
// / <reference path="components/project-input.ts" />

import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

// Wrap entire codebase in same namespace name to use namespace exported values in this file.
// namespace App {
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
// }

console.log("TEST");
