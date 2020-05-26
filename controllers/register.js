const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../models/database');
const bodyParser = require('body-parser');


const register = {
    async signUP(req, res) {
        // body values
        const { username, password} = req.body;
        console.log(req.body);
        try {
            // empty body values
            if(username === '' || password === '') {
                return res.status(400).json({
                    status: 'error',
                    error: 'all fields are required'
                });
            };
console.log(req.body);
            // generate bcrypt salt
            const salt = await bcrypt.genSalt(10);
            // hash password
            const hashedPassword = await bcrypt.hash(password, salt);

            // check if user exist (email check)
            const checkQuery = `SELECT * FROM employee WHERE username=$1`;
            const value = [username];
            const check = await pool.query(checkQuery, value);

            // check if user exist response
            if (check.rows[0]) {
                return res.status(400).json({
                    status: 'error',
                    error: 'user already exist'
                });
            }
            // admin signup
            // else if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password) {
            //     const AdminSignupQuery = `INSERT INTO employee (firstName, lastName, email, password, gender, jobRole, department, address)
            //     VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
            //     const values = [firstName, lastName, email, hashedPassword, gender, jobRole, department, address];
            //     const adminResult = await pool.query(AdminSignupQuery, values);

            //     // generate admin token
            //     jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
            //         res.status(201).json({
            //             message: 'admin account successfully created',
            //             token,
            //             adminId: adminResult.rows[0].authorid
            //         });
            //     });
            // }
            else {
                // employee sign up
                const signUpQuery = `INSERT INTO employee (username, password)
                VALUES($1, $2) RETURNING *`
                const userValue = [username, hashedPassword];
                const signUpQuerys = await pool.query(signUpQuery, userValue);

                // generate user token
                jwt.sign({ username, password }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
                    // token response
                    res.status(201).json({
                        status: 'success',
                        data: {
                            message: 'user account successfully created',
                            token,
                            authorId: signUpQuerys.rows[0].authorid
                        }
                    })
                })
            };
        }
        catch (e) {
            console.log(e);
        };
    },
    async logIn(req, res) {
        // body values
        const { username, password } = req.body;

        try {
            // empty body values
            if (!username || !password) {
                return res.status(400).json({
                    status: 'error',
                    error: 'all fields are required'
                });
            };

            // email check (if user with email exist) 
            const logIn = `SELECT * FROM employee WHERE username=$1`;
            const value = [username];
            const logInQuery = await pool.query(logIn, value);

            // email check response
            if (!logInQuery.rows[0]) {
                return res.status(400).json({
                    status: 'error',
                    error: 'email does not exist, please sign up'
                });
            };

            // compare password
            bcrypt.compare(password, logInQuery.rows[0].password, (err, result) => {
                // admin login
                // if (logInQuery.rows[0].email === process.env.ADMIN_EMAIL && result === true) {
                //     jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
                //         res.status(201).json({
                //             status: 'success',
                //             message: 'admin successfully loged in',
                //             data: {
                //                 token,
                //                 adminId: logInQuery.rows[0].authorid
                //             }
                //         });
                //     });
                // }
                // user login
                // else
                if (username === logInQuery.rows[0].username && result === true) {
                    jwt.sign({ username, password }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
                        res.status(201).json({
                            status: 'success',
                            message: 'user successfully loged in',
                            data: {
                                token,
                                authorId: logInQuery.rows[0].authorid
                            }
                        })
                    })
                }
                // incorrect email and password
                else {
                    res.status(403).json({
                        status: 'error',
                        error: 'token not generated, incorrect email or password'
                    });
                }
            });
        }
        catch (e) {
            console.log(e)
        };
    },
    // token verification
    verifyToken(req, res, next) {
        // header key and value
        const headers = req.headers['authorization'];

        if (typeof headers !== 'undefined') {
            const beareHeader = headers.split(' ');
            const token = beareHeader[1];

            req.token = token
            next();
        }
        else {
            // incorrect header and value
            res.status(403).json({
                status: 'error',
                error: 'forbidden'
            });
        };
    }
};

// export register routes
module.exports = register;