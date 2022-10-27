import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

/**
 * Export under a different name for nice code completion
 */
export interface ApiGatewayV2Response extends APIGatewayProxyStructuredResultV2 {
}

/**
 * Utility class for sending API gateway v2 responses
 */
export class Response {

  static redirect(location: string, code = 302, cookies?: string[] | string): ApiGatewayV2Response {
    if (cookies != undefined && !Array.isArray(cookies)) {
      cookies = [cookies];
    }
    return {
      statusCode: code,
      body: '',
      headers: {
        Location: location,
      },
      cookies,
    };
  }

  static html(body: string, code = 200, cookies?: string[] | string): ApiGatewayV2Response {
    if (cookies != undefined && !Array.isArray(cookies)) {
      cookies = [cookies];
    }
    return {
      statusCode: code,
      body,
      headers: {
        'Content-type': 'text/html',
      },
      cookies,
    };
  }

  static error(code = 500, message?: string): ApiGatewayV2Response {

    if (message) {
      return this.json({ message: message }, code);
    }

    return {
      statusCode: code,
    };
  }

  static json(json: any, code = 200): ApiGatewayV2Response {
    const body = JSON.stringify(json);
    return {
      statusCode: code,
      body,
      headers: {
        'Content-type': 'application/json',
      },
    };
  }

  static ok(code = 200, message?: string): ApiGatewayV2Response {
    if (code < 200 || code >= 300) {
      throw new Error('Only 2xx statuscodes are allowed');
    }

    if (message) {
      return this.json({ message: message }, code);
    }

    return { statusCode: code };
  }

}