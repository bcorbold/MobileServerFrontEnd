export class User {
  // todo: do we want to add timezone here? That should most likely be pulled from the browser

  id: number | string;
  username: string;
  firstName: string;
  lastName?: string;
  currentPermissions: string; // todo(braden): should be an enum
  defaultPermissions: string; // todo(braden): should be an enum
  deskLocation: string; // todo: this should likely be an object with a friendly name
  locale: string;
}
