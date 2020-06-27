const usersRepository = require('../repositories/usersRepository');
const bcrypt = require('bcrypt');

module.exports = {
    newForm (req, res) {
        return res.render('sessions/new');
    },
    async create (req, res) { // authenticate user and create a new session
        try {
            const user = await usersRepository.findUserByUsername(req.body.username); 
            if(bcrypt.compareSync(req.body.password, user.password)) {
                req.session.currentUser = user;
                const result = await usersRepository.updateLastLoggedIn(req.body.username);                 //update last loggedin date
                console.log('result of updating date is:' + result)
                
                return res.redirect('/');
            } else {
                throw new Error();
            }
        } catch(err) {
            return res.send('<a href="/">Username and password are wrong!</a>');
        }
    },
    destroy (req, res) { // for logged out
        return req.session.destroy(() => {
            res.redirect('/');
        });
    }
};