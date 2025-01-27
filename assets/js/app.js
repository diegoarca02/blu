function animateBars(){
    let bar_1 = document.querySelector('.icon-bar-1');
    let bar_2 = document.querySelector('.icon-bar-2');
    let bar_3 = document.querySelector('.icon-bar-3');

    bar_1.classList.toggle('icon-bar-1-active');
    bar_2.classList.toggle('icon-bar-2-active');
    bar_3.classList.toggle('icon-bar-3-active');
}