import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Export under a different name for nice code completion
 */
export interface ApiGatewayV1Response extends APIGatewayProxyResult {
}

/**
 * Utility class for sending API gateway v2 responses
 */
export class Response {

  static redirect(location: string, code = 302, cookies?: string[] | string): ApiGatewayV1Response {
    const cookieHeaderValue = this.cookieHeaderValue(cookies);
    const response: ApiGatewayV1Response = {
      statusCode: code,
      body: '',
      headers: {
        Location: location,
      },
    };
    return Response.withCookieHeader(cookieHeaderValue, response);
  }

  static html(body: string, code = 200, cookies?: string[] | string): ApiGatewayV1Response {
    const cookieHeaderValue = this.cookieHeaderValue(cookies);
    return Response.withCookieHeader(cookieHeaderValue, {
      statusCode: code,
      body,
      headers: {
        'Content-type': 'text/html',
      },
    });
  }

  static error(code = 500, message?: string): ApiGatewayV1Response {

    if (message) {
      return this.json({ message: message }, code);
    }

    return {
      statusCode: code,
      body: message ?? 'unknown error',
    };
  }

  static json(json: any, code = 200, cookies?: string[] | string): ApiGatewayV1Response {
    const cookieHeaderValue = this.cookieHeaderValue(cookies);
    const body = JSON.stringify(json);
    return Response.withCookieHeader(cookieHeaderValue, {
      statusCode: code,
      body,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  static csv(csv: string, csvFileName: string, code = 200): ApiGatewayV1Response {
    return {
      statusCode: code,
      body: csv,
      headers: {
        'Content-type': 'text/csv',
        'Content-Disposition': `attachment;filename=${csvFileName}`,
      },
    };
  }

  static ok(code = 200, message?: string): ApiGatewayV1Response {
    if (code < 200 || code >= 300) {
      throw new Error('Only 2xx statuscodes are allowed');
    }

    if (message) {
      return this.json({ message: message }, code);
    }

    return {
      statusCode: code,
      body: '',
    };
  }

  private static cookieHeaderValue(cookies?: string[] | string) {
    if (cookies != undefined && !Array.isArray(cookies)) {
      cookies = [cookies];
    }
    return cookies ? cookies?.join('; ') : null;
  }


  private static withCookieHeader(cookieheader: string | null, response: ApiGatewayV1Response) {
    if (cookieheader) {
      response.headers!.Cookie = cookieheader;
    }
    return response;
  }

}
