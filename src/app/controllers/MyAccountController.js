const User = require('../modules/Users');
const nodeMailer = require('nodemailer');    


class MyAccountController {
    // [GET] /my-account
    index(req, res, next) {
        
        res.render('my-account');
    }

    // [POST] /my-account/handleRegister
    handleRegister(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({email})
            .then( async (data) => {
                if(!data) {
                    return new User(req.body);
                }else {
                    res.send("Email đã tồn tại");
                }
            })
            .then(async (user) => {
                await user.save()
                .then(async () => {
                    // Tùy chỉnh phương thức gửi email
                    let transporter = nodeMailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'nguyenkhoadang135759@gmail.com',
                            pass: 'ngodangkhoa'
                        }
                    });
                    // Điền thông tin người gửi và người nhận email
                    let mailOptions = {
                        from: 'nguyenkhoadang135759@gmail.com',
                        to: email,
                        subject: 'Password to login',
                        result: password,
                    };
                    
                    // Gửi email
                    await transporter.sendMail(mailOptions, function(error, info){
                        if(error) {
                            res.send(error);
                        } else {
                            res.send('Email sent: ' + info.response);
                        }
                    });
                })
                .then(() => res.redirect('/')); 
            }) 
            .catch(next);
        
    }
}

module.exports = new MyAccountController;