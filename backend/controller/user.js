const User = require("../model/User")
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const verifyJwt = async(req,res,next) =>{
    if(!req.headers.authorization){
        return res.json({success:false,message:"Auth Token missing"})
    }
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log(token,"token hai kya?")
    if(!token){
        return res.json({success:false,message:"UnAuthorized token found, Please Login"})
    }
    jwt.verify(String(token),process.env.JWT_SECRET,async(err,data)=>{
        console.log(data,"user data")
        if(err || !data){
            return res.json({success:false,message:"Invalid Token Please Login again"})
        }
        req.UserId = data.id;
        next();
    })
}

const signup = async(req,res)=>{
    try{
        const nameRegex = /^[a-zA-Z ]*$/;
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
        const phoneRegex = /^[0-9\b]+$/;
        const user = await User.findOne({$or:[{email:req.body.email},{phone:req.body.phone}]})
        if(!req.body.name){
            return res.json({ success: false, message: "Please Enter Name" });
        }else if(!nameRegex.test(req.body.name)){
            return res.json({ success: false, message: "Please Enter Valid name" });
        }else if(!req.body.email){
            return res.json({ success: false, message: "Please Enter Email" });
        }else if(!emailRegex.test(req.body.email)){
            return res.json({ success: false, message: "Please Enter Valid email" });
        }
        if(user && user.email === req.body.email){
            return res.json({success:false,message:"Email Id already exist"})
        }
        req.body.password = bcrypt.hashSync(req.body.password)
        await User.create(req.body)
        return res.json({success:true,message:"Signup Successfully"})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const login = async(req,res)=>{
    try{
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
        const user = await User.findOne({$or:[{email:req.body.email},{username:req.body.phone}]}).select("+password")
        if(!req.body.email){
            return res.json({ success: false, message: "Please Enter Email" });
        }else if(!emailRegex.test(req.body.email)){
            return res.json({ success: false, message: "Please Enter Valid email" });
        }else if(!req.body.password){
            return res.json({ success: false, message: "Please Enter Password" });
        }
        if(!user){
            return res.json({success:false,message:"Email not Exist"})
        }
        const checkPass = bcrypt.compareSync(req.body.password,user.password)
        if(!checkPass){
            return res.json({success:false,message:"Incorrect Password"})
        }
        const token = generateToken({id:user._id})
        return res.json({data:token,success:true,message:"Login Successfully",user,id:user._id,})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

module.exports = {signup,login,verifyJwt}