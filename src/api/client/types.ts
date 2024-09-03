interface CustomDirectusUser {
  type: "parent" | "teacher";
}

export interface Schema {
  directus_users: CustomDirectusUser;
}
