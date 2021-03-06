const fs = require("fs");
const cloudinary = require("cloudinary");

class File {
    cloudinaryEnv;
    dir = "uploads";

    constructor() {
        this.cloudinaryEnv = cloudinary.v2.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_APP_KEY,
            api_secret: process.env.CLOUD_APP_SECRET,
        });
    }

    localUpload(file, dest, name, extension) {
        if (typeof file !== "undefined" || file !==  "" || file !== null) {
            return this.uploadFile(file, dest, name, extension);
        }
        return "";
    }

    cloudUpload(file) {
        if (typeof file !== "undefined" || file !== "" || file !== null) {
            this.cloudinaryEnv.uploader.upload(file, (error, result) => {
                if (error) {
                    console.log(error);
                }
                if (result) {
                    return result.url;
                }
            });
        }
        return;
    }

    uploadFile(file, dest, name, extension) {
        let image = file.replace(/^data:.*,/, "");
        image = image.replace(/ /g, "+");
        const bitmap = new Buffer(image, "base64");
        const url = this.dir + dest + name + "-" + Date.now() + extension;
        fs.writeFileSync(url, bitmap);
        return url;
    }
}


module.exports = File;