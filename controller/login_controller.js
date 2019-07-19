
class LoginController {

    async loginView(context) {
        await context.render('admin/login.njk.html' );
    }

    async handleLogin(context, next) {

        let user  = await context.authentication.checkAcc(context.username, context.password);
        if(user && (user.role === 'admin' || user.role === 'super admin')){ 
            context.authentication.createSessionLogined(user);
            context.username = null;
            context.password = null;

            return context.redirect('/admin/dashboard');
        }
        context.redirect('/admin');
        await next();
    }
    
}
module.exports = LoginController;