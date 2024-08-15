# Medical QA Bot

## Overview

This project aims to develop a chatbot that answers user queries related to medicine. It processes a medical dataset of questions and answers, finding the most relevant response to a user's query using natural language processing techniques.

## Features

- **NLTK:** Used for text preprocessing, including stop word removal and stemming with `PorterStemmer`.
- **CSV:** The medical dataset is stored in a CSV file containing questions and corresponding answers.
- **TfidfVectorizer:** Converts questions into TF-IDF features for comparison.
- **Cosine Similarity:** Measures similarity between the user's query and the dataset to find the best match.
- **User Interface:** Created using **HTML**, **CSS**, and **JavaScript** for an interactive and responsive experience.
- **Flask:** Deploys the chatbot as a web service.

## Functionality

1. **Dataset Processing:**
   - The medical dataset is provided in a CSV file, consisting of questions and corresponding answers.
   - The data is processed to create a key-value dictionary where each question is a key, and the corresponding answer is the value.
   - The questions (keys) are preprocessed to remove stop words and are stemmed using NLTK's PorterStemmer.
   - The preprocessing is handled by the function preprocess_text(text).

2. **Query Handling:**
   - When a user submits a question, it is also preprocessed using preprocess_text(user_question) to ensure consistency with the dataset.
   - The preprocessed questions are then vectorized using TfidfVectorizer.
   - Cosine similarity is calculated between the user's question and all questions in the dataset to identify the closest match.
   - The program returns the answer associated with the closest matching question.
   - If the cosine similarity score is below 0.5, the chatbot informs the user that it doesn't have an answer to the question.
