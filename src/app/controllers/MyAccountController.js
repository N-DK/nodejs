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
                    return res.redirect('/my-account');
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
        if(req.session.user) {
            res.render('my-account/orders')
        } else {
            res.render('my-account/orders', {isNotSession: true})
        }
    }

    // [GET] /my-account/address
    address(req, res, next) {
        if(req.session.user) {
            res.render('my-account/address')
        } else {
            res.render('my-account/address', {isNotSession: true})
        }
    }

    // [GET] /my-account/address/edit-address
    editAddress(req, res, next) {
        if(req.session.user) {
            res.render('my-account/edit-address')
        } else {
            res.render('my-account/edit-address', {isNotSession: true})
        }
    }

    // [GET] /my-account/edit-account
    editAccount(req, res, next) {
        if(!req.session.user) {
            res.render('my-account/edit-account', {isNotSession: true});
        }else {
            res.render('my-account/edit-account', {user: req.session.user});
        }
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
                await User.updateOne({_id: req.params.id}, req.body)
            })
            .then(() => {
                req.session.user.first_name = req.body.first_name;
                req.session.user.last_name = req.body.last_name;
                req.session.user.display_name = req.body.display_name;
                return res.redirect('/my-account');
            })
            .catch(next);
    }

    // [PUT] /my-account/edit-address/:id 
    updateAddress(req, res, next) {
        var address = {
            zip_code: req.body.zip_code,
            phone: req.body.phone,
            street_address: req.body.street_address,
            company_name: req.body.company_name,
            city: req.body.city ?? "",
        }
        User.find({_id: req.params.id})
            .then(async () => {
                await User.updateOne({_id: req.params.id}, {address: address})
                    .then(() => {
                        req.session.user.address = address
                        return res.redirect('/my-account/address');
                    })
            })  
            .catch(next);
    }

    // [GET] /my-account/order-view/:key
    orderView(req, res, next) {
        Order.findOne({key: req.params.key})
            .then((order) => {res.render('my-account/order-view', {order: mongooseToObject(order)})})
    }
}

module.exports = new MyAccountController;