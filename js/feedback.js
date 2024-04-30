export {db, auth, app} from './firebase.js'
import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, setDoc, deleteDoc, doc, query, where, getDocs, documentId} from 'firebase/firestore'

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
// const dbRef = ref(db)

const getLoginCont = document.querySelector('.loginContainer');
const getRent = document.querySelector('#rent');
const getLogo = document.querySelector('#logoContainer');
const getFooter = document.querySelector('.footer');
const getBottomContainer = document.querySelector('.bottomContainer')
const getArrowContainer = document.querySelector('.arrowContainer');
const getServices = document.querySelector('#services');

//=== 
// Get the form element and the input element inside it
const form = document.querySelector('.feedbacksContainer');
const input = form.querySelector('#elaborateText');
var colRef = collection(db, 'feedback');

const loadFeedBacks = async () => {
    try{

        const q = query(collection(db, "feedback"));
        const querySnapshot = await getDocs(q);
        const newData = [];
        
        const getFeedBackSectionDiv = document.querySelector('#feedbackSection')
        querySnapshot.forEach((doc) => {
            const newarray = [];
            newarray.push(doc.data().userFeedback)
            newData.push(newarray);
        });
        
        newData.forEach((data) => {
            const [userFeedBack] = data;
            
            const feedbackDiv = document.createElement('div')
            feedbackDiv.innerText = userFeedBack
            feedbackDiv.classList.add('feedback')

            let accountNumberDiv = document.createElement('div')
            accountNumberDiv.innerText = `Anonymous:`;

            const feedBackContainerDiv = document.createElement('div')
            feedBackContainerDiv.append(accountNumberDiv)
            feedBackContainerDiv.append(feedbackDiv);
            feedBackContainerDiv.classList.add('feedBackContainer')
            
            const feedBackBackground = document.createElement('div')
            feedBackBackground.append(feedBackContainerDiv)
            feedBackBackground.classList.add('feedBackBackground')

            getFeedBackSectionDiv.append(feedBackBackground)
            
            const getThirdPage = document.querySelector('#thirdPage')
            getThirdPage.append(getFeedBackSectionDiv)
            })
            
        
            
    }
    catch (e){
        console.log('error',e)
    }
}
loadFeedBacks();


// Add an event listener to the form for when it's submitted
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    if(input.value == '')
    {
        console.log('Empty feedback')
        alert('You have entered a empty feedback, please add something')
        return
    }


    // Example usage
    const randomStr1 = getRandomNumberAsString();
    const randomStr2 = getRandomNumberAsString();
    const randomStr3 = getRandomNumberAsString();

    const documentId = "fdbck-" + randomStr1 + "-" + randomStr2 + "-" + randomStr3;

    console.log(documentId)

    const data = {
        userFeedback: input.value
    };

    setDoc(doc(colRef, documentId), data);
    console.log(doc(colRef,documentId),data)
    loadFeedBacks();
    alert('Thank you for your feedback!')
    form.reset() 
});



//===
//===
function getRandomNumberAsString() {
    // Generate a random number between 1 and 100
    const randomNumber = Math.floor(Math.random() * 9999) + 1;
    
    // Convert the random number to a string
    const randomNumberAsString = randomNumber.toString();
    
    // Return the random number as a string
    return randomNumberAsString;
}
//===

const goMain = (variable) =>{
    variable.addEventListener('click', () =>{
        window.location.href = 'index.html'
    })
}
goMain(getLogo);
goMain(getRent);

getLoginCont.addEventListener('click', () =>{
    window.location.href = 'login.html'
})

let oldScrollStatus = 0;
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

getArrowContainer.addEventListener('click', () =>{
    getBottomContainer.scrollIntoView ({behavior: 'smooth'});
})
getServices.addEventListener('click', () =>{
    window.location.href = 'services.html'
})
