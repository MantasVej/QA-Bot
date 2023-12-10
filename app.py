from flask import Flask, render_template, request, jsonify
import csv
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Function to preprocess text
def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    ps = PorterStemmer()

    # Tokenize, remove stopwords, and apply stemming
    words = [ps.stem(word.lower()) for word in word_tokenize(text) if word.isalnum() and word.lower() not in stop_words]
    
    return ' '.join(words)

qa = {}

# Open the CSV file
with open('train.csv', 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)
    next(csv_reader)
    for row in csv_reader:
        question = row[1]
        answer = row[2]

        # Preprocess the question before adding to the dictionary
        qa[preprocess_text(question)] = answer

# Function to find the most similar question using cosine similarity
def get_most_similar_question(user_question, qa_dict):
    preprocessed_user_question = preprocess_text(user_question)

    vectorizer = TfidfVectorizer()
    question_vectors = vectorizer.fit_transform(list(qa_dict.keys()) + [preprocessed_user_question])

    similarity_scores = cosine_similarity(question_vectors[-1], question_vectors[:-1])[0]
    most_similar_index = similarity_scores.argmax()
    if (similarity_scores[most_similar_index] < 0.5):
        return None

    return list(qa_dict.keys())[most_similar_index]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/answer', methods=['POST'])
def answer():
    user_input = request.form['user_input']
    most_similar_question = get_most_similar_question(user_input, qa)
    answer_text = qa.get(most_similar_question)
    if(answer_text == None):
        answer_text = "Sorry, I don't know that. Please try again."
    return jsonify({'answer': answer_text})

if __name__ == '__main__':
    app.run(debug=True)
