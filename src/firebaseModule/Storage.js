import { app } from "./config";
import { getStorage, ref, uploadString, deleteObject, listAll } from "firebase/storage";

const storage = getStorage(app);
//const storageRef = ref(storage);

export function genRefList(path) {
    const listRef = ref(storage, path);
    return listRef;
}

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

export function uploadDataURL(ref, url) {
    return new Promise((resolve, reject) => {
        uploadString(ref, url, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!');
            resolve()
        }).catch((e) => {
            reject(e);
        });
    });
}

export async function delFile(ref) {
    deleteObject(ref).then(() => {
        console.log("Storage delete complete");
    }).catch((e) => {
        const eCode = e.code;
        const eMessage = e.message;
        console.log(eCode, eMessage);
    });
}

export async function delFolder(ref) {
    return new Promise((resolve, reject) => {
        listAll(ref).then((res) => {
            res.items.forEach(async (itemRef) => {
                console.log("item", itemRef);
                await deleteObject(itemRef).then(() => {
                    console.log("file delete complete");
                });
            });
            resolve();
        }).catch((e) => {
            reject(e);
        });
    });
}