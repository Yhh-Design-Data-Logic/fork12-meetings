export class UserSessionNotFoundError extends Error {
  constructor() {
    super("User session not found in storage.");
    this.name = "UserSessionNotFoundError";
  }
}
