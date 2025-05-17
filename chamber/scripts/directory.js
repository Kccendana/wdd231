//variables
const membersUrl = 'data/members.json';
const memberListCon = document.querySelector('#memberList');
const gridButton = document.querySelector('.grid-button');
const listButton = document.querySelector('.list-button');


async function getBusinessData() {
	try {
		const response = await fetch(membersUrl);
		if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

		const data = await response.json();
		return data.members;
	}
	catch(error) {
		console.error("Error fetching business data:", error);
	}

}

getBusinessData().then((members) => {
  displayBusinessCards(members, memberListCon);
})

function displayBusinessCards(memberList,elementCon) {
	elementCon.innerHTML = "";
	memberList.forEach((member) => {
		const memberCards = `<section id="cards" class="b-cards">
				<h2 class="business-name">${member.name}</h2>
				<div class="logo-container"><img class="pic" src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100"></div>
				<p class="address">${member.address}</p>
				<p class="number">${member.number}</p>
				<a class="site" href="${member.website}" target="_blank">${member.name}</a>
			</section>`;
		elementCon.innerHTML += memberCards;
	});
}

gridButton.addEventListener('click', () => {
   const memberListCon = document.querySelector('#memberList');
   const logoContainers = document.querySelectorAll('.logo-container');
    logoContainers.forEach(container => {
        container.style.display = 'flex';
    });
    memberListCon.classList.remove('list');
    listButton.classList.remove('activeButton');
    gridButton.classList.add('activeButton');
    memberListCon.classList.add('grid');
})

listButton.addEventListener('click', () => {
    const memberListCon = document.querySelector('#memberList');
    const logoContainers = document.querySelectorAll('.logo-container');
    logoContainers.forEach(container => {
        container.style.display = 'none';
    });
    console.log('list button clicked');
    memberListCon.classList.remove('grid');
    memberListCon.classList.add('list');
    gridButton.classList.remove('activeButton');
    listButton.classList.add('activeButton');

})
