import ImageKit from "imagekit";
import { config } from "../dotenv/config.js";

let imagekit = new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT
});

export default (file, filename) => {

    return new Promise((resolve, reject) => {//Promise ka P capital atta ha sirrrr
        imagekit.upload({
            file: file,
            fileName: filename,
            folder: "social-network-project",

        },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
    })
}