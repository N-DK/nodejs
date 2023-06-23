const User = require('../modules/Users');
const Order = require('../modules/Orders');
const nodemailer = require('nodemailer');    
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class MyAccountController {
    // [GET] /my-account
    index(req, res, next) {
        if(!req.session.user) {
            res.render('my-account', {isNotSession: true});
        }else {
            res.render('my-account', {user: req.session.user});
        }
    }

    // [POST] /my-account/handleRegister
    handleRegister(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({email})
            .then((data) => {
                if(!data) {
                    const transporter = nodemailer.createTransport({
                        port: 465,
                        service: 'gmail',
                        auth: {
                            user: 'nguyenkhoadang135759@gmail.com',
                            pass: 'zioiiwjoipywmtoq',
                        }
                    });
                    let mailOptions = {
                        from: 'nguyenkhoadang135759@gmail.com',
                        to: email,
                        subject: 'Password to login',
                        text: password,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    return new User(req.body);
                }else {
                    res.render('my-account', {isExist: true});
                }
            })
            .then(async (user) => {
                await user.save()
                .then((user) => {
                    req.session.email = user.email;
                    return res.redirect('/my-account');
                }); 
            }) 
            .catch(next);
        
    }

    // [POST] /my-account/handleLogin
    handleLogin(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({email, password})
            .then(user => {
                if(user) {
                    req.session.user = user;
                    return res.redirect('/my-account');
                } else {
                    res.render('my-account', {isLoginFail: true, isNotSession: true});
                }
            })
            .catch(next);
    }

    // [POST] /my-account/logout
    logout(req, res, next) {
        req.session.destroy();
        return res.redirect('/my-account');
    }

    // [GET] /my-account/orders
    orders(req, res, next) {
        res.render('my-account/orders')
    }

    // [GET] /my-account/edit-account
    editAccount(req, res, next) {
        res.render('my-account/edit-account');
    }

    //[PUT] /my-account/:id
    update(req, res, next) {
        User.findOne({_id: req.params.id})
            .then(async user => {
                if(req.body.current_password !== "" && req.body.current_password !== user.password) {
                    return res.redirect('/my-account/edit-account');
                }
                if(req.body.password === "") {
                    req.body.password = user.password;
                }
                await User.updateOne({_id: req.params.id}, req.body);
            })
            .then(() => res.redirect('/my-account'))
            .catch(next);
    }

    // [GET] /my-account/order-view/:key
    orderView(req, res, next) {
        Order.findOne({key: req.params.key})
            .then((order) => {res.render('my-account/order-view', {order: mongooseToObject(order)})})
    }
}

module.exports = new MyAccountController;