function scrollToTop(){
window.scrollTo({top:0,behavior:"smooth"})
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Back to Top Button Visibility
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

async function loadClubs(){

const response = await fetch("clubs.json")
const clubs = await response.json()

const container = document.getElementById("clubContainer")

clubs.forEach(club =>{

const card = document.createElement("div")
card.classList.add("club-card")

card.innerHTML = `
<h3>${club.name}</h3>
<p class="club-type">${club.type}</p>
<p>${club.description}</p>
<p><b>Grades:</b> ${club.grades}</p>
<p><b>Meets:</b> ${club.meeting}</p>
`

container.appendChild(card)

})

}

loadClubs()
