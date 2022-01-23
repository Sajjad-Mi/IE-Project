const {Router} = require("express");
const privateControllers = require("../controllers/private");
const {checkUser} = require('../middleware/auth.js')

const router = Router();

router.post("/finduser", checkUser, privateControllers.finduser_post);
router.post("/newchat", checkUser, privateControllers.newchat_post);
router.get("/messages/:chatId", checkUser, privateControllers.messages_get);
router.get("/userinfo", checkUser, privateControllers.userinfo_get);


module.exports = router;