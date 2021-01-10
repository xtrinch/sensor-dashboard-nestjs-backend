import Display, { DisplayId } from "types/Display";
import { getHeaders, getUrl, processResponse } from "utils/http";

export default class DisplayService {
  public static listDisplays = async () => {
    const url = getUrl("/displays/my");

    const resp = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    const displays: Display[] = [];
    for (const item of result.items) {
      displays.push(new Display(item));
    }

    return {
      meta: result.meta,
      items: displays,
    };
  };

  public static addDisplay = async (
    display: Partial<Display>
  ): Promise<Display> => {
    const url = getUrl("/displays");

    const resp = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
      body: JSON.stringify(display),
    });

    const result = await processResponse(resp);
    const s = new Display(result);
    return s;
  };

  public static updateDisplay = async (
    id: DisplayId,
    display: Partial<Display>
  ): Promise<Display> => {
    const url = getUrl(`/displays/${id}`);

    const resp = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
      body: JSON.stringify(display),
    });

    const result = await processResponse(resp);
    const s = new Display(result);
    return s;
  };

  public static getDisplay = async (id: DisplayId): Promise<Display> => {
    const url = getUrl(`/displays/${id}`);

    const resp = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    const s = new Display(result);
    return s;
  };

  public static deleteDisplay = async (
    id: DisplayId
  ): Promise<{ success: string }> => {
    const url = getUrl(`/displays/${id}`);

    const resp = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    return result;
  };
}
