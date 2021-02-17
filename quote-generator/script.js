const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
  const API_URL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(PROXY_URL + API_URL);
    const data = await response.json();

    // check if author is unknown
    if (data.authorText) {
      authorText.innerText = data.authorText;
    } else {
      authorText.innerText = "Unknown";
    }
    
    quoteText.innerText = data.quoteText;

    // check for long quote
    if (quoteText.innerText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    removeLoadingSpinner();
  } catch (error) {
    console.log("Ups, no quote", error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);  

// On load
getQuote();

