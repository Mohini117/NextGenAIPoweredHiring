from  custom_func import select_expertise_column
import pickle
# import the ml model
with open('model/model_2.pkl', 'rb') as f:
    model = pickle.load(f)

# MLFlow
MODEL_VERSION = '1.0.0'

# Get class labels from model (important for matching probabilities to class names)
# class_labels = model.classes_.tolist()

def predict_output(user_input):
        
     
    prediction = model.predict(user_input)[0]

    return {
        "predicted_category": int(prediction) 
    }  