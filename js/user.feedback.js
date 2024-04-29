const getLoginCont = document.querySelector('.loginContainer');
const getRent = document.querySelector('#rent');
const getLogo = document.querySelector('#logoContainer');
const getFooter = document.querySelector('.footer');
const getBottomContainer = document.querySelector('.bottomContainer')
const getArrowContainer = document.querySelector('.arrowContainer');
const getServices = document.querySelector('#services');

const goMain = (variable) =>{
    variable.addEventListener('click', () =>{
        window.location.href = 'user.index.html'
    })
}
goMain(getLogo);
goMain(getRent);

getLoginCont.addEventListener('click', () =>{
    window.location.href = 'index.html'
    console.log('logout')
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
    window.location.href = 'user.services.html'
})
