import { places } from "../data/places.mjs";
// welcome
const visitorInfo = document.querySelector("#here");
const lastVisit = localStorage.getItem("lastVisit");
const currentDate = new Date();

if (lastVisit === null) {
	visitorInfo.textContent = "Welcome! Let us know if you have any questions.";
} else {
	const lastVisitDate = new Date(lastVisit);
	const timeDiff = currentDate.getTime() - lastVisitDate.getTime();
	const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

	if (daysDiff < 1) {
		visitorInfo.textContent = "Back so soon! Awesome!";
	} else if (daysDiff === 1) {
		visitorInfo.textContent = "You last visited 1 day ago.";
	} else {
		visitorInfo.textContent = `You last visited ${daysDiff} days ago.`;
	}
}

localStorage.setItem("lastVisit", currentDate.toString());

// PLACES
const placeDiv = document.querySelector("#allplaces");

function displayItems(places) {
  placeDiv.innerHTML = "";
  places.forEach(place => {
    const placeCards =`
      <div class="place">
        <figure class="photo">
            <img src="${place.photoUrl}" alt="${place.name}" loading="lazy" />
          </figure>
          <h2 class="placeName">${place.name}</h2>
          <address class="address">${place.address}</address>
          <p class="placeDesc">${place.description}</p>
          <button class="button">Learn More</button>
      </div>`;
    placeDiv.innerHTML += placeCards;
  });
}


displayItems(places)
