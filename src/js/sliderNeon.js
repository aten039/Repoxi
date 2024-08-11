window.addEventListener('DOMContentLoaded', function(){

    eventSlider();
    

});

function eventSlider(){

    let sliderImg = document.querySelectorAll('.slider-img');

    sliderImg.forEach( element =>{
        element.addEventListener('click', function(){
            sliderImg.forEach( element => element.classList.remove('active'));
            element.classList.add('active');
        })
    });

}