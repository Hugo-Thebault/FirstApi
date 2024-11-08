import { expect, test } from 'vitest';
import got from 'got';

const client = got.extend({
    prefixUrl: 'http://localhost:3000/',
    responseType: 'json',
    throwHttpErrors: false,
});

test('POST /signup', async ()=> {
    const res = await client.post('signup', {
        json: {
            email: 'indexindex',
            username: 'indexindex',
            password: 'indexindex',
        },
        responseType: 'json'
    });
    const data = res.body;
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.username).toBe('indexindex');
    expect(data).to.not.have.property('indexindex');
});

test('POST /login', async ()=> {
    const res = await client.post('login', {
        json: {
            email: 'indexindex',
            password: 'indexindex',
        },
        responseType: 'json'
    });
    const data = res.body;
    expect(res.statusCode).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('username');
    expect(data).toHaveProperty('token');
    expect(data.id).to.not.be.null;
    expect(data.username).to.not.be.null;
    expect(data.token).to.not.be.null;
    expect(data.password).to.not.exist;
    expect(data.email).to.not.exist;
});