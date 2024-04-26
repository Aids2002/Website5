export {db, auth, app} from './firebase.js'
import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, setDoc, deleteDoc, doc, query, where, getDocs} from 'firebase/firestore'
import {getStorage, uploadBytes, ref, deleteObject, listAll, storaget, getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAPnM2OvmJnMJSc4lgk39MkZnrb2x7dnhs",
    authDomain: "boarding-buddy-1.firebaseapp.com",
    projectId: "boarding-buddy-1",
    storageBucket: "boarding-buddy-1.appspot.com",
    messagingSenderId: "524014652013",
    appId: "1:524014652013:web:aa6f0b1c732dc471348d64"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service

//get table
const getTable = document.querySelector('#table')

// get firestore database instance and reference
const db = getFirestore(app)
const dbRef = ref(db)

// Get storage instance and reference
const storage = getStorage();
const storageRef = ref(storage, 'houses');

// Function to retrieve prefixes and images
// async function getPrefixesAndImages() {
//     try {
//       const listResult = await listAll(ref(storageRef));
//       console.log('List Result:', listResult);

//       const prefixesArray = [];

//       for (const prefixRef of listResult.prefixes) {
//         const fullPath = prefixRef.fullPath;
//         const location = prefixRef.location?.path; // Use optional chaining to handle potential undefined location
  
//         console.log('Processing Prefix:', fullPath);
  
//         // Get a reference to the prefix
//         const prefixStorageRef = storage.ref(fullPath);
  
//         // List files in the prefix (images or other files)
//         const prefixFiles = await prefixStorageRef.listAll();
//         console.log('Prefix Files:', prefixFiles);
  
//         // Extract image URLs if they exist
//         const imageUrls = prefixFiles.items.map((item) => item.getDownloadURL());
//         console.log('Image URLs:', imageUrls);
  
//         prefixesArray.push({ fullPath, location, images: imageUrls });
//       }
  
//       console.log('Finished getPrefixesAndImages');
//       return prefixesArray;
//     } catch (error) {
//       console.error('Error getting prefixes and images:', error);
//       return [];
//     }
//   }
// // Usage example with error handling
// getPrefixesAndImages()
//   .then((prefixes) => {
//     if (prefixes.length === 0) {
//       console.log('No prefixes and images retrieved.');
//     } else {
//       console.log('Prefixes and Images:', prefixes);
//       console.log('First Prefix:', prefixes[0]);
//       console.log('Images in First Prefix:', prefixes[0].images);
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

const imageElement = document.getElementById('image-container');

// console.log(storage)

// for inputs - strings or num
const name = document.querySelector('#nameForm')
const formData = document.querySelector('#boardingForm')
// delete
const deleteBH = document.querySelector('#delBoardingHouse')
// for inputs - image
const selectFile = document.querySelector('#fileInp')
var fileItem
var fileName

// getItems(()=>{
    
// })

///////////////////////////

const array = [];

const q = query(collection(db, "boardingHouses")); //, where("name", "==", "maxx")

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  const newarray = [];
  newarray.push(doc.data().name, doc.data().location,doc.data().roomavailable, doc.data().tags)
  array.push(newarray)

  const newTr = document.createElement('tr');

  //create row Data
  const rowName = document.createElement('td');
  const rowImg = document.createElement('td');
  const rowLocation = document.createElement('td')
  const rowRoom = document.createElement('td')
  const rowTag = document.createElement('td');
  const rowAct = document.createElement('td');
  
  rowName.innerHTML = doc.data().name;
  rowImg.innerHTML = '';
  rowLocation.innerHTML = doc.data().location;
  rowRoom.innerHTML = doc.data().roomavailable;
  rowTag.innerHTML = doc.data().tags;
  rowAct.innerHTML = '';
 
  newTr.append(rowName);
  newTr.append(rowImg);
  newTr.append(rowLocation);
  newTr.append(rowRoom)
  newTr.append(rowTag)
  newTr.append(rowAct)
  getTable.appendChild(newTr);

});

const loading =  (() =>{
    return console.log(array);
}) 
loading()
//////////////////////////

