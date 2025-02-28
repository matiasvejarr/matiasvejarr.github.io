import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const auth = getAuth();

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const logout = () => {
    return signOut(auth);
};

export const onAuthStateChanged = (callback) => {
    auth.onAuthStateChanged(callback);
};
