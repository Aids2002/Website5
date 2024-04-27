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
const storageRef = ref(storage, `houses`);
const colRef = collection(db, 'boardingHouses')

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
const q = query(collection(db, "boardingHouses"))
const loadBoardingHouses = async () => {
    try {
      const querySnapshot = await getDocs(q);
      const newData = [];
  
      querySnapshot.forEach((doc) => {
        const newarray = [];
        newarray.push(doc.data().name, doc.data().img, doc.data().location, doc.data().roomavailable, doc.data().tags);
        newData.push(newarray);
      });
  
      // Clear existing table rows
  
      // Populate table with updated data
      newData.forEach((data) => {
        const [name, img, location, roomavailable, tags] = data;
        const newTr = document.createElement('tr');
        newTr.innerHTML = `
          <td>${name}</td>
          <td><img src="${img[0]}" alt="Boarding House Image"></td>
          <td>${location}</td>
          <td>${roomavailable}</td>
          <td>${tags}</td>
          <td><button class="delete-btn">Delete</button></td>
        `;
        getTable.appendChild(newTr);
      });

    } catch (error) {
      console.error('Error loading boarding houses:', error);
    }
  };
  ////
  selectFile.addEventListener('change', (e) => {
    console.log('file')
    fileItem = e.target.files;
    fileName = fileItem.name;
    console.log('butu: ',fileItem)
})
  // Initial load of boarding houses
  loadBoardingHouses();

  const table = document.querySelector('.tableContainer #table');

  // Add event listener to the parent element of the table
  table.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON' && target.classList.contains('delete-btn')) {
    // If the clicked element is a "Delete" button inside the table
    console.log('click')

    const row = target.closest('tr'); // Get the closest table row
    if (!row) return; // Return if no row found

    console.log(row)

    // Get the document ID from the first column of the row
    const firstColumn = row.querySelector('td:first-child');
    if (!firstColumn) return; // Return if first column not found

    console.log(firstColumn)

    const documentId = firstColumn.textContent.trim(); // Assuming the document ID is text content
    if (!documentId) return; // Return if no document ID found

    try {
        // Remove the row from the table
        row.remove();
  
        // Delete the corresponding document from Firestore
        await deleteDoc(doc(colRef, documentId));
        console.log('Document deleted successfully.');
  
        // Delete files in the folder in Firebase Cloud Storage
        const folderRef = ref(storageRef, `${documentId}/`);
        const folderFiles = await listAll(folderRef);
        const deleteFilePromises = folderFiles.items.map((item) => deleteObject(item));
        await Promise.all(deleteFilePromises);
  
        // Delete the folder itself
        await deleteObject(folderRef);
        console.log('Folder in Cloud Storage deleted successfully.');
      } catch (error) {
        console.error('Error deleting document and folder:', error);
      }
    }
    });
  
  // Function to handle form submission
  name.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    if (!fileItem) {
      console.error('No file selected.');
      return;
    }
  
    const colRef = collection(db, 'boardingHouses');
    const documentId = name.name.value;
    const data = {
      name: name.name.value,
      location: formData.loc.value,
      roomavailable: formData.room.value,
      tags: formData.tags.value,
      img: [] // Initialize img as an empty array to store URLs
    };
  
    // Array to store promises for each file upload
    const uploadPromises = [];
  
    for (let i = 0; i < fileItem.length; i++) {
      const file = fileItem[i];
      const fileRef = ref(storageRef, `${name.name.value}/${file.name}`);
  
      const uploadPromise = uploadBytes(fileRef, file)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((downloadURL) => {
          data.img.push(downloadURL); // Push the download URL to img array in data
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          throw error; // Propagate the error for centralized error handling
        });
  
      uploadPromises.push(uploadPromise); // Add the upload promise to the array
    }
  
    try {
      await Promise.all(uploadPromises); // Wait for all uploads to complete
      await setDoc(doc(colRef, documentId), data); // Set the document with data containing imgurls
  
      // Add the new boarding house directly to the table without reloading the entire table
      const newTr = document.createElement('tr');
      newTr.innerHTML = `
        <td>${data.name}</td>
        <td><img src="${data.img[0]}" alt="Boarding House Image"></td>
        <td>${data.location}</td>
        <td>${data.roomavailable}</td>
        <td>${data.tags}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;
      getTable.appendChild(newTr);
        
      // Add event listener to the delete button
      const deleteBtn = newTr.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', async () => {
      // Remove the row from the table
      newTr.remove();

      try {
        // Delete the corresponding document from Firestore
        await deleteDoc(doc(colRef, documentId));
        console.log('Document deleted successfully.');
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    });
    alert("Boarding House added")
      name.reset(); // Reset the form
      formData.reset(); // Reset the form
    } catch (error) {
      console.error('Error setting document with image URLs:', error);
    }
  });
   
    // const imageRef = ref(storage, '/houses/Loreen/WMSU.png');

    // getDownloadURL(imageRef)
    //         .then((downloadURL) => {
    //             console.log(`Download URL for ${downloadURL}`);

    //             // Assuming you have the download URL from Firebase Storage stored in a variable called imageUrl
    //             var imageUrl = downloadURL;

    //             // Get the <img> element by its ID or any other suitable selector
    //             var imgElement = document.querySelector("#offcanvasNavbarLabel img");

    //             // Set the src attribute of the <img> element to the Firebase Storage download URL
    //             imgElement.src = imageUrl;
    //             // You can perform further actions with the download URL here
    //             console.log('here');
    //         })
    //         .catch((error) => {
    //             console.error('Error getting download URL:', error);
    //         });  
            
    //         const collectionRef = firebase.firestore().collection('boardinghouses');

    //         let namesArray = [];

    //         // Query the collection to get all documents
    //         collectionRef.get()
    //         .then((querySnapshot) => {
    //     // Loop through each document in the collection
    // querySnapshot.forEach((doc) => {
    //     // Get the name field from each document and add it to the namesArray
    //     const name = doc.data().name; // Assuming 'name' is the field you want to retrieve
    //     namesArray.push(name);
    // });

    // // Now 'namesArray' contains all the names from your collection
    // console.log(namesArray);
    // })


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
//                            <td>
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