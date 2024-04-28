const getLoginCont = document.querySelector('.loginContainer');
const getLogo = document.querySelector('#logoContainer');
const getFooter = document.querySelector('.footer');
const getRent = document.querySelector('#rent');
const getFeedback = document.querySelector('#feedback');
const goMain = (variable) =>{
    variable.addEventListener('click', () =>{
        window.location.href = 'index.js'
    })
}
goMain(getLogo);
goMain(getRent);


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

getRent.addEventListener('click', () => {
    window.location.href = 'index.html'
})
getFeedback.addEventListener('click', () =>{
    window.location.href = 'feedback.html'
})
getLoginCont.addEventListener('click', () =>{
    window.location.href = 'login.html'
})