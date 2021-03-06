const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


//Show Loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}
// Get Quote from API
async function getQuote()
{
	loading();

	//const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	//const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	const apiUrl = 'https://freequote.herokuapp.com';
	try {
		//const response = await fetch(proxyUrl+ apiUrl);
		const response = await fetch(apiUrl);
		const data = await response.json();
		//console.log(data);
		
		//if Author is blank, add 'Unknown'
		if (data.author == '') {
			authorText.innerText = 'Unknown';
		} else {
			authorText.innerText = data.author;
		}

		// Reduce font size for long quotes
		if (data.quote.length > 120)
		{
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}
		quoteText.innerText = data.quote;

		//Stop Loader, show quote
		complete();

	} catch (error) {
		getQuote();
	}
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);

// On Load
getQuote();
//loading();
