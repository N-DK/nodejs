const Order = require('../modules/Orders');
const User = require('../modules/Users');
const Cart = require('../modules/Cart');
const nodemailer = require('nodemailer');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')
class CheckoutController {
    
    // [POST] /checkout/order
    async order(req, res, next) {
        if(req.session.carts) {
            req.body.products = req.session.carts;
        } else {
            req.body.products = JSON.parse(req.body.products);
        }
        req.body.total = parseInt(req.body.shipping) + req.body.products.reduce((total, num) => total + (num.quantify * num.product_price), 0);
        var flag = false;
        let key = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 10) {
            key += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        req.body.key = "wc_order_"+key;
        if(req.body.create_account) {
            var email = req.body.email;
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < 5) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            var password = result;
            const user = {
                first_name: req.body.first_name,
                last_name:  req.body.last_name,
                email: email,
                password: password,
            }
            User.findOne({email})
                .then(async (data) => {
                    if(!data) {
                        flag = true;
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
                        const users = new User(user);
                        await users.save()
                        .then((user) => {
                            req.session.email = user.email;
                        }); 
                    } else {
                        res.render('checkout', {isExist: true});
                        return;
                    }
                })
                .catch(next);
                if(flag == true) {
                    const order = new Order(req.body);
                    await order.save()
                        .then(() => {
                            return res.redirect(`/checkout/order-received/?key=${req.body.key}`);
                        })
                }
        } else {
            const order = new Order(req.body);
            await order.save()
                .then(async () => {
                    if(req.session.user) {
                        await Cart.deleteMany({user_id: req.session.user._id})
                            .then(() => {
                                delete req.session.carts
                                res.locals.cartQuantity = 0;
                            })
                    }
                })
                .then(() => {
                    return res.redirect(`/checkout/order-received/?key=${req.body.key}`);
                })
                .catch(next);
        }
    }
    //[GET]  /checkout/order-received
    orderReceived(req, res, next) {
        Order.findOne({key: req.query.key})
            .then((order) => res.render('checkout/order-received', {order: mongooseToObject(order)}))
            .catch(next);
    }
}

module.exports = new CheckoutController;