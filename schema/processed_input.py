import re
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download required NLTK data
try:
    nltk.download('stopwords', quiet=True)
    nltk.download('wordnet', quiet=True)
    nltk.download('punkt', quiet=True)
except:
    pass

print("Libraries imported successfully!")

        
def clean_text(text):
    """Clean and normalize text"""
    if pd.isna(text):
        return ""
    text = str(text).lower()
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    text = re.sub(r'\s+', ' ', text)  # Remove extra whitespaces
    return text.strip()


def remove_stopwords(text):
    """Remove stopwords from text"""
    try:
        stop_words = set(stopwords.words('english'))
        return " ".join([word for word in text.split() if word not in stop_words])
    except:
        return text

def lemmatize_text(text):
    """Lemmatize text"""
    try:
        lemmatizer = WordNetLemmatizer()
        return " ".join([lemmatizer.lemmatize(word) for word in text.split()])
    except:
        return text

