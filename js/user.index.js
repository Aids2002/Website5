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

// get firestore database instance and reference
const db = getFirestore(app)
const dbRef = ref(db)

// Get storage instance and reference
const storage = getStorage();
const storageRef = ref(storage, `houses`);
const colRef = collection(db, 'boardingHouses')

const getSearchContainer = document.querySelector('#searchContainer');
const topSec = document.querySelector('.topSection');
const topCon = document.querySelector('.topContentContainer');
const getwhiteSection = document.querySelector('#whiteSection');
const getIconSection = document.querySelector('#iconsSection')
const getP = document.querySelector('#pText')
const getPer = document.querySelector('.persuasiveText')
const getLoginButton = document.querySelector('#loginButton');
const getFooter = document.querySelector('.footer');
const getFeedback = document.querySelector('#feedback')
const getServices = document.querySelector('#services');
const getIcons = document.querySelectorAll('.subIconsContainer');
const getHouseContainer = document.querySelector('.houseContainer');
let oldScrollStatus = 0;

const getLocation = document.querySelector('#location');
const getSearchForm = document.querySelector('.locationModal');
const searchForm = document.querySelector('#searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(getLocation.value);
    loadBoardingHouses(getLocation.value)
    getLocation.value = '';

})

console.log(getLocation.value)
// getLocation.addEventListener('click', () => {
//     getSearchForm.style.display = 'block'
// })
getLocation.addEventListener('keydown', (e)=>{
    getSearchForm.style.display = 'none'
})
const getSearchButton = document.querySelector('#searchButtonContainer').addEventListener('click', () => {
    getSearchForm.style.display = 'none';
})

getFeedback.addEventListener('click', () =>{
    window.location.href = "user.feedback.html"
})

getServices.addEventListener('click', () =>{
    window.location.href = 'user.services.html'
})

///////////////////////////
console.log('here')
let currentTag = ''; // Variable to store the currently displayed tag

const loadBoardingHouses = async (mainString) => {
    try {
        // Check if the mainString is the same as the currentTag
        if (mainString === currentTag) {
            return; // If the same tag is clicked again, do nothing
        }
        
        currentTag = mainString; // Update the currentTag

        // Clear existing table rows
        // Assuming 'getHouseContainer' is declared somewhere accessible
        getHouseContainer.innerHTML = '';

        // Query the Firestore collection
        const q = query(collection(db, "boardingHouses"));
        const querySnapshot = await getDocs(q);
        const newData = [];

        querySnapshot.forEach((doc) => {
            const newarray = [];
            newarray.push(doc.data().name, doc.data().img, doc.data().location,doc.data().price, doc.data().roomavailable, doc.data().tags);
            newData.push(newarray);
        });

        newData.forEach((data) => {
            const [name, img, location, price, roomavailable, tags] = data;
            
            // Split the tags string into an array of individual tags
            const tagList = tags.split(',').map(tag => tag.trim());
            
            // Check if any tag in the tagList array includes the mainString
            const isTagFound = tagList.some(tag => tag.includes(mainString));

            if (isTagFound) {
                const createName = document.createElement('p')
                createName.classList.add('houseName')
                createName.innerText = `${name}`;

                const createRoom = document.createElement('p')
                createRoom.classList.add('avail')
                createRoom.innerHTML = `Room Available : ${roomavailable}`;

                const createPrice = document.createElement('p')
                createPrice.classList.add('pricing')
                createPrice.innerHTML = `Price starts at : ${price}`;

                const createLoc = document.createElement('div')
                createLoc.classList.add('loc')
                createLoc.innerText = location;

                const locImg = document.createElement('img')
                locImg.src = '/Pictures/Favorites_fill.png'
                createLoc.appendChild(locImg);

                const createSection = document.createElement('section');
                const createImg = document.createElement('img');
                createImg.classList.add('houseImage')
                createImg.src = img[0]; // Assuming img is an array of image URLs
                
                const createTopDiv = document.createElement('div');
                createTopDiv.classList.add('topText')
                createTopDiv.appendChild(createLoc);
                
                const createBotDiv = document.createElement('div');
                createBotDiv.classList.add('bottomText');
                createBotDiv.appendChild(createRoom);
                createBotDiv.appendChild(createPrice);

                const createDiv = document.createElement('div');
                createDiv.classList.add('inTextP')
                createDiv.appendChild(createName);
                createDiv.appendChild(createTopDiv);
                createDiv.appendChild(createBotDiv);
                
                const createHousesP = document.createElement('div')
                createHousesP.appendChild(createDiv);
                createHousesP.classList.add('housesP')
                
                createSection.appendChild(createImg);
                createSection.appendChild(createHousesP);
                createSection.classList.add('houses');
                getHouseContainer.appendChild(createSection);
            }
        });

        // Call a function to update your UI with the filtered data, assuming 'updateUI' is defined

    } catch (error) {
        console.error('Error loading boarding houses:', error);
    }
};

// Now attach the event listeners

getIcons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonValue = this.getAttribute('data-value');
        // Call loadBoardingHouses with the buttonValue
        loadBoardingHouses(buttonValue);
    });
});

// Initially load the favorite tag
loadBoardingHouses('favorite');


// Now attach the event listeners
getIcons.forEach(button => {
    button.addEventListener('click', function() {
        getIcons.forEach(container => {
            const button = container.querySelector('button');
            const span = button.querySelector('span');
            // Check if the clicked button is the "Favorite" button
            if (button.getAttribute('data-value') === 'favorite') {
                span.style.fontWeight = 'bold'; // Bold font weight for "Favorite" button
            } else {
                span.style.fontWeight = 'normal'; // Normal font weight for other buttons
            }
            span.style.fontWeight = 'normal';

        });

        // Bold the font weight of the clicked span
        const button = this.querySelector('button');
        const span = button.querySelector('span');
        span.style.fontWeight = 'bold';
        const buttonValue = this.getAttribute('data-value');
        // Call loadBoardingHouses with the buttonValue
        loadBoardingHouses(buttonValue);
    });
});
  
  console.log('end')
///////////////////////////

window.addEventListener('scroll', () =>{
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    if (currentScrollTop > oldScrollStatus){
        getFooter.style.opacity = "0";
        setTimeout(()=>{
            getFooter.style.display ='none';
        },300)
    }
    else{
        setTimeout(()=>{
            getFooter.style.opacity ='1';
            getFooter.style.display ='flex';
        },300)
    }
    oldScrollStatus = currentScrollTop;
})

getLoginButton.addEventListener('click', () => {
    window.location.href = 'index.html'
});

const modifyTop = () => {
    getPer.style.display = 'none';
    getSearchContainer.style.maxHeight ='50px';
    getwhiteSection.style.minHeight ='150px'
    getIconSection.style.maxHeight='72px'
}
const resetTop = () => {
    getPer.style.display = 'flex';
    getP.style.minHeight = '57px'
}
const scrollNumber =  windowScrollStatus = () =>{
    const windowscrossY = window.scrollY;
    return windowscrossY;
}
window.addEventListener('scroll', function(){
    if (scrollNumber() > 20){
        modifyTop();
       
    }
    else{
        getwhiteSection.style.minHeight ='288px';
        resetTop();
    }
})


console.log(selectedLocation);
// Get the selected pricing value


// Get the selected room orientation value


