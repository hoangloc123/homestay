import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../config/firebaseDb.js";
import { addRequest } from "./requests.firestore.js";
import { Role } from "../../constants/role.constant.js";
import { RequestAction } from "../../constants/requestAction.constant.js";

const COLLECTION_USERS = "users";

/**
 * create new user in firestore with information from credential.
 * @param {import('firebase/auth').User} user
 * @param {Object} metadata - User metadata
 * @return {Promise<void>}
 */
async function createUser(user, metadata) {
  const docRef = doc(database, COLLECTION_USERS, user.uid);

  // Add `isRequestingHost` if user has the 'host' role
  const isRequestingHost = metadata.roles && metadata.roles.includes("host");

  // Add user to the users collection
  await setDoc(docRef, {
    displayName: user.displayName,
    email: user.email,
    ...metadata,
    ...(isRequestingHost && { isRequestingHost: true }),
  });

  // Add a host approval request if the user is requesting the 'host' role
  if (isRequestingHost) {
    await addRequest({
      date: new Date(),
      target: "user",
      targetId: user.uid,
      actionNeeded: RequestAction.HOST_REQUEST_APPROVAL,
      isResolved: false,
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
      ...docSnap.data(),
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
    isRequestingHost: false,
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
    roles: arrayRemove(Role.HOST),
  });
}

/**
 * Update user information by ID.
 * @param {string} userId - ID of the user
 * @param {Object} updates - Object containing updates for the user
 * @returns {Promise<void>}
 */
async function updateUser(userId, updates) {
  const docRef = doc(database, COLLECTION_USERS, userId);

  await updateDoc(docRef, updates);
}

/**
 * Get a paginated list of users sorted by creation date, filtered by role.
 * @param {string} role - Role to filter users by. Accepts an empty string for no filtering.
 * @param {number} page - Page number (1-indexed).
 * @param {number} pageSize - Number of users per page.
 * @returns {Promise<{users: Array, total: number}>} - Paginated users and total count.
 */
async function getUsers(role, page = 1, pageSize = 10) {
  const usersRef = collection(database, COLLECTION_USERS);

  let usersQuery = query(usersRef, orderBy("createdAt", "desc"));

  if (role) {
    usersQuery = query(usersQuery, where("roles", "array-contains", role));
  }

  const querySnapshot = await getDocs(usersQuery);

  const allUsers = [];
  querySnapshot.forEach((doc) => {
    allUsers.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const startIndex = (page - 1) * pageSize;
  const paginatedUsers = allUsers.slice(startIndex, startIndex + pageSize);

  return {
    users: paginatedUsers,
    total: allUsers.length,
  };
}

export {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  updateUserRequestingHost,
  removeUserHostRole,
};
