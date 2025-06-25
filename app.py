from fastapi import FastAPI
from fastapi.responses import JSONResponse
from schema.userinput import UserInput  
import pandas as pd
from model.predict import predict_output, model, MODEL_VERSION

from fastapi.middleware.cors import CORSMiddleware

 
  

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    
# human readable       
@app.get('/')
def home():
    return {'message':'NextGen Teacher  Evaluation Prediction API'}

# machine readable
@app.get('/health')
def health_check():
    return {
        'status': 'OK',
        'version': MODEL_VERSION,
        'model_loaded': model is not None
    } 
@app.post('/predict')
def predict_premium(data: UserInput):
    preprocessed = data.get_preprocessed()
    input_df = pd.DataFrame([preprocessed])
    
    try: 
        prediction = predict_output(input_df) 
        
        return JSONResponse(status_code=200, content=prediction)

    
    except Exception as e:
        import traceback
        print("❌ Exception in /predict route:\n", traceback.format_exc())
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "details": str(e)})

# ...existing code...
  



