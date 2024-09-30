enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

type DoReq<T> = {
  url: string;
  httpMethod: HttpMethod;
  token?: string;
  body?: T | null;
  headerParams?: HeadersInit;
};

type Fetcher<T> = {
  body?: T | null;
  token?: string;
  headers?: HeadersInit;
};

async function doReq<T>({
  httpMethod,
  url,
  body,
  token,
  headerParams,
}: DoReq<T>) {
  const defaultHeaders = {
    Authorization: !!token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    method: httpMethod,
    mode: "cors",
    opentelemetry: {
      attributes: { url, httpMethod, token },
      spanName: `fetch - ${url}`,
    },
    headers: headerParams ? headerParams : defaultHeaders,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    throw new Error(`Request Error! - ${res.status} - ${res.statusText}`);
  }

  const result = await res.json();

  if (result.statusCode >= 400) {
    throw new Error(result.body);
  }

  return result.body;
}

export function fetcher<T>({ body, token, headers }: Fetcher<T>) {
  return {
    get: async (url: string): Promise<T> =>
      await doReq<T>({
        url,
        httpMethod: HttpMethod.GET,
        token,
        headerParams: headers,
      }),

    post: async (url: string): Promise<void> =>
      await doReq<T>({
        url,
        body,
        httpMethod: HttpMethod.POST,
        token,
        headerParams: headers,
      }),

    patch: async (url: string): Promise<void> =>
      await doReq<T>({
        url,
        httpMethod: HttpMethod.PATCH,
        body,
        token,
        headerParams: headers,
      }),

    put: async (url: string): Promise<void> =>
      await doReq<T>({
        url,
        httpMethod: HttpMethod.PUT,
        body,
        token,
        headerParams: headers,
      }),

    delete: async (url: string): Promise<void> =>
      await doReq<T>({
        url,
        httpMethod: HttpMethod.DELETE,
        token,
        headerParams: headers,
      }),
  };
}
