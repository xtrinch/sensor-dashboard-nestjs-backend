import { parseISO } from "date-fns";

export abstract class AbstractEntity {
  constructor(s) {
    this.createdAt = s?.createdAt ? parseISO(s.createdAt) : null;
    this.updatedAt = s?.updatedAt ? parseISO(s.updatedAt) : null;
  }

  createdAt: Date;

  updatedAt: Date;
}
