const {Router} = require("express");
const privateControllers = require("../controllers/private");
const {checkUser} = require('../middleware/auth.js')

const router = Router();

router.post("/finduser", checkUser, privateControllers.finduser_post);
router.post("/newchat", checkUser, privateControllers.newchat_post);
router.post("/blockuser", checkUser, privateControllers.blockuser_post);
router.post("/unblockuser", checkUser, privateControllers.unblockuser_post);
router.post("/creategroup", checkUser, privateControllers.creategroup_post);
router.post("/findgroup", checkUser, privateControllers.findgroup_post);
router.get("/messages/:chatId", checkUser, privateControllers.messages_get);
router.get("/userinfo", checkUser, privateControllers.userinfo_get);
router.get("/chatlist", checkUser, privateControllers.chatlist_get);

module.exports = router;