const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true
});


class CloudinaryController {
    async delete(req, res) {
        try {
            if(req) {
                // cloudinary.uploader.upload(value).then(result=>console.log(result))
                cloudinary.uploader.destroy(req.params.id).then(result=>console.log(result));
            }
        } catch (e) {
            return res.status(500).json(`Не удалось удалить картинку`)
        }    
    }
}

module.exports = new CloudinaryController();