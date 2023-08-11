const aws = require("aws-sdk");
const s3 = new aws.S3({
    accessKeyId: process.env.S3_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ID,
  });

const StoreData = async(res,params)=>{
    try{
        return new Promise((resolve,reject)=>{
            s3.upload(params,async(err,data)=>{
                if(err){
                    res.json({success:false,message:err}); reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}
module.exports = {StoreData}