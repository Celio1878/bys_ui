enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

type MakeReq<T> = {
  url: string;
  httpMethod: HttpMethod;
  token?: string;
  body?: T | null;
};

type Fetcher<T> = {
  body?: T | null;
  token?: string;
};

async function make_req<T>({ httpMethod, url, body, token }: MakeReq<T>) {
  const res = await fetch(url, {
    method: httpMethod,
    headers: {
      Authorization: !!token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    throw new Error(`Request Error! - ${res.status} - ${res.statusText}`);
  }

  const result = await res.json();

  return result.body;
}

export function fetcher<T>({ body, token }: Fetcher<T>) {
  return {
    get: async (url: string): Promise<T> =>
      await make_req<T>({ url, httpMethod: HttpMethod.GET, token }),

    post: async (url: string): Promise<void> =>
      await make_req<T>({
        url,
        body,
        httpMethod: HttpMethod.POST,
        token,
      }),

    patch: async (url: string): Promise<void> =>
      await make_req<T>({
        url,
        httpMethod: HttpMethod.PATCH,
        body,
        token,
      }),

    put: async (url: string): Promise<void> =>
      await make_req<T>({
        url,
        httpMethod: HttpMethod.PUT,
        body,
        token,
      }),

    delete: async (url: string): Promise<void> =>
      await make_req<T>({ url, httpMethod: HttpMethod.DELETE, token }),
  };
}
