import { setError } from "context/ErrorContext";

export const serializeQuery = (params, prefix = ""): string => {
  if (!params) {
    return "";
  }

  const query: string[] = Object.keys(params).map((key) => {
    let kk = key;
    const value = params[key];
    if (!value) {
      return "";
    }

    if (params.constructor === Array) kk = `${prefix}[]`;
    else if (params.constructor === Object)
      kk = prefix ? `${prefix}[${kk}]` : kk;

    if (typeof value === "object" && !(value instanceof Date)) {
      return serializeQuery(value, kk);
    }
    return `${kk}=${encodeURIComponent(value)}`;
  });

  return query.join("&");
};

export const getUrl = (urlString: string, queryParams: object = {}): string => {
  const url = `/api${urlString}`;
  const p = serializeQuery(queryParams);
  return `${url}${p ? `?${p}` : ""}`;
};

export const getHeaders = (params: {
  contentType?: string;
}): { [key: string]: string } => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  Accept: "application/json",
  ...(params.contentType ? { "Content-Type": params.contentType } : undefined),
});

export const processResponse = async (response) => {
  const responseData = await response.json();

  if (response.status >= 200 && response.status <= 399) {
    return responseData;
  }
  if (response.status !== 400) {
    setError(responseData);
  }
  throw responseData;
};
