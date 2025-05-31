
const memberships = [
  {
    level: 'NP Membership',
    sub: 'For nonprofit organizations dedicated to making a positive impact in Matsusaka',
    descriptions: [
      'Free membership',
      'Access to Chamber networking events',
      'Invitations to community-driven initiatives'
    ]
  },
  {
    level: 'Bronze Membership',
    sub: 'Ideal for small businesses and startups looking to grow and connect with the local business community',
    descriptions: [
      'Business directory listing',
      'Member-exclusive discounts on events and services',
      'Complimentary participation in one Chamber event per year'
    ]
  },
  {
    level: 'Silver Membership',
    sub: 'Provides enhanced exposure and valuable resources for growing businesses',
    descriptions: [
      'All Bronze Member benefits',
      'Priority access to Chamber events',
      'Opportunities to sponsor Chamber events'
    ]
  },
  {
    level: 'Gold Membership',
    sub: 'For established businesses seeking maximum visibility and influence within the Chamber and the community',
    descriptions: [
      'All Silver Member benefits',
      'Complimentary tickets to all Chamber events',
      'Personalized business consultation and support'
    ]
  }
];

function createMembershipCard(memberships) {
  const container = document.querySelector(".memLevel");
  container.innerHTML = '';

  memberships.forEach(({ level, sub, descriptions }) => {
    const card = document.createElement("div");
    card.className = 'member-level';

    card.innerHTML = `
      <h3>${level}</h3>
      <button class="learn-more button">Learn More</button>
    `;

    card.querySelector('.learn-more').addEventListener("click", () => {
      displayMembershipDetails({ level, sub, descriptions });
    });

    container.appendChild(card);
  });
}


function displayMembershipDetails({ level, sub, descriptions }) {
  const modal = document.querySelector("#memDetails");
  modal.innerHTML = `
    <div class="memBtnCon"><button id="closeModal">×</button>
    <h2>${level}</h2></div>
    <p class="sub">${sub}</p>
    ${descriptions.map(desc => `<p>✓ ${desc}</p>`).join('')}
  `;

  modal.showModal();

  modal.querySelector("#closeModal").addEventListener("click", () => {
    modal.close();
  });
}

document.addEventListener('DOMContentLoaded', function() {
    const timestampInput = document.getElementById('timestamp');
    const now = new Date();
    const formattedDateTime = now.toISOString();
    timestampInput.value = formattedDateTime;
});


// Initialize
createMembershipCard(memberships);