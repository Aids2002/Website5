import { db, auth } from './firebase.js';

//=======================================(js for index.html)=======================================
const getSearchContainer = document.querySelector('#searchContainer')
const getwhiteSection = document.querySelector('#whiteSection')
const getIconSection = document.querySelector('#iconsSection')
const getP = document.querySelector('#pText')
const getPer = document.querySelector('.persuasiveText')
const getLoginButton = document.querySelector('#loginButton')
const getFooter = document.querySelector('.footer')

let oldScrollStatus = 0
window.addEventListener('scroll', () =>{
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop
    if (currentScrollTop > oldScrollStatus){
        getFooter.style.opacity = "0"
        setTimeout(()=>{
            getFooter.style.display ='none'
        },300)
    }
    else{
        setTimeout(()=>{
            getFooter.style.opacity ='1'
            getFooter.style.display ='flex'
        },300)
    }
    oldScrollStatus = currentScrollTop
})
getLoginButton.addEventListener('click', () =>{
    window.location.href = 'login.html'   
})
const modifyTop = () => {
    getPer.style.display = 'none'
    getSearchContainer.style.maxHeight ='50px'
    getwhiteSection.style.minHeight ='150px'
    getIconSection.style.maxHeight='72px'
}
const resetTop = () => {
    getPer.style.display = 'flex'
    getP.style.minHeight = '57px'
}
const scrollNumber = () =>{ //=  windowScrollStatus - between uito ng scrollnumber at '='
    const windowscrossY = window.scrollY
    return windowscrossY
}
window.addEventListener('scroll', function(){
    if (scrollNumber() > 20){
        modifyTop()
       
    }
    else{
        getwhiteSection.style.minHeight ='288px'
       
        resetTop()
    }
})
//=================================================================================================

