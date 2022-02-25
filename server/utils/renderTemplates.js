const ejs = require("ejs");
const fs = require("fs")

exports.renderVerifyEmailTemplate = function(res, path) {

    return res.render('emails/verify.ejs',{
        url : path
      })
}

exports.renderConfirmEmailTemplate = function(url){

    const templateString = fs.readFileSync('views/emails/confirm-email.ejs','utf-8')
    return ejs.render(templateString,{
        url : url
    });
}

exports.renderForgotPassTemplate = function(url){

    const templateString = fs.readFileSync('views/emails/forgot-pass.ejs','utf-8')
    return ejs.render(templateString,{
        url: url
    })
}


