const {Router} = require("express");
const privateControllers = require("../controllers/private");
const {checkUser} = require('../middleware/auth.js')

const router = Router();

router.post("/finduser", checkUser, privateControllers.finduser_post);
router.post("/newchat", checkUser, privateControllers.newchat_post);



module.exports = router;