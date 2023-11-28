import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "dgylwk0ef",
    api_key: "133411539622128",
    api_secret: "lPxOX_TQO0O2VHZHIszzQjyj7J8"
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'exam2-sw1'
    })
}