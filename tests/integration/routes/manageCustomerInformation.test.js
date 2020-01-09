const request = require('supertest');

let server;
let app;

const http = require('http');
const db = require('../../../sequelizeSettings.js');

const bcrypt = require('bcrypt');
const Customer = require('../../../models/customer.js');
const Owner = require('../../../models/owner.js');


describe('/api/user/customer', () => {

    //start the server before each test suite
    beforeEach( done => {
        app = require('../../../router.js');
        server = http.createServer(app);
        server.listen(done);
    });

    //close the server after each test suite, otherwise the port is still running
    afterEach( done => {
        server.close(done);
    });

    //close the db connection after all the tests
    afterAll (() => {
        db.close();
    });

    describe('GET /', () => {

        let token;

        const exec = async () => {
            return await request(app)
                .get('/api/user/customer')
                .set('x-auth-token', token)
        };

        //it should return a 200 because the data sent are related to a valid customer
        it('should return a 200', async () => {
            //first of all, create the customer in the database
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash("123456", salt);

            await Customer.create({
                Username: "manageCustomerInformation",
                Email: "manageCustomerInformation@mail.com",
                Password: hashed
            });

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "manageCustomerInformation", password: "123456", isRestaurantOwner: false});

            //then try to access the endpoint as an customer
            token = tokenObject.body.token;
            const res = await exec();

            //remove the previously created customer from the database
            await Customer.destroy({
                where: {
                    Username: "manageCustomerInformation"
                }
            });
        //    console.log(res);

            expect(res.status).toBe(200);

        });

        //it should return a 400 because the user is a owner, not a customer
        it('should return a 400', async () => {
            //first of all, create the owner in the database
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash("123456", salt);

            await Owner.create({
                Username: "manageCustomerInformation",
                Name: "Emilio",
                Surname: "Imperiali",
                Email: "emilio@mail.com",
                Password: hashed
            });

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "manageCustomerInformation", password: "123456", isRestaurantOwner: true});

            //then try to access the endpoint as an owner
            token = tokenObject.body.token;
            const res = await exec();

            //remove the previously created owner from the database
            await Owner.destroy({
                where: {
                    Username: "manageCustomerInformation"
                }
            });

            expect(res.status).toBe(401);

        })


    })


    describe('PUT /', () => {

        let token;

        const exec = async () => {
            return await request(app)
                .put('/api/user/customer')
                .set('x-auth-token', token)
                .send({
                    "email": "emilioimperiali12345customer@mail.it",
                    "gender": "Male",
                    "ageRange": "24-34",
                    "nationality": "Italy"
                })
        };

        //it should return a 200 because the data sent are related to a valid customer
        it('should return a 200', async () => {
            //first of all, create the customer in the database
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash("123456", salt);

            await Customer.create({
                Username: "manageCustomerInformation",
                Email: "emilio@mail.com",
                Password: hashed
            });

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "manageCustomerInformation", password: "123456", isRestaurantOwner: false});

            //then try to access the endpoint as an customer
            token = tokenObject.body.token;
            const res = await exec();

            //remove the previously created customer from the database
            await Customer.destroy({
                where: {
                    Username: "manageCustomerInformation"
                }
            });
             //   console.log(res);

            expect(res.status).toBe(200);

        });

        //it should return a 400 because the user is a owner, not a customer
        it('should return a 400', async () => {
            //first of all, create the owner in the database
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash("123456", salt);

            await Owner.create({
                Username: "manageCustomerInformation",
                Name: "Emilio",
                Surname: "Imperiali",
                Email: "manageCustomerInformation@mail.com",
                Password: hashed
            });

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "manageCustomerInformation", password: "123456", isRestaurantOwner: true});

            //then try to access the endpoint as an owner
            token = tokenObject.body.token;
            const res = await exec();

            //remove the previously created owner from the database
            await Owner.destroy({
                where: {
                    Username: "manageCustomerInformation"
                }
            });

            expect(res.status).toBe(401);

        })


    })

    describe('DELETE /', () => {

        let token;

        const exec = async () => {
            return await request(app)
                .delete('/api/user/customer')
                .set('x-auth-token', token)
        };

        //it should return a 200 because the data sent are related to a valid customer
        it('should return a 200', async () => {
            //first of all, create the customer in the database
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash("123456", salt);

            await Customer.create({
                Username: "manageCustomerInformation",
                Email: "manageCustomerInformation@mail.com",
                Password: hashed
            });

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "manageCustomerInformation", password: "123456", isRestaurantOwner: false});

            //then try to access the endpoint as an customer
            token = tokenObject.body.token;
            const res = await exec();

            //remove the previously created customer from the database
            await Customer.destroy({
                where: {
                    Username: "manageCustomerInformation"
                }
            });
            //   console.log(res);

            expect(res.status).toBe(200);

        });

        //it should return a 400 because the user is a owner, not a customer
        it('should return a 400', async () => {
            //first of all, create the owner in the database
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash("123456", salt);

            await Owner.create({
                Username: "manageCustomerInformation",
                Name: "Emilio",
                Surname: "Imperiali",
                Email: "manageCustomerInformation@mail.com",
                Password: hashed
            });

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "manageCustomerInformation", password: "123456", isRestaurantOwner: true});

            //then try to access the endpoint as an owner
            token = tokenObject.body.token;
            const res = await exec();

            //remove the previously created owner from the database
            await Owner.destroy({
                where: {
                    Username: "manageCustomerInformation"
                }
            });

            expect(res.status).toBe(401);

        })


    })

    describe('PUT /password', () => {

        let token;

        const exec = async () => {
            return await request(app)
                .put('/api/user/customer/password')
                .set('x-auth-token', token)
                .send({
                    "oldPassword": "123456",
                    "newPassword": "654321"
                })
        };

        //it should return a 200 because the data sent are related to a valid customer
        it('should return a 200', async () => {
            //first of all, create the customer in the database
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash("123456", salt);

            await Customer.create({
                Username: "manageCustomerInformation",
                Email: "manageCustomerInformation@mail.com",
                Password: hashed
            });

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "manageCustomerInformation", password: "123456", isRestaurantOwner: false});

            //then try to access the endpoint as an customer
            token = tokenObject.body.token;
            const res = await exec();

            //remove the previously created customer from the database
            await Customer.destroy({
                where: {
                    Username: "manageCustomerInformation"
                }
            });
            //   console.log(res);

            expect(res.status).toBe(200);

        });

        //it should return a 400 because password is wrong
        it('should return a 400', async () => {
            //first of all, create the owner in the database
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash("1234567", salt);

            await Customer.create({
                Username: "manageCustomerInformation",
                Name: "Emilio",
                Surname: "Imperiali",
                Email: "manageCustomerInformation@mail.com",
                Password: hashed
            });

            //then login to get the token
            const tokenObject = await request(app)
                .post('/api/user/login')
                .send({username: "manageCustomerInformation", password: "1234567", isRestaurantOwner: false});

            //then try to access the endpoint as an owner
            token = tokenObject.body.token;
            const res = await exec();

            //remove the previously created owner from the database
            await Customer.destroy({
                where: {
                    Username: "manageCustomerInformation"
                }
            });

            expect(res.status).toBe(400);

        })


    })

});