const Blog = require("../model/Blog")
const createBlog = async(req,res)=>{
    try{
        const blog = await Blog.create({...req.body,userid:req.userId})
        return res.json({success:true,message:"Blog Created Successfully",blog})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

module.exports = {createBlog}