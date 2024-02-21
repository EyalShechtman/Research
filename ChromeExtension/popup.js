document.addEventListener('DOMContentLoaded', function(){
  var submission = document.getElementById('alalyzeBtn');
  document.getElementById('analyzeBtn').addEventListener('click', function(){
    var inputText = document.getElementById('tweetInput').value;
    //this is how the output is made 
    // document.getElementById('summaryOutput').textContent = inputText;
      fetch('http://localhost:5000/extract-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
    }) 
    .then(response => response.json())
    .then(data => {
        document.getElementById('summaryOutput').textContent = data.output;
    })
    .catch(error => {
        console.error('Error:', error);
    });
  });
});


//`Keywords: ${data.keywords.join(', ')}`