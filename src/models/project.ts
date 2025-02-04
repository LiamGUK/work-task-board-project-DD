// Can create another namespace to use with other namespace but just needs to be given same name
// namespace App {
// Project types
export enum ProjectStatus {
  Active,
  Finished,
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
// }
