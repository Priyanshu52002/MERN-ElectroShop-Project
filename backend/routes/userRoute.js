const express=require("express");
const { isAuthorised } = require("../middleware/authMiddleware");
const router=express.Router();

router.use(isAuthorised(['admin']));
router.get('/admin',(req,res)=>{
     res.status(200).json({mesaage:"you have the authority"});
})
module.exports=router;