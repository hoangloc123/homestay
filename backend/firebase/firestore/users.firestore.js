import {
    arrayRemove,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import { database } from '../../config/firebaseDb.js';
import {addRequest} from "./requests.firestore.js";
import {Role} from "../../constants/role.constant.js";
import {RequestAction} from "../../constants/requestAction.constant.js";

const COLLECTION_USERS = 'users';

/**
 * create new user in firestore with information from credential.
 * @param {import('firebase/auth').User} user
 * @param {Object} metadata - User metadata
 * @return {Promise<void>}
 */
async function createUser(user, metadata) {
    const docRef = doc(database, COLLECTION_USERS, user.uid);

    // Add `isRequestingHost` if user has the 'host' role
    const isRequestingHost = metadata.roles && metadata.roles.includes('host');

    // Add user to the users collection
    await setDoc(docRef, {
        displayName: user.displayName,
        email: user.email,
        ...metadata,
        ...(isRequestingHost && { isRequestingHost: true })
    });

    // Add a host approval request if the user is requesting the 'host' role
    if (isRequestingHost) {
        await addRequest({
            date: new Date(),
            target: 'user',
            targetId: user.uid,
            actionNeeded: RequestAction.HOST_REQUEST_APPROVAL,
            isResolved: false
        });
    }
}

/**
 * Get user information by ID.
 * @param {string} userId user UID.
 * @returns {Promise<User>} user object data. Null if not found.
 */
async function getUserById(userId) {
    let user = null;

    const docRef = doc(database, COLLECTION_USERS, userId);

    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        user = {
            id: docSnap.id,
            ...docSnap.data()
        };
    }

    return user;
}

/**
 * Update user's isRequestingHost flag to false
 * @param {string} userId - ID of the user
 * @return {Promise<void>}
 */
async function updateUserRequestingHost(userId) {
    const docRef = doc(database, COLLECTION_USERS, userId);
    await updateDoc(docRef, {
        isRequestingHost: false
    });
}

/**
 * Remove 'host' role from user's roles array
 * @param {string} userId - ID of the user
 * @return {Promise<void>}
 */
async function removeUserHostRole(userId) {
    const docRef = doc(database, COLLECTION_USERS, userId);
    await updateDoc(docRef, {
        roles: arrayRemove(Role.HOST)
    });
}

export { createUser, getUserById, updateUserRequestingHost, removeUserHostRole }
