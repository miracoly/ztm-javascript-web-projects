import { UNSPLASH_ACCESS_KEY } from "./api-key.js";

// Unsplash API config
const API_COUNT = 10;
const API_QUERY = "rainforest";
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}&count=${API_COUNT}&query=${API_QUERY}`;

const IMAGE_CONTAINER = document.getElementById("image-container");
const LOADER = document.getElementById("loader");
let imagesLoaded = 0;
let readyToLoadMoreImages = false;

async function getPhotosFromUnsplash(apiUrl) {
	try {
		const response = await fetch(apiUrl);
    const photoArray = await response.json();
		return photoArray; 
	} catch (error) {
    console.log("Error getting photos from Unsplash", error);
  }
}

async function printPhotosFromUnsplash(apiUrl, imageContainer) {
	const photoArray = await getPhotosFromUnsplash(apiUrl);
  const imagesToLoad = photoArray.length;

  photoArray.forEach((photo) => {
    // Create new photo element - <img> inside <a> tag
    const a = document.createElement("a");
    setAttributes(a, {
      href: photo.links.html,
      target: "_blank"
    })
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })

    // Use load-event to check, if every image did load
    img.addEventListener("load", () => {
      imagesLoaded++;
      if (imagesLoaded === imagesToLoad) {
        readyToLoadMoreImages = true; 
        imagesLoaded = 0;
        LOADER.hidden = true;
      }
    })

    // append childs to parents
    a.appendChild(img);
    imageContainer.appendChild(a);
  });
}

// Sets multiple attributes to html-element
function setAttributes(elem, attributes) {
  for (const key in attributes) {
    elem.setAttribute(key, attributes[key]); 
  }
}

// Scroll event for infinie scroll
window.addEventListener("scroll", () => {
  // true if less than 1000px left to bottom of page
  const scrolledNearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000;

  // readyToLoadMoreImages is true if all previous images did load, otherwise false
  if (scrolledNearBottom && readyToLoadMoreImages) {
    readyToLoadMoreImages = false;
    printPhotosFromUnsplash(API_URL, IMAGE_CONTAINER_ID);
  }
});

printPhotosFromUnsplash(API_URL, IMAGE_CONTAINER);
