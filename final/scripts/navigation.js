export const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

export const lastModified = document.getElementById("lastModif")
lastModified.textContent = document.lastModified;

// nav button toggle
export function navigation(){
  const navButton = document.querySelector('.nav-button');
  const navList = document.querySelector('.navi');
  const logo = document.querySelector('.logo');

  navButton.addEventListener('click', () => {
    navButton.classList.toggle('close');
    navList.classList.toggle('show');
    logo.classList.toggle('hidden');
  }, false);

  window.onresize = () => { if (window.innerWidth > 760) 
    navList.classList.remove('show'); 
    navButton.classList.remove('close');
    logo.classList.remove('hidden');
  }
}

navigation()