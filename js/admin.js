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

const imageElement = document.getElementById('image-container');

// for inputs - strings or num
const name = document.querySelector('#nameForm')
const formData = document.querySelector('#boardingForm')
// delete
const deleteBH = document.querySelector('#delBoardingHouse')
// for inputs - image
const selectFile = document.querySelector('#fileInp')
var fileItem
var fileName

var locationData
var roomData

document.addEventListener("DOMContentLoaded", function() {
  const pageFeedback = document.querySelector('.dropdown-menu .dropdown-item:nth-of-type(1)');
  const logout = document.querySelector('.dropdown-menu .dropdown-item:nth-of-type(2)');

  pageFeedback.addEventListener('click', function() {
      alert('Page Feedback clicked!');
      // Add your logic here for handling page feedback
  });

  logout.addEventListener('click', function() {
      alert('Logout clicked!');
      // Add your logic here for handling logout
  });
});

var boardingForm = document.getElementById('boardingForm');
var locationSelect = boardingForm.querySelector('#location\\:');

locationSelect.addEventListener('change', function() {
    var selectedLocation = locationSelect.options[locationSelect.selectedIndex].value;
    console.log(selectedLocation);
    locationData = selectedLocation
});

var roomSelect = boardingForm.querySelector('#roomavailable\\:');

roomSelect.addEventListener('change', function() {
    var selectedRoom = roomSelect.options[roomSelect.selectedIndex].value;
    console.log(selectedRoom);
    roomData = selectedRoom
});

var finalString = '';

document.addEventListener('DOMContentLoaded', () => {
  var checkboxes = document.querySelectorAll('.checkbox-input');
  var selectedTags = [];
  

  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
          if (this.checked) {
              selectedTags.push(this.value);
          } else {
              var index = selectedTags.indexOf(this.value);
              if (index !== -1) {
                  selectedTags.splice(index, 1);
              }
          }

          var formattedString = selectedTags.join(', ');
          console.log('Selected tags:', formattedString);
          finalString = formattedString
          // You can use 'formattedString' as needed, like assigning it to an input value or displaying it on the page
      });
  });
});

/////////////////////////// load table values
const q = query(collection(db, "boardingHouses"))
const loadBoardingHouses = async () => {
    try {
      const querySnapshot = await getDocs(q);
      const newData = [];
  
      querySnapshot.forEach((doc) => {
        const newarray = [];
        newarray.push(doc.data().name, doc.data().img, doc.data().location, doc.data().roomavailable, doc.data().price, doc.data().tags);
        newData.push(newarray);
      });
  
      // Clear existing table rows
  
      // Populate table with updated data
      newData.forEach((data) => {
        const [name, img, location, roomavailable, price, tags] = data;
        console.log(data)
        const newTr = document.createElement('tr');
        newTr.innerHTML = `
          <td>${name}</td>
          <td><img src="${img[0]}" alt="Boarding House Image"></td>
          <td>${location}</td>
          <td>${roomavailable}</td>
          <td>${price}</td>
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
  var fileItem;

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
// 
var loadingSpinner = document.getElementById('loadingSpinner');
var isCompleted = false; // Variable to track completion status

// Show loading spinner
loadingSpinner.style.display = 'block';
// 
    if(name.name.value == '')
    {
      console.error('No name inputted.');
      alert('No name inputted.')
      loadingSpinner.style.display = 'none';
      return;
    }

    if(formData.price.value == '')
    {
      console.error('No price inputted.');
      alert('No price inputted.')
      loadingSpinner.style.display = 'none';
      return;
    }

    if (typeof locationData == 'undefined') {
      console.log('Location is not edited');
      alert('Location is not edited. Please choose a Location')
      loadingSpinner.style.display = 'none';
      return;
    } 

    if (typeof roomData == 'undefined') {
      console.log('Rooms is not edited');
      alert('Rooms is not edited. Please choose a No. of Rooms')
      loadingSpinner.style.display = 'none';
      return;
    } 

    if(finalString.length == 0)
    {
      console.error('No tags selected.');
      alert('No tags selected.')
      loadingSpinner.style.display = 'none';
      return;
    }
  
    if (!fileItem) {
      console.error('No file selected.');
      alert('No file selected.')
      loadingSpinner.style.display = 'none';
      return;
    }

    console.log(name.name.value)
    console.log(locationData)
    console.log(roomData)
    console.log(formData.price.value)
    console.log(finalString+", "+locationData)

    var newString = finalString+", "+locationData

    const colRef = collection(db, 'boardingHouses');
    const documentId = name.name.value;
    const data = {
      name: name.name.value,
      location: locationData,
      roomavailable: roomData,
      price: formData.price.value,
      tags: newString,
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
        <td>${data.price}</td>
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
    // 
    // Simulate adding item (setTimeout used as an example, replace with actual logic)
    setTimeout(function() {
      // Hide loading spinner after some time (simulating completion)
      loadingSpinner.style.display = 'none';
      isCompleted = true;
      if (isCompleted) {
        alert("Boarding House added")
      }
    }, 1); // Change 2000 to the actual time it takes to add the item

    // Check if alert is fired and stop the spinner if needed
    var interval = setInterval(function() {
      if (isCompleted) {
        clearInterval(interval); // Stop checking
        loadingSpinner.style.display = 'none'; // Hide spinner if not already hidden
      }
    }, 1); // Check every 100 milliseconds for completion
    // 
      name.reset(); // Reset the form
      formData.reset(); // Reset the form
      finalString.length = 0
    } catch (error) {
      console.error('Error setting document with image URLs:', error);
    }
  });

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