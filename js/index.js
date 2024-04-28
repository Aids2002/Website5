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
const getServices = document.querySelector('#services');
const getIcons = document.querySelectorAll('.subIconsContainer');
const getHouseContainer = document.querySelector('.houseContainer');
let oldScrollStatus = 0;

///////////////////////////
console.log('here')

const loadBoardingHouses = async (mainString) => {
    try {
        // Query the Firestore collection
        const q = query(collection(db, "boardingHouses"));
        const querySnapshot = await getDocs(q);
        const newData = [];

        querySnapshot.forEach((doc) => {
            const newarray = [];
            newarray.push(doc.data().name, doc.data().img, doc.data().location, doc.data().roomavailable, doc.data().tags);
            newData.push(newarray);
        });

        // Clear existing table rows
        // Assuming 'listed' is declared somewhere accessible

        // Clear the 'listed' array before populating it with new data
        const imgArr = []
        newData.forEach((data) => {
            const [name, img, location, roomavailable, tags] = data;

            
            
            // Split the tags string into an array of individual tags
            const tagList = tags.split(',').map(tag => tag.trim());
            
            // Check if any tag in the tagList array includes the mainString
            const isTagFound = tagList.some(tag => tag.includes(mainString));

            if (isTagFound) {
                console.log(data)
                const createName = document.createElement('p')
                createName.classList.add('houseName')

                const createRoom = document.createElement('p')
                createRoom.classList.add('avail')

                const createPrice = document.createElement('p')
                createRoom.classList.add('pricing')

                const createLoc = document.createElement('div')
                createLoc.classList.add('loc')

                const locImg = document.createElement('img')
                locImg.src = '/Pictures/Favorites_fill.png'

                const createSection = document.createElement('section');
                const createImg = document.createElement('img');
                
                const createTopDiv = document.createElement('div');
                createTopDiv.classList.add('topText')

                const createBotDiv = document.createElement('div');
                createBotDiv.classList.add('bottomText');

                const createDiv = document.createElement('div');
                createDiv.classList.add('inTextP')

                createName.innerText = `${name}`;
                createRoom.innerHTML = `Room Available : ${roomavailable}`;

                createLoc.appendChild(locImg);
                createLoc.innerText = location;

                for (let i = 0;i < img.length;i++){
                    imgArr.push(img[i]);
                }

                createDiv.classList.add('inTextP')
                createImg.classList.add('houseImage')
                createImg.src = imgArr[0];
                
                createTopDiv.append(createLoc)
                createBotDiv.append(createRoom)

                createDiv.append(createName)
                createDiv.append(createTopDiv)
                createDiv.append(createBotDiv)
                
                const createHousesP = document.createElement('div')
                createHousesP.append(createDiv)
                createHousesP.classList.add('housesP')
                
                createSection.appendChild(createImg);
                createSection.appendChild(createHousesP)
                createSection.classList.add('houses');
                getHouseContainer.appendChild(createSection)
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
        console.log('Button clicked. Value:', buttonValue);
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
    window.location.href = 'login.html'
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

const getFeedback = document.querySelector('#feedback')
getFeedback.addEventListener('click', () =>{
    window.location.href = "feedback.html"
})

getServices.addEventListener('click', () =>{
    window.location.href = 'services.html'
})

const getSearchForm = document.querySelector('.locationModal');
const getLocation = document.querySelector('#location').addEventListener('click', () => {
    getSearchForm.style.display = 'block'
})
const getPricing = document.querySelector('#pricing').addEventListener('click', () => {
    getSearchForm.style.display = 'block'
})
const getOrientation = document.querySelector('#orientation').addEventListener('click', () => {
    getSearchForm.style.display = 'block'
})
const getSearchButton = document.querySelector('#searchButtonContainer')
    .addEventListener('click', () => {
        getSearchForm.style.display = 'none';
    })


