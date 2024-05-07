from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import pytextrank
import requests
from openai import OpenAI


Newsapi_key = ''
base_url = 'https://newsapi.org/v2/everything?'




app = Flask(__name__)
CORS(app)

nlp = spacy.load("en_core_web_sm")

@app.route('/extract-keywords', methods=['POST'])
def extract_keywords():
    nlp.add_pipe("textrank")
    data = request.json
    print(data)
    input_text = data['text']
    doc = nlp(input_text)
    keywords = []
    # keywords = [token.text for token in doc if token.pos_ == "NOUN"]
    for phrase in doc._.phrases[:4]:
        keywords.append(phrase.text)
    print(keywords)
    descriptions = extract_descriptions(keywords)
    # summarize description
    output = summarize_description(descriptions)

    return jsonify(output = output)



def extract_descriptions(keywords):
    query_params = {
    'q': f'{keywords[0]} AND {keywords[1]} AND {keywords[2]} AND {keywords[3]}', 
    'apiKey': Newsapi_key,
    'language': 'en',
    'sortBy': 'relevance'
    }
    response = requests.get(base_url, params=query_params)
    descriptions = []


    if response.status_code == 200:
        articles = response.json().get('articles')
        for article in articles:
            description = article.get('description')
            if description:
                descriptions.append(description)
    else:
        print("Failed to fetch articles")
    return descriptions



def summarize_description(descriptions):
    client = OpenAI(api_key="")
    gbt_model = "gpt-3.5-turbo"
    enclosed_prompt = str(descriptions) + ". Can you take the average of all summaries and give me a 3 sentence final summary?"
    response = client.chat.completions.create(
        model = gbt_model,
        max_tokens = 4000,
        messages = [{"role":"user", "content": enclosed_prompt},
        ])
    response_message = response.choices[0].message.content
    return str(response_message)


if __name__ == "__main__":
    app.run(debug=True)
