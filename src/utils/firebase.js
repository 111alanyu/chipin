// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, setDoc, getDoc, query, where, doc, updateDoc, arrayUnion, FieldValue, DocumentSnapshot, deleteDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage, listAll, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseConfig } from './config.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const storage = getStorage(app);
export default storage

export const auth = getAuth(app);
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        registered: false,
      });
    }
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    return (docSnap);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const getDocInfo = async (collection, id, field) => {
  console.log(collection + ", " + id + ", " + field)
  if (id != null) {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    const data = await docSnap.get(field);
    return data;
  }
}

export const getDocData = async (collection, id) => {
  console.log(collection + ", " + id)
  if (id != null) {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
}

export const initializeGroup = async (uid, name, desc, img, purpose) => {
  console.log(name + " " + desc + " " + img + " " + purpose)
  const newGroup = doc(collection(db, "groups"))    // Each group will guarantee have unique IDs. No chance for overlap.
  const data = {
    name: name,
    desc: desc,
    img: img,
    purpose: purpose,
    founder: uid,
    numMembers: 1,
    members: new Array(uid),
    currentEvents: [],
    pastEvents: [],
    cumHours: 0,
    groupID: newGroup.id
  }
  await setDoc(newGroup, data)
  const numGroups = await (getDocInfo("users", uid, "numGroups"))
  console.log(numGroups);
  const userData = {
    numGroups: numGroups + 1,
    groups: arrayUnion(newGroup.id)
  }
  await updateDBdoc("users", uid, userData)
}

export const updateDBdoc = async (collection, uid, body) => {
  try {
    const docRef = await updateDoc(doc(db, collection, uid), body);
    console.log("Document updated: ", docRef.id);
  } catch (e) {
    console.error("Error updating doc: ", e);
  }
}

export const updateGroup = async (docUser, docGroup) => {
  let docRef = doc(db, "groups", docGroup)
  let docSnap = await getDoc(docRef)
  if (docSnap._document === null) {
    return false;
  }
  const groupBody = {
    numMembers: docSnap.get("numMembers") + 1,
    members: arrayUnion(docUser),
  }
  docRef = doc(db, "users", docUser)
  docSnap = await getDoc(docRef)
  const userBody = {
    numGroups: docSnap.get("numGroups") + 1,
    groups: arrayUnion(docGroup),
  }
  updateDBdoc("groups", docGroup, groupBody);
  updateDBdoc("users", docUser, userBody)
}

export const getDocSnap = (collection, docs) => {
  if (docs) {
    const docRef = doc(db, collection, docs);
    const docSnap = getDoc(docRef);
    console.log(docSnap)
    return (docSnap);
  }
}

//to add document for events page
export const addDBdoc = async (c, body) => {
  console.log(c)
  console.log(body)
  try {
    const docRef = await addDoc(collection(db, c), body);
    console.log("Document added: ", docRef.id);
    return docRef.id
  } catch (e) {
    console.error("Error adding doc: ", e);
  }
}

export const removeDoc = async (collection, document) => {
  const docRef = await doc(db, collection, document)
  await deleteDoc(docRef)
}

export const uploadFile = async (file) => {
  const upload = ref(storage, `images/${file.name}`)
  const imgref = ref(storage, "images/")
  await uploadBytes(upload, file)
}

export const getImageByFile = async (name, setLink) => {
  const imgref = ref(storage, "images/")
  await listAll(imgref).then((res) => {
    res.items.forEach((item) => {
      if (item.name === name) {
        getDownloadURL(item).then((url) => {
          setLink(url)
        })
      }
    })
  })
}

export const addOrg = async (affiliation) => {
  const newOrg = doc(collection(db, "organizations"))
  const data = {
    events: [],
    name: affiliation,
    numEvents: 0,
    upcomingEvents: []
  }
  await setDoc(newOrg, data)
  return newOrg.id
}