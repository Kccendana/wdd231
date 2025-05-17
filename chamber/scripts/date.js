const currentyear = document.querySelector("#currentyear");
currentyear.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified")
lastModified.textContent = document.lastModified;