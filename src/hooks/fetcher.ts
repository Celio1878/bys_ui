enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

type MakeReq<T> = {
  url: string;
  http_method: HttpMethod;
  token?: string;
  body?: T;
};

async function make_req<T>({ http_method, url, body, token }: MakeReq<T>) {
  const res = await fetch(url, {
    method: http_method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok)
    throw new Error(`Request Error! - ${res.status} - ${res.statusText}`);

  return await res.json();
}

export function fetcher<T>(data?: T, token?: string) {
  return {
    get: async (url: string): Promise<T> =>
      await make_req<T>({ url, http_method: HttpMethod.GET }),

    post: async (url: string): Promise<void> =>
      await make_req<T>({
        url,
        body: data,
        http_method: HttpMethod.POST,
        token,
      }),

    patch: async (url: string): Promise<void> =>
      await make_req<T>({
        url,
        http_method: HttpMethod.PATCH,
        body: data,
        token,
      }),

    put: async (url: string): Promise<void> =>
      await make_req<T>({
        url,
        http_method: HttpMethod.PUT,
        body: data,
        token,
      }),

    delete: async (url: string, token: string): Promise<void> =>
      await make_req<void>({ url, http_method: HttpMethod.DELETE, token }),
  };
}
