import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';

import { auth } from '../config/firebaseDb.js';
import { createUser } from './firestore/users.firestore.js';

/**
 * Log in with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// /**
//  * Log out
//  * @returns {Promise<void>}
//  */
// function logOut() {
//     return signOut(auth);
// }

/**
 * Sign up a new account.
 * @param {string} email - email of user.
 * @param {string} password - password.
 * @param {Object} metadata - user metadata.
 * @param {string} metadata.fullname - full name of user.
 * @param {string} metadata.phone - enrolment date.
 * @param {string[]} metadata.roles - roles of user.
 */
async function signUp(email, password, metadata) {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    // update user display name
    await updateProfile(userCredential.user, {
        displayName: metadata.name
    });

    await createUser(userCredential.user, metadata);

    // send verification email
    await sendEmailVerification(userCredential.user);
}

export { signUp, logIn };
