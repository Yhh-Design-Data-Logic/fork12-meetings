export enum UserType {
  TEACHER = "Teacher",
  PARENT = "Parent",
}

export type DirectusError = {
  errors: { message: string; extensions: { code: string } }[];
  response?: Response;
};
