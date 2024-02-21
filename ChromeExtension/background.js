// // This script would handle message passing and API calls
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     // Example: Handle message to fetch news
//     if(request.action === "fetchNews") {
//       //API calls here
//       // Define your API key and base URL
// const NEWSapiKey = 'ad413b4373c543b59927a7f2b383aad0';
// const NEWSbaseUrl = 'https://newsapi.org/v2/everything';

// const queryParams = `?q=biden AND Jordan AND killed&apiKey=${NEWSapiKey}&language=en&sortBy=relevance`;

// fetch(NEWSbaseUrl + queryParams)
//   .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     const descriptions = data.articles.map(article => article.description).filter(description => description);
//     const authors = data.articles.map(article => article.author);
//     // Use or store the descriptions and authors as needed
//     console.log(descriptions, authors);
//   })
//   .catch(error => console.error('Failed to fetch articles:', error));



//       console.log("Fetching news for keywords:", request.keywords);
//       // Placeholder response
//       sendResponse({summary: "This is a summary of fetched news."});
//     }
//   });
  
