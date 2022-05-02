import { urlJoin } from "@taqueria/protocol/url-join"

export interface IUrlParams {
  key: string;
  value: string;
}

export interface IUrlParse {
  protocol?: string;
  hostname?: string;
  pathname?: Array<string> | string;
  port?: string | number;
  username?: string;
  password?: string;
  query?: Array<IUrlParams> | null;
}

export interface IUrl {
  href: string;
  origin: string;
  host: string;
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  hash: string;
  search: string;
  toString: () => string;
}

export const urlParse = (
  data: IUrlParse | string | null | undefined = {}
): IUrl => {
  let url = new URL("http://localhost");
  let innerData: IUrlParse = {};

  if (typeof data === "string") {
    url = new URL(data);

    if (url.protocol) {
      innerData.protocol = url.protocol;
    }
    if (url.hostname) {
      innerData.hostname = url.hostname;
    }
    if (url.port) {
      innerData.port = url.port;
    }
    if (url.username) {
      innerData.username = url.username;
    }
    if (url.password) {
      innerData.password = url.password;
    }
    if (url.searchParams) {
      url.searchParams.forEach((value, key) => {
        innerData?.query?.push({ value, key });
      });
    }
  } else {
    if (!data) {
      // if null or undefined
      innerData = {};
    } else {
      // if data exists
      innerData = data;
    }
  }

  const {
    protocol = "http",
    hostname,
    pathname,
    port,
    username,
    password,
    query = null,
  } = innerData;

  if (!protocol || !hostname) {
    throw new Error("You should at least set the protocol and the hostname");
  }

  if (protocol) {
    url.protocol = protocol;
  }

  if (hostname) {
    url.hostname = hostname;
  }

  if (pathname) {
    if (Array.isArray(pathname)) {
      url.pathname = urlJoin(...pathname);
    } else {
      url.pathname = pathname;
    }
  }

  if (typeof port === "number") {
    url.port = String(port).toString();
  } else {
    if (port) {
      url.port = port;
    }
  }
  if (username) {
    url.username = username;
  }
  if (password) {
    url.password = password;
  }
  if (query && Array.isArray(query)) {
    query.forEach(({ key, value }) => {
      url.searchParams.append(key, value);
    });
  }

  const result: IUrl = {
    href: url.href,
    origin: url.origin,
    protocol: url.protocol,
    username: url.username,
    password: url.password,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    hash: url.hash,
    search: url.search,
    toString() {
      return this.href;
    },
  };

  if (protocol) {
    const toUseProtocol = protocol.trim().endsWith(":")
      ? protocol.trim()
      : `${protocol.trim()}:`;

    result.href = result.href.replace(result.protocol, toUseProtocol);
    result.origin = result.origin.replace(result.protocol, toUseProtocol);
    result.protocol = toUseProtocol;
  }

  return result;
};