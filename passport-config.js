const LocalStrategy = require("passport-local").Strategy;

function initialize(passport, getUserByEmail, getUserById, supabase) {
    authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: "No user with that email" });
        }

        try {
            const { data: data1, error: error1 } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            
            if (error1 === null || typeof error1 !== 'object') {
                return done(null, user);
            } else {
                if (error1.__isAuthError) {
                    // console.log("Password or Email incorrect");
                    return done(null, false, { message: "Password or Email incorrect" });
                } else {
                    return done(null, user);
                }
            }
        } catch (err) {
            return done(err);
        }
    }
    
    passport.use(new LocalStrategy({ usernameField: "email" }, 
    authenticateUser));

    passport.serializeUser( async (user, done) => {
        try {
            const userData = await user;
            done(null, userData.id);
        } catch (err) {
            done(err);
        }
    });
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = initialize;