selectFile.addEventListener('change', (e) => {
    console.log('file')
    fileItem = e.target.files;
    fileName = fileItem.name;
    console.log('butu: ',fileItem)
})


// add boarding house
const nestedArray = [];
const downloadURLsObject = {};

name.addEventListener('submit', (e) => {
    e.preventDefault()
   
/////////////////////////////////
    if (!fileItem) {
        console.error('No file selected.');
        return;
    }

    var colRef = collection(db,'boardingHouses')

    var documentId = name.name.value;

    for (let i = 0; i < fileItem.length; i++) {

        const file = fileItem[i];
        const fileRef = ref(storageRef,name.name.value+"/"+file.name); // ${name.name.value}/${file.name}
        const uploadTask = uploadBytes(fileRef, fileItem[i]);
        uploadTask.then((snapshot) => {
        console.log('File uploaded successfully.');
            getDownloadURL(fileRef).then((downloadURL) => {
                const newArr = []
                if (!downloadURLsObject[name.name.value]) {
                    downloadURLsObject[name.name.value] = [];
                }
               
                console.log(`Download URL for ${downloadURL}`);

                newArr.push(downloadURL);
                // You can perform further actions with the download URL here
            })
            .catch((error) => {
                console.error('Error getting download URL:', error);
            });
            array.push(newArr);
        }).catch((error) => {
        console.error('Error uploading file:', error);
        }).finally(() => {
            // Push the object into the main array after all uploads and URL retrievals are complete
            if (i === fileItem.length - 1) {
                nestedArray.push(downloadURLsObject);
                console.log('Nested Array:', nestedArray);
            }
        });

    // Data to be added to the document
    const data = {
        name : name.name.value,
        location: formData.loc.value,
        roomavailable: formData.room.value,
        tags: formData.tags.value , 
    };
/////////////////////
    const newTr = document.createElement('tr');

    //create row Data
    const rowName = document.createElement('td');
    const rowImg = document.createElement('td');
    const rowLocation = document.createElement('td')
    const rowRoom = document.createElement('td')
    const rowTag = document.createElement('td');
    const rowAct = document.createElement('td');
    
    rowName.innerHTML = name.name.value;
    rowImg.innerHTML = '';
    rowLocation.innerHTML = formData.loc.value;
    rowRoom.innerHTML = formData.room.value;
    rowTag.innerHTML = formData.tags.value;
    rowAct.innerHTML = '';
   
    newTr.append(rowName);
    newTr.append(rowImg);
    newTr.append(rowLocation);
    newTr.append(rowRoom)
    newTr.append(rowTag)
    newTr.append(rowAct)
    getTable.appendChild(newTr);
/////////////////////
    // Add the document with the specified ID
    setDoc(doc(colRef, documentId), data)
    .then(() => {
        name.reset()
        formData.reset()
    })
    
    }   
   
    // const imageRef = ref(storage, 'houses');

    // getDownloadURL(imageRef)
    //         .then((downloadURL) => {
    //             console.log(`Download URL for ${downloadURL}`);
    //             // You can perform further actions with the download URL here
    //         })
    //         .catch((error) => {
    //             console.error('Error getting download URL:', error);
    //         });  
    
})

// console.log('Nested Array:', nestedArray);

// ========
// delete boarding house
deleteBH.addEventListener('click', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'Ace', 'Ace')

    deleteDoc(docRef)
    .then(() => {
        console.log('deleted')
    })

})
// ========


// const tableBody = document.querySelector('#dataTable tbody');

// // Function to fetch and display data in the table
// function displayData() {
//     db.collection('BoardingHouses').get().then((querySnapshot) => {
//         tableBody.innerHTML = ''; // Clear existing rows
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             const row = `<tr>
//                             <td>${data.name}</td>
//                             <td>${data.email}</td>
//                             <td>
//                                 <button onclick="editRecord('${doc.id}')">Edit</button>
//                                 <button onclick="deleteRecord('${doc.id}')">Delete</button>
//                             </td>
//                         </tr>`;
//             tableBody.insertAdjacentHTML('beforeend', row);
//         });
//     });
// }

// // Call displayData function to initially populate the table
// displayData();