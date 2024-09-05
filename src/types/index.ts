export enum UserType {
  TEACHER = "teacher",
  PARENT = "parent",
}

export type DirectusError = {
  errors: { message: string; extensions: { code: string } }[];
  response?: Response;
};
