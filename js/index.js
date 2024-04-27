
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
