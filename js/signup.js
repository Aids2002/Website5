import { db, auth } from './firebase.js'

import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'


//=======================================(js for signup.html)=======================================
const getWhiteButton = document.querySelector('#whiteClose')
const getOrangeButton = document.querySelector('#orangeCloseButton')

getOrangeButton.addEventListener('click', () => {
    window.location.href = 'index.html'
})
getWhiteButton.addEventListener('click',() => {
    window.location.href = 'index.html'
})

// signup user
const accountSignupForm = document.getElementById('signUpForm')
accountSignupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = accountSignupForm.querySelector('input[type="text"]').value // Get the email input value
    const password = accountSignupForm.querySelector('input[type="password"]').value // Get the password input value

     // Create the user with email and password
     createUserWithEmailAndPassword(auth, email, password)
     .then((cred) => {
         console.log('User created:', cred.user);
 
         // Send email verification
         const user = auth.currentUser;
         sendEmailVerification(user)
         .then(() => {
             console.log('Email verification sent');
             // Redirect to index.html or any other page
             window.location.href = 'index.html';
             accountSignupForm.reset();
         })
         .catch((error) => {
             console.log('Error sending email verification:', error.message);
         });
     })
     .catch((error) => {
         console.log('Error creating user:', error.message);
     });
})
//=================================================================================================




   
