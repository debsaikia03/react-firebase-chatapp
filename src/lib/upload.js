import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (fileOrPath) => {
    let file;

    // Check if fileOrPath is a file object or a path
    if (fileOrPath instanceof File) {
        file = fileOrPath;
    } else if (typeof fileOrPath === 'string') {
        // Handle local image path (requires user file input in a browser environment)
        const response = await fetch(fileOrPath);
        file = await response.blob();
    } else {
        throw new Error("Invalid input: expected a File object or a file path.");
    }

    const date = new Date();
    const fileName = file.name || 'avatar_null'; // Fallback filename if name is not available

    const storageRef = ref(storage, `images/${date.getTime()}_${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                reject("Something went wrong!" + error.code);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

export default upload;
