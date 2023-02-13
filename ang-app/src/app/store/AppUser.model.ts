export class AppUser {
  userName: String;
  status: Boolean;
  constructor(obj: any) {
    this.userName = obj.userName;
    this.status = obj.status;
  }
}
