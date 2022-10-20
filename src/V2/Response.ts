export interface Apigatewayv2ResponseObject {
  statusCode: number;
  body?: string;
  headers?: Partial<{
    'Content-type': 'text/html'|'application/json';
    [key: string]: string;
  }>;
  cookies?: string[];
}

export class Response {
  static redirect(location: string, code = 302): Apigatewayv2ResponseObject {
    return {
      statusCode: code,
      body: '',
      headers: {
        Location: location,
      },
    };
  }

  static html(body: string, cookies: string[]|string|undefined): Apigatewayv2ResponseObject {
    if (cookies != undefined && !Array.isArray(cookies)) {
      cookies = [cookies];
    }
    return {
      statusCode: 200,
      body,
      headers: {
        'Content-type': 'text/html',
      },
      cookies,
    };
  }

  static error(code = 500) {
    return {
      statusCode: code,
    };
  }
}