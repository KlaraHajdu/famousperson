import firebase from "firebase";

export let appFirebase = {};

(function () {
    const firebaseConfig = {
        apiKey: "AIzaSyAAAferugrYAbHqY0d96ondBPmqdPdaN_w",
        authDomain: "famous-person-guessing-game.firebaseapp.com",
        databaseURL: "https://famous-person-guessing-game.firebaseio.com",
        projectId: "famous-person-guessing-game",
        storageBucket: "famous-person-guessing-game.appspot.com",
        messagingSenderId: "275457808030",
        appId: "1:275457808030:web:40675b36590f243c6c4d8f",
        measurementId: "G-1TFM95J5GM",
    };

    firebase.initializeApp(firebaseConfig);
    appFirebase = firebase;
    console.log(appFirebase);

    function fnCreate(path, body, callback) {
        if (!path || !body) return;
        //appFirebase.database().ref(path).set(body, callback);
        let bodyNew = {
            name: "newnow",
            gameId: 123,
        };
        //appFirebase.database().ref("games").set(bodyNew);
        firebase.database().ref().push(bodyNew);
    }

    const fnRead = (path, successFunction, errorFunction) => {
        if (!path) return;
        appFirebase.database().ref(path).on("value").then(successFunction, errorFunction);
    };

    const fnUpdate = (path, body, callback) => {
        if (!path || !body) return;
        appFirebase.database().ref(path).update(body, callback);
    };

    const fnDelete = (path, callback) => {
        if (!path) return;
        appFirebase.database().ref(path).remove(callback);
    };

    appFirebase.databaseApi = {
        create: fnCreate,
        read: fnRead,
        delete: fnDelete,
        update: fnUpdate,
    };
})();
