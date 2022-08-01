import supertest from "supertest";
import app from "../../src/app";

const api = '/recommendations';

describe('testing creation of recommendations', () => {
    const body = { name:'recommendation 2', youtubeLink: 'https://www.youtube.com/watch?v=2NTyyCwwDfY' };
    it('create recommendation should return 201', async () => {
        const { status } = await supertest(app).post(`${api}/`).send(body);
        expect(status).toEqual(201);
    });
    it('crash request should return 409', async () => {
        const { status } = await supertest(app).post(`${api}/`).send(body);
        expect(status).toEqual(409);
    });
    it('crash request should return 422', async () => {
        const { status } = await supertest(app).post(`${api}/`).send({...body, a: 'a'});
        expect(status).toEqual(422);
    });
});

describe('testing getting recommendations', () => {
    it('get all recommendations should return 200. Body is optional', async () => {
        const { status } = await supertest(app).get(`${api}/`);
        expect(status).toEqual(200);
    });
    it('get recommendation by id should return 200', async () => {
        const { status, body } = await supertest(app).get(`${api}/1`);
        expect(status).toEqual(200);
        expect(body).not.toBeNull;
    });
    it('get a null recommendation return 404', async () => {
        const { status, body } = await supertest(app).get(`${api}/0`);
        expect(status).toEqual(404);
        expect(body).toBeNull;
    });
    it('get a amount of recommendations should return 200', async () => {
        const random = Math.floor((Math.random() * 100) + 1);
        const { status, body } = await supertest(app).get(`${api}/top/${random}`);
        expect(status).toEqual(200);
        expect(body).not.toBeNull;
    });
    it('get a random recommendation should return 200', async () => {
        const { status, body } = await supertest(app).get(`${api}/random`);
        expect(status).toEqual(200);
        expect(body).not.toBeNull;
    });
});

describe('testing votes in recommendations', () => {
    it('up vote a recommendation should return 200', async () => {
        const { status } = await supertest(app).post(`${api}/1/upvote`);
        expect(status).toEqual(200);
    });
    it('down vote a recommendation should return 200', async () => {
        const { status } = await supertest(app).post(`${api}/1/downvote`);
        expect(status).toEqual(200);
    });
    it('up vote a recommendation should return 404', async () => {
        const { status } = await supertest(app).post(`${api}/0/upvote`);
        expect(status).toEqual(404);
    });
    it('down vote a recommendation should return 404', async () => {
        const { status } = await supertest(app).post(`${api}/0/downvote`);
        expect(status).toEqual(404);
    });
});