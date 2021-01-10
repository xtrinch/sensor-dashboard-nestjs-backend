import Forwarder, { ForwarderId } from "types/Forwarder";
import { getHeaders, getUrl, processResponse } from "utils/http";

export default class ForwarderService {
  public static listForwarders = async () => {
    const url = getUrl("/forwarders/my");

    const resp = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    const forwarders: Forwarder[] = [];
    for (const item of result.items) {
      forwarders.push(new Forwarder(item));
    }

    return {
      meta: result.meta,
      items: forwarders,
    };
  };

  public static addForwarder = async (
    forwarder: Partial<Forwarder>
  ): Promise<Forwarder> => {
    const url = getUrl("/forwarders");

    const resp = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
      body: JSON.stringify(forwarder),
    });

    const result = await processResponse(resp);
    const s = new Forwarder(result);
    return s;
  };

  public static updateForwarder = async (
    id: ForwarderId,
    forwarder: Partial<Forwarder>
  ): Promise<Forwarder> => {
    const url = getUrl(`/forwarders/${id}`);

    const resp = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
      body: JSON.stringify(forwarder),
    });

    const result = await processResponse(resp);
    const s = new Forwarder(result);
    return s;
  };

  public static getForwarder = async (id: ForwarderId): Promise<Forwarder> => {
    const url = getUrl(`/forwarders/${id}`);

    const resp = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    const s = new Forwarder(result);
    return s;
  };

  public static deleteForwarder = async (
    id: ForwarderId
  ): Promise<{ success: string }> => {
    const url = getUrl(`/forwarders/${id}`);

    const resp = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: getHeaders({ contentType: "application/json" }),
    });

    const result = await processResponse(resp);
    return result;
  };
}
