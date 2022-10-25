import { Response } from '../src/V2/Response';


describe('redirect', () => {

  test('default status', () => {
    const r1 = Response.redirect('nijmegen.nl'); // 302
    expect(r1.statusCode).toBe(302);
    expect(r1.headers?.Location).toBe('nijmegen.nl');
  });

  test('custom status', () => {
    const r2 = Response.redirect('csp-nijmegen.nl', undefined, 304);
    expect(r2.statusCode).toBe(304);
    expect(r2.headers?.Location).toBe('csp-nijmegen.nl');
  });

});


describe('html', () => {
  const cookie1 = 'session=blabla';
  const cookie2 = 'session2=blabla';

  test('200 without cookies', () => {
    const r1 = Response.html('<html></html>'); // 200
    expect(r1.statusCode).toBe(200);
    expect(r1.cookies).toBeUndefined();
    expect(r1.headers).not.toBeUndefined();
    if (r1.headers) {
      expect(r1.headers['Content-type']).toBe('text/html');
    }
  });

  test('custom status with single cookie', () => {
    const r2 = Response.html('<html></html>', cookie1, 404);
    expect(r2.statusCode).toBe(404);
    expect(r2.cookies).toContain(cookie1);
  });

  test('with multiple cookie', () => {
    const r3 = Response.html('<html></html>', [cookie1, cookie2]);
    expect(r3.cookies).toContain(cookie1);
    expect(r3.cookies).toContain(cookie2);
  });

});

describe('error', () => {

  test('500 response', () => {
    const r1 = Response.error(); // 500
    expect(r1.statusCode).toBe(500);
    expect(r1.body).toBeUndefined();
    expect(r1.headers).toBeUndefined();
  });

  test('custom response status', () => {
    const r2 = Response.error(401);
    expect(r2.statusCode).toBe(401);
    expect(r2.body).toBeUndefined();
    expect(r2.headers).toBeUndefined();
  });

  test('custom response status and body', () => {
    const r3 = Response.error(401, 'Unauthorized');
    expect(r3.statusCode).toBe(401);
    expect(r3.body).toBe(JSON.stringify({
      message: 'Unauthorized',
    }));
    expect(r3.headers).not.toBeUndefined();
    if (r3.headers) {expect(r3.headers['Content-type']).toBe('application/json');}
  });

});