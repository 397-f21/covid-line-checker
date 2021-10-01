import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBDCzbgm7kCn4EQKhY_htsNg9FmSWVL4t0",
    authDomain: "covid-line-checker.firebaseapp.com",
    databaseURL: "https://covid-line-checker-default-rtdb.firebaseio.com",
    projectId: "covid-line-checker",
    storageBucket: "covid-line-checker.appspot.com",
    messagingSenderId: "355285617088",
    appId: "1:355285617088:web:a2ef2dbe494133e16b6025",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);