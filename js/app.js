/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const docFragment = document.createDocumentFragment();
const list = document.querySelector('#navbar__list');
const pageHeader = document.querySelector('.page__header');
const topBtn = document.getElementById('topBtn');

/**
 * End Global Variables
*/

/**
* start looping on sections and create li , anchors and append to docfragment
*
*/
//looping and create li and anchors
for(let i = 0; i < sections.length ;i++){

    const li = document.createElement('li');
	docFragment.appendChild(li);
    const link = document.createElement('a');
    link.setAttribute('class','menu__link');
    link.textContent  = sections[i].getAttribute('data-nav');
    li.appendChild(link);
}

//append docfrag to list
list.appendChild(docFragment);

// adding href and prevent default scrolling
const anchors = document.querySelectorAll('.menu__link');
for(let i = 0; i < anchors.length ;i++){
    anchors[i].setAttribute('href',(sections[i].getAttribute('id')));
    anchors[i].addEventListener('click', function(){ 
		event.preventDefault()                   
        sections[i].scrollIntoView({behavior: 'smooth', block: 'center'});   
   }); 
}

/**
* End looping on sections and create li , anchors and appent to docfragment
*
*/




/**
*Start highlighting active section according to section offset and highlighting navbar menu items according to active section
*
*/
const listItems = document.querySelectorAll('li > a');

//getting the current section while window scrolling
window.addEventListener('scroll',()=>{
	let currentSection='';
    sections.forEach(section=>{     
        const sectionStart = section.offsetTop-100;
        const sectionEnd = (section.offsetTop-100) + section.clientHeight;
   
// condition if the pageYOffset is between section start and section end it will be active 
//then get the current section data-nav class
        if(pageYOffset >= sectionStart && pageYOffset <= sectionEnd ){
            currentSection = section.getAttribute('data-nav');
             section.classList.add ('your-active-class');
        } else {section.classList.remove ('your-active-class');} 
    });
    
	
    //removing active item style from all li then add active to the li than contains ths text of the current section
      listItems.forEach(li => {
		li.classList.remove('activeItem');
         if(li.textContent === (currentSection)){
			li.classList.add('activeItem');
        }
    });
});

/**
*End highlighting active section according to section offset and highlighting navbar menu items according to active section
*
*/



/**
*Start hide/show header and hide/show scroll top button
*
*/


// show topBtn 300px from the top and show pageHeader while scrolling /hide on no scroll

let hideHeader;
function scrollFunction() {
	if (document.documentElement.scrollTop > 300) {
		topBtn.style.display = 'block';
    } else {
       topBtn.style.display = 'none';
    }
	
	//show page header while scrolling 
    clearTimeout(hideHeader);
    pageHeader.style.display = 'block'; 
	//hide page header whie no scroll for 4 seconds
     hideHeader =setTimeout(function(){ pageHeader.style.display = 'none'; }, 4000);       
} 
window.onscroll = function() {scrollFunction()};

//  scroll top button  function
function topScroll() {
	document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/**
*End hide/show header and hide/show scroll top button
*
*/


