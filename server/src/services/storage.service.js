import Imagekit from 'imagekit';

const storageInstance = new Imagekit({
    urlEndpoint:process.env.IK_URL,
    publicKey:process.env.IK_PUBLIC_KEY,
    privateKey:process.env.IK_PRIVATE_KEY
})

export const sendFiles = async (file,fileName) => {
    let obj = {
        file,
        fileName,
        folder:"insta",
    }

    return await storageInstance.upload(obj);
}

