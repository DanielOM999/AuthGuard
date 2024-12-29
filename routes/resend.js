const express = require("express");
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_ANON_KEY);

router.post("/", async (req, res) => {
    const email = req.session.email;
    if (!email) {
        return res.status(403).json({ error: "Unauthorized" });
    }
    const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
            emailRedirectTo: 'http://localhost:3000'
        }
    })
    if (error) {
        console.error('Error resending email:', error.message);
        return res.status(500).json({ error: 'Failed to resend signup email. Please try again later.' });
    } else {
        console.log(email);
    }
});

module.exports = router;