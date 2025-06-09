// Select the toggle checkbox
const toggleSwitch = document.querySelector('input[type="checkbox"]');

// Elements to update
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const textBox = document.getElementById("text-box");

// Base names of images without theme suffix (_light or _dark)
// Add new image base names here as you add images in HTML
const imageBaseNames = [
  "undraw_proud_coder",
  "undraw_feeling_proud",
  "undraw_conceptual_idea",
  "undraw_conceptual_idea_light"
];

// Function to update all image sources based on theme
function updateImages(theme) {
  imageBaseNames.forEach((baseName, index) => {
    const imgId = `image${index + 1}`; // construct image ID, e.g. image1, image2, etc.
    const imgElement = document.getElementById(imgId);
    if (imgElement) {
      // Change image src according to the theme
      imgElement.src = `img/${baseName}_${theme}.svg`;
    }
  });
}

// Dark mode function
function darkMode() {
  nav.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  textBox.style.backgroundColor = "rgba(255, 255, 255, 0.5)";

  // Update toggle text and icon
  if (toggleIcon && toggleIcon.children.length >= 2) {
    toggleIcon.children[0].textContent = "Dark Mode";
    toggleIcon.children[1].classList.remove("fa-sun");
    toggleIcon.children[1].classList.add("fa-moon");
  }

  // Update all images to dark theme
  updateImages("dark");
}

// Light mode function
function lightMode() {
  nav.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  textBox.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

  // Update toggle text and icon
  if (toggleIcon && toggleIcon.children.length >= 2) {
    toggleIcon.children[0].textContent = "Light Mode";
    toggleIcon.children[1].classList.remove("fa-moon");
    toggleIcon.children[1].classList.add("fa-sun");
  }

  // Update all images to light theme
  updateImages("light");
}

// Function to handle theme switch toggle
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); // Save preference
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); // Save preference
    lightMode();
  }
}

// Attach event listener to checkbox toggle
toggleSwitch.addEventListener("change", switchTheme);

// On page load, check local storage for theme and apply it
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkMode();
  } else {
    lightMode();
  }
} else {
  // Default to light mode if no preference saved
  lightMode();
}
