const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show the loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide the loading
function complete(){
  if (loader.hidden ){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}



// Show new quote
function showNewQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author){
    authorText.textContent
  }else {
    authorText.textContent = quote.author;
  }
  // check the quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // this line the show the full quote in the quoteText element
  quoteText.textContent = quote.text;
  // authorText.textContent = quote.author || "Unknown";
  // quoteText.textContent = quote.text;
}

// Get Quotes from API
async function getQuote() {

  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    showNewQuote();
    complete();
  } catch (error) {

  }
}

// Tweet Quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}


// Event Listener for new quote button
newQuoteBtn.addEventListener("click", showNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuote();
