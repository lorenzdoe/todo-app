const request = require('supertest');
const db = require('../db/db');
const app = require('../app');


describe('Test HTTP calls db conn', () => {

    beforeEach(async () => {
        await db.sync();
    });

    describe('POST /users (db)', () => {
            
        test('create user - username does not exist (no mock)', async () => {
            // Arrange
            let testUser = {
                username: 'Testuser',
                password: 'Testpassword'
            };
            
            // Act
            let response = await request(app)
            .post('/users')
            .send(testUser);  
            
            // Assert
            expect(response.statusCode).toBe(201);
            expect(response.body.username).toBe(testUser.username);

            }
        );

        test('create user - username already exists (no mock)', async () => {
            // Arrange
            let testUser = {
                username: 'Testuser',
                password: 'Testpassword'
            };
            
            // Act
            let response = await request(app)
            .post('/users')
            .send(testUser);  
            
            // Assert
            expect(response.statusCode).toBe(400);

            // Clean up
            await db.models.user.destroy({ where: {username: testUser.username } });
            }
        );
    });

    describe('POST /sessions', () => {
        test('login user - should work', async () => {
            // Arrange
            let testUser = {
                username: 'Testuser',
                password: 'Testpassword'
            };
            db.models.user.create(testUser);
    
            // Act
            let response = await request(app)
                .post('/sessions')
                .send(testUser);
    
            // Assert
            expect(response.statusCode).toBe(200);

            // Clean up
            await db.models.user.destroy({ where: {username: testUser.username } });
        }
        );

        test('login user - wrong credentials', async () => {
            // Arrange
            let testUser = {
                username: 'Testuser',
                password: 'Testpassword'
            };
            db.models.user.create(testUser);
    
            // Act
            let response = await request(app)
                .post('/sessions')
                .send({ username: 'Testuser', password: 'WrongPw' });
    
            // Assert
            expect(response.statusCode).toBe(401);

            // Clean up
            await db.models.user.destroy({ where: {username: testUser.username } });
        }
        );
        
    });

    describe('CREATE TODO', () => {
        test('login, create and find todo by username', async () => {
            // Arrange
            let testUser = {
                username: 'Test',
                password: 'TestPassword'
            };
            // create user
            await request(app)
                .post('/users')
                .send(testUser);

            // login user
            let arrangeResponse = await request(app)
                .post('/sessions')
                .send(testUser);
            let token = arrangeResponse.body.token;
            
            // Act
            let todo = {
                name: 'buy milk'
            };
            let createRes = await request(app)
                .post('/todos')
                .set('Authorization', `Baerer ${token}`)
                .send(todo);
            let todoId = createRes.body.id;
            let findRes = await request(app)
                .get('/todos')
                .set('Authorization', `Baerer ${token}`)
                .send();

            
            // Assert
            expect(createRes.statusCode).toBe(201);
            expect(findRes.statusCode).toBe(200);

            // clean up
            await db.models.todo.destroy({ where: {id: todoId } });
        }
        );
    });

});