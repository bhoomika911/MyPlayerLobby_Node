const app = require('./../../server'); // Link to your server file
const supertest = require('supertest'); // For hitting http request from code
const request = supertest(app);

describe('User REST api testing', () => {
    test('GET : Get user list api', async () => {
        const res = await request
            .get('/user/list');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    });

    test('POST : Add user API', async () => {
        const res = await request
            .post('/user/add')
            .send({
                role: "admin",
                userid: "b1@gmail.com",
                password: "123456"
            });
        expect(res.statusCode).toEqual(200);
    });

    test('POST : Login user API(Success)', async () => {
        const res = await request
            .post('/user/login')
            .send({
                role: "admin",
                userid: "b1@gmail.com",
                password: "123456"
            });
        expect(res.statusCode).toEqual(200);
    });

    test('POST : Login user API(User not found)', async () => {
        const res = await request
            .post('/user/login')
            .send({
                role: "admin",
                userid: "b1111@gmail.com",
                password: "123456"
            });
        expect(res.body.code).toEqual(500);
        expect(res.body.message).toEqual("User not found");
    });

    test('POST : Login user API(Invalid credential)', async () => {
        const res = await request
            .post('/user/login')
            .send({
                role: "admin",
                userid: "b1@gmail.com",
                password: "123456777"
            });
        expect(res.body.code).toEqual(500);
        expect(res.body.message).toEqual("Invalid credentials...");
    });
});