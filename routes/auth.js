const express = require("express");
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const passport = require("passport");
const methodOverride = require("method-override");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function findUserByEmail(email) {
    const { data, error1 } = await supabaseAdmin.rpc(
        "get_user_id_by_email",
        {
            email: email,
        }
    );

    if (error1) {
        console.error('Error fetching id by email:', error1);
        return null;
    }

    if (!data || data.length === 0) {
        console.log('No user found with this email.');
        return null;
    }

    const userId = data[0].id;

    const { data: userData, error: error2 } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (error2) {
        console.error('Error fetching user by id:', error2);
        return null;
    }

    return userData.user;
}

async function findUserById(id) {
    const { data: userData, error: error } = await supabaseAdmin.auth.admin.getUserById(id);

    if (error) {
        console.error('Error fetching user by id:', error);
        return null;
    }

    return userData.user;
}

const initilizePassport = require("../passport-config");
initilizePassport(
    passport, 
    email =>  findUserByEmail(email),
    id => findUserById(id),
    supabase
);


router.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/auth",
    failureFlash: true
}));

router.post("/register", async (req, res) => {
    const { password, email } = req.body;

    if (!email || !password) {
        return res.status(400).redirect('/auth/r?error=Email and password are required.');
    }

    try {
        const { session, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            console.error("Error in registry:", signUpError.message);
            return res.status(400).redirect(`/auth/r?error=${signUpError.message}`);
        }

        res.status(201)
    } catch (err) {
        console.log("Error While registering:", err);
        res.status(500).redirect("/auth/r?error=Internal Server Error");
    }

    req.session.email = email;

    res.redirect("/vm");
});

router.delete("/logout", async (req, res) => {
    const { errors: error } = await supabase.auth.signOut();
    console.log(error);
    req.logOut(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect("/auth");
    });
});

router.get('/test', async (req, res) => {
        const userId = "babb50a1-2ee6-4bd3-a57b-3376bf0ec382";
        const { data: userData, error: error2 } = await supabaseAdmin.auth.admin.getUserById(userId);

        if (error2) {
            return res.status(500).json({ error: error2.message });
        }

        
        const newData = userData.user;
        
        const { data: data1, error: error1 } = await supabase.auth.signInWithPassword({
            email: newData.email,
            password: '654321',
        });
        
        if (error1 === null || typeof error1 !== 'object') {
            res.json({ data1, error1 });
        } else {
            if (error1.__isAuthError) {
                res.json("YAHOOO!");
            } else {
                res.json({ data1, error1 });
            }
        }        
        // res.json({ data1, error1 });
});

router.get("/", cheackNotAuthenticated, (req, res) => res.render("Login"));

router.get("/r", cheackNotAuthenticated, (req, res) => res.render("Register"));

function cheackNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }

    next();
}

module.exports = router;