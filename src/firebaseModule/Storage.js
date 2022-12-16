import { app } from "./config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);
//const storageRef = ref(storage);

export function generateReference(path) {
    const reference = ref(storage, path);
    return reference;
}

export async function uploadFiles(ref, file) {
    const uploadTask = await uploadBytesResumable(ref, file);
    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
        }
    }, (error) => {
        switch (error.code) {
            case 'storage/unauthorized':
                break;
            case 'storage/canceled':
                break;
            case 'storage/unknown':
                break;
        }
    }, () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
        });
    }
    );

    /*
    await uploadBytesResumable(ref, file).then((snapshot) => {
        console.log("Upload completed!");
    }).catch((e) => {
        const eCode = e.code;
        const eMessage = e.message;
        console.log(eCode, eMessage);
        alert(eCode, eMessage)
    });
    */
}

