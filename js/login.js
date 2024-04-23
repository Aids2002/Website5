export {db, auth, app } from './firebase.js'
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAPnM2OvmJnMJSc4lgk39MkZnrb2x7dnhs",
    authDomain: "boarding-buddy-1.firebaseapp.com",
    projectId: "boarding-buddy-1",
    storageBucket: "boarding-buddy-1.appspot.com",
    messagingSenderId: "524014652013",
    appId: "1:524014652013:web:aa6f0b1c732dc471348d64"
  }
// import { firebaseConfig} from 'firebase.js'
console.log(firebaseConfig) ;

const auth = getAuth()

// const getLoginInt = document.querySelector('.loginInt');
const getCloseLog = document.querySelector('#loginCloseButton');
const getSignUpText = document.querySelector('#signUpText');
const getWhiteButton = document.querySelector('#whiteClose');

// for button submit
document.addEventListener('DOMContentLoaded', function() {
    // Select the form element
    var form = document.querySelector('.form form');

    // Add an event listener for the button click
    var button = document.querySelector('.form button');
    button.addEventListener('click', function(event) {
        // Prevent the default button click behavior
        event.preventDefault();
        console.log('pressed')

         
    // })

        // For example, you can access form data like this:
        var email = document.getElementById('inputText1').value;
        var password = document.getElementById('inputText2').value;

        console.log(email)
        console.log(password)

        // // Perform any validation or API calls here

        signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
        console.log('user logged in: ', cred.user)
        if(email == 'adminAccount@gmail.com' && password == '123456')
        {
            console.log('admin')
            window.location.href = 'admin.html';
            return
        }
        window.location.href = 'index.html';
        })
        .catch((error) => {
            console.log(error.message)
        })
    })
});
//

getCloseLog.addEventListener('click',  () => {
    window.location.href = 'index.html'
})
getSignUpText.addEventListener('click', () =>{
    window.location.href  = 'signup.html'
    console.log('working')
})

getWhiteButton.addEventListener('click', () => {
    window.location.href = 'index.html'
})


// login and logout

// const logoutButton = document.querySelector('.logout')
// logoutButton.addEventListener('click', () => {
//     signOut(auth)
//     .then(() => {
//         // console.log('user signed out')
//     })
//     .catch((error) => {
//         console.log(error.message)
//     })
// })

// const loginForm = document.querySelector('.login')
// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const email = loginForm.email.value
//     const password = loginForm.password.value
    
//     signInWithEmailAndPassword(auth, email, password)
//     .then((cred) => {
//         // console.log('user logged in: ', cred.user)
//     })
//     .catch((error) => {
//         console.log(error.message)
//     })

// })