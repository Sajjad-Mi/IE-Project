const {Router} = require("express");
const privateControllers = require("../controllers/private");
const {checkUser} = require('../middleware/auth.js')

const router = Router();

router.post("/userinfo", checkUser, privateControllers.userinfo_post);



module.exports = router;