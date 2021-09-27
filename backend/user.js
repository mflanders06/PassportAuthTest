const bcryptjs = require('bcryptjs');

module.exports = {

    register: (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        if(!email){
            res.status(400).json('Please provide an email and password');
        }else{
            db

                .find_user_by_email(email)
                .then ((innerUser) => {
                    if( innerUser.length > 0 ) {
                        res.status(500).json('Email account already in use');
                    }else{
                        const { email, password } = req.body;
                        const hash = bcryptjs.hashSync(password);
                        db

                                .create_user(email, hash)
                                .then(() => {
                                    req.session.loggedIn = true;
                                    res.status(200).json('registered');
                                } )
                    }
                })
        }
    },

    login: (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        
        db

            .find_user_by_email(email)
            .then((response) => {
                if(!(response.length > 0)){
                    res.status(401).json('Email or password do not match our records');
                }else{
                    const areEqual = bcryptjs.compareSync(password, response[0].password);
                    if(!areEqual){
                        res.status(401).json('Username or password do not match our records');
                    }else{
                        req.session.user = response[0];
                        res.status(200).json(req.session.user);
                    }
                }
            })
    },



    logout: (req, res) => {
        req.session.destroy();
        res.status(200).json('logout');
    }

}