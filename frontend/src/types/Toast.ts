import { v4 } from "uuid";

export class Toast {
  public id: string;

  public message: string;

  public type: "success" | "failure";

  constructor(t: { message: string; type: "success" | "failure" }) {
    this.id = v4();
    this.message = t?.message;
    this.type = t?.type;
  }
}
