import firebase from 'firebase';
import {FileSystem, Permissions} from 'expo';
import {CameraRoll} from 'react-native';

const generateId = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const id = [];
    for (let i = 0; i < 15; i++) {
        id.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }

    return id.join('');
};

const uploadImage = async imageRef => {
    const hash = new Date().getTime();
    const response = await fetch(imageRef);
    const blob = await response.blob();
    const ref = firebase
        .storage()
        .ref()
        .child(`${hash}_image.jpg`);

    const snapshot = await ref.put(blob, {
        contentType: 'image/jpeg',
    });
    return snapshot.downloadURL;
};

const downloadImage = async url => {
    const hash = new Date().getTime();
    const {uri} = await FileSystem.downloadAsync(url,
        `${FileSystem.documentDirectory}${hash}.jpeg`
    );
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
        await CameraRoll.saveToCameraRoll(uri);
    }
};

const setDataToFirebase = (path, data) => new Promise(resolve => firebase
    .database()
    .ref(path)
    .set(data, () => resolve()));

export {
    setDataToFirebase,
    downloadImage,
    uploadImage,
    generateId
};