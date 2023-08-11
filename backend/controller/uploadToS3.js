const aws = require("aws-sdk");
const { StoreData } = require("../utils/storeData");
const s3 = new aws.S3({
  accessKeyId: process.env.S3_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ID,
});
const uploadFile = async (req, res) => {
    try{
        let randomNumber = Date.now();
        let newfname = Math.random().toString(36).slice(2);
        let ext = req.file.originalname.split(".").pop();
        let filename = randomNumber + "_" + newfname + "." + ext;
        const params = {
            Bucket:process.env.S3_BUCKET_NAME,
            Key: filename,
            Body:req.file.buffer
        }
        const response = await StoreData(res,params)
        return res.json({success:true,message:"File Uploaded Successfully",url:response.Key})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
};

const getFiles = async (req, res) => {
  try {
    const Key = req.query.url;
    const params = {
      Bucket:process.env.S3_BUCKET_NAME,
      Key:Key
    }
    const stream = s3.getObject(params).createReadStream()
    return stream.pipe(res)
  } catch (err) {
    return res.json({ success: false, message: "Image not found" });
  }
};
module.exports = {uploadFile, getFiles };
