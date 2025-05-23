const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
    .route("/signup")

    //SIGNUP
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router
    .route("/login")

    //LOGIN
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

//LOGOUT
router.get("/logout", userController.logout);

module.exports = router;