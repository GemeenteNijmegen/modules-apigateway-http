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

  static redirect(location: string, cookies?: string[] | string, code = 302): ApiGatewayV2Response {
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

  static html(body: string, cookies?: string[] | string, code = 200): ApiGatewayV2Response {
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
    let body = !message ? undefined : {
      body: JSON.stringify({ message: message }),
      headers: {
        'Content-type': 'application/json',
      },
    };

    return {
      statusCode: code,
      ...body,
    };
  }

}