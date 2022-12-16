import { async } from "@firebase/util";
import { app } from "./config";
import { getStorage, ref, uploadString } from "firebase/storage";

const storage = getStorage(app);
//const storageRef = ref(storage);

export function generateReference(path) {
    const reference = ref(storage, path);
    return reference;
}

export async function uploadFiles(ref, file) {
    uploadBytes(ref, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    }).catch((e) => {
        const eCode = e.code;
        const eMessage = e.message;
        console.log(eCode, eMessage);
    });
}

export async function uploadDataURL(ref, url) {
    uploadString(ref, url, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
    }).catch((e) => {
        const eCode = e.code;
        const eMessage = e.message;
        console.log(eCode, eMessage);
    });
}

