import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv('backend_' +
                    'url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv('sentiment_analyzer_' +
                    'url', default="http://localhost:5050/")


# Add code for get requests to backend
def get_request(endpoint, **kwargs):
    params = "&".join([f"{key}={value}" for key, value in kwargs.items()])
    request_url = f"{backend_url}{endpoint}?{params}"
    print(f"GET from {request_url}")
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except requests.exceptions.RequestException as err:
        # If any error occurs
        print(f"Network exception occurred: {err}")


# Add code for retrieving sentiments
def analyze_review_sentiments(text):
    request_url = f"{sentiment_analyzer_url}analyze/{text}"
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except requests.exceptions.RequestException as err:
        print(f"Network exception occurred: {err}")


# Add code for posting review
def post_review(data_dict):
    request_url = f"{backend_url}/insert_review"
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
    except requests.exceptions.RequestException as err:
        print(f"Network exception occurred: {err}")
