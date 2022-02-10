const jwt = require('jsonwebtoken');
require('dotenv').config()
const axios = require("axios");
const secret = process.env.JWT_SECRET;

module.exports = {
    verifyToken(req, res, next) {
        let tokenHeader = req.headers['authorization'];
        if (tokenHeader == '' || tokenHeader == undefined) {
            return res.status(500).send({
                auth: false,
                message: 'Error',
                errors: 'Incorrect token format'
            })
        }

        let token = tokenHeader.split(' ')[1];

        if (!token) {
            return res.status(403).send({
                auth: false,
                message: 'Error',
                errors: 'No Token Provided'
            })
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: 'error',
                    errors: err
                })
            }
            next()
        })
    },
    async userProfile(req, res, next) {
        let tokenHeader = req.headers['authorization'];
        let token = tokenHeader.split(' ')[1];
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: 'error',
                    errors: err
                })
            }
            const response = await axios.get('http://localhost/dev-jds/auth-app/api/v1/user-profile', {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            let data = await response.data;
            return res.status(200).send({
                message: 'User Token',
                errors: null,
                data: [data],
            })
        })
    },
    async isAdmin(req, res, next) {
        let tokenHeader = req.headers['authorization'];
        let token = tokenHeader.split(' ')[1];
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: 'error',
                    errors: err
                })
            }
            const response = await axios.get('http://localhost/dev-jds/auth-app/api/v1/user-profile', {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            let data = await response.data;
            if (data.user.role == 'admin') {
                next();
            } else {
                return res.status(403).send({
                    auth: false,
                    message: 'Error',
                    errors: 'unauthorization'
                })
            }

        })
    },
}