require("dotenv").config(); // This loads the key from the .env file
const apiKey = process.env.UNSPLASH_API_KEY; // Use the key here

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];
// show the loading

// unsplash api
const count = 10;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=10`;


//  Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create elements for links & photos add to DOM
function displayPhotos() {
  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    // put <img> inside <a>, then put both inside imageContainer element
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
  loader.hidden = true;
}

// get photos from unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // display photos
    displayPhotos();
    console.log(photosArray);
  } catch (error) {
    // catch error here
  }
}
// check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    // console.log("load more");
    getPhotos();
  }
});
//on load
getPhotos();
