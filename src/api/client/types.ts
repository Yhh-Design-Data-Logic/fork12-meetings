import { DirectusUser } from "@directus/sdk";

export type Meeting = {
  id: number;
  parent: number | Parent;
  teacher: number | Teacher;
  timeslot: number | Timeslot;
};

export type Parent = {
  id: number;
  name: string;
  user: string | DirectusUser<CustomDirectusUser>;
  children: number[];
  meetings: number[];
};
export type Child = {
  id: number;
  name: string;
  parent: number | Parent;
  teachers: number[] | ChildrenTeachers[];
};

export type Teacher = {
  id: number;
  name: string;
  user: string | DirectusUser<CustomDirectusUser>;
  timeslots: number[] | Timeslot[];
  meetings: number[] | Meeting[];
};

export type Timeslot = {
  id: number;
  teacher: number | Teacher;
  start_date: string;
  end_date: string;
  meeting: number[] | Meeting[];
};

type ChildrenTeachers = {
  id: number;
  children_id: number | Parent;
  teachers_id: number | Teacher;
};

interface CustomDirectusUser {
  type: "parent" | "teacher";
  parent: Parent | null;
  teacher: Teacher | null;
}

export interface Schema {
  meetings: Meeting[];
  parents: Parent[];
  children: Child[];
  teachers: Teacher[];
  timeslots: Timeslot[];

  children_teachers: ChildrenTeachers[];

  directus_users: CustomDirectusUser;
}
