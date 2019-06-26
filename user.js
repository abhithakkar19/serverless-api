const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const pool = require('./configs/dbConfig')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Handle pokemon GET route for all pokemon
app.get('/getUsers', (req, res) => {
    const query = 'SELECT * FROM user'
    pool.getConnection((err, connection) => {
        connection.query(query, (err, results) => {
            if (err) {
                const response = { data: null, message: err.message, }
                return res.send(response)
            } else {
                const users = results;
                const response = {
                    data: users,
                    message: 'All users successfully retrieved.',
                }
                return res.send(response)
            }

        });
    });
});

app.post('/addUser', (req, res) => {
    const user_data = req.body;
    console.log('Data :', user_data);
    const query = 'INSERT INTO user (first_name,last_name,email,password) VALUES (?,?,?,?)';
    console.log('Insert query :', query);
    pool.query(query, [user_data.first_name, user_data.last_name, user_data.email, user_data.password], (err, results, fields) => {
        if (err) {
            console.log('Error : ', err);
            const response = { status: 0, data: null, message: err.message };
            return res.send(response);
        } else {
            return res.send({
                status: 1,
                data: results,
                message: 'User added successfully.'
            });
        }
    });
});

app.post('/updateUser', (req, res) => {
    const user_data = req.body;
    console.log('Data :', user_data);
    const query = `UPDATE user SET first_name='${user_data.first_name}',last_name='${user_data.last_name}',email='${user_data.email}',password='${user_data.password}' WHERE user_id=${user_data.user_id}`;
    console.log('Update query :', query);
    pool.query(query, (err, results, fields) => {
        if (err) {
            console.log('Error : ', err);
            const response = { status: 0, data: null, message: err.message };
            return res.send(response);
        } else {
            return res.send({
                status: 1,
                data: results,
                message: 'User updated successfully.'
            });
        }
    });
});

app.post('/deleteUser', (req, res) => {
    const user_data = req.body;
    console.log('Data :', user_data);
    const query = `DELETE FROM user WHERE user_id=${user_data.user_id}`;
    console.log('Delete query :', query);
    pool.query(query, (err, results, fields) => {
        if (err) {
            console.log('Error : ', err);
            const response = { status: 0, data: null, message: err.message };
            return res.send(response);
        } else {
            return res.send({
                status: 1,
                data: results,
                message: 'User deleted successfully.'
            });
        }
    });
});

// wrap express app instance with serverless http function
module.exports.handler = serverless(app)