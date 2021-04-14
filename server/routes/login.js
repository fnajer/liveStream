const express = require('express'),
    router = express.Router(),
    passport = require('passport');
 
router.get('/',
    require('connect-ensure-login').ensureLoggedOut(),
    (req, res) => {
        res.render('login', {
            user : null,
            errors : {
                email : req.flash('email'),
                password : req.flash('password')
            }
        });
    });
 
router.post('/', passport.authenticate('localLogin', {
        failureRedirect : '/register',
        failureFlash : true
    }),
        // (req, res) => { res.render('index'); } // render doesnt match. We need only redirect. But redirect dont let us finish response and save session correctly
        (req, res) => { res.send(`<script>
            setTimeout(function () {
               window.location = "/";
            }, 0)
          </script>`); }
    );
 
module.exports = router;