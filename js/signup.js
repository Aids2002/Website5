import { db, auth } from './firebase.js'

import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'


//=======================================(js for signup.html)=======================================
const getWhiteButton = document.querySelector('#whiteClose')
const getOrangeButton = document.querySelector('#orangeCloseButton')

document.getElementById('positiveNumberInput').addEventListener('input', function() {
    let inputValue = this.value.trim();
    if (inputValue.length > 11) {
      this.value = inputValue.slice(0, 11);
    }
  });

const inputElement = document.getElementById('positiveNumberInput');

    inputElement.addEventListener('keydown', function(event) {
        // Check if the '-' key is pressed
        if (event.key === '-' || event.key === 'e' || event.keyCode === 189 || event.which === 189) {
            event.preventDefault(); // Prevent typing '-'
        }
    });

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
    const number = accountSignupForm.querySelector('input[type="number"]').value

    console.log(email)
    console.log(password)
    console.log(number)

    if(email.length == 0)
    {
        alert("Email cannot be empty")
        return
    }else if (password.length == 0)
    {
        alert("Password cannot be empty")
        return
    }else if (number.length == 0 || number.length < 11)
    {
        alert("Number cannot be empty or less than 11 digits")
        return
    }

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
         alert(error.message)
     });
})
//=================================================================================================




   
