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
const listOfSection = document.querySelectorAll('section')
const navList = document.getElementById('navbar__list')

/**
 * End Global Variables
 */

// Build menu by iterating through the listOfSection
// Create Home Link
const homeLink = document.createElement('li');
homeLink.innerText = 'Home';
homeLink.className = 'menu__link';
navList.appendChild(homeLink);
// Create Section Link
listOfSection.forEach(function(section){
  const navlistElement = `<li class='menu__link' data-link=${section.id}><a href="#${section.id}">${section.dataset.nav}</li>`;
  navList.insertAdjacentHTML('beforeend', navlistElement);
})

// Scroll to section on link click by listenting to the click-event in the navlist
navList.addEventListener('click', function(event){
  event.preventDefault();
  const parent = event.target.hasAttribute('data-link')? event.target : event.target.parentElement;
  const sectionId = parent.id? 'top': parent.dataset.link;
  const sectionToScrollTo = document.getElementById(sectionId);
  sectionToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth', inline: "nearest"});
})

// Set section and nav link as active using the IntersectionObserver pattern
const callback = function(entries){
  entries.forEach(function(entry){
    const navListElement = document.querySelector(`.menu__link[data-link='${entry.target.id}']`,)
    const section = document.getElementById(entry.target.id)

    if (entry && entry.isIntersecting) {
      navListElement.classList.add('active')
      section.classList.add('active')
    } else {
      if (navListElement.classList.contains('active')) {
        navListElement.classList.remove('active')
      }

      if (section.classList.contains('active')) {
        section.classList.remove('active')
      }
    }
  })
}

// Options for the observer. Most important is the threshold
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

// Setting an observer with options and a callback which checks if the navelement should be active
const observer = new IntersectionObserver(callback, options)
listOfSection.forEach(function(section) {
  observer.observe(document.getElementById(section.id))
})
