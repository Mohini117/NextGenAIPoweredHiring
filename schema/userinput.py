from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, computed_field
from typing import Literal, Annotated
from schema.processed_input import clean_text,remove_stopwords,lemmatize_text 

class UserInput(BaseModel):

    job_post: Annotated[str, Field(..., description='job post of user')]
    qualification: Annotated[str, Field(..., description='qualification of user')]
    expertise: Annotated[str, Field(..., description='area of intrest of user')]
      
    def get_preprocessed(self) -> dict:
        return {
            "Job Post": lemmatize_text(remove_stopwords(clean_text(self.job_post))),
            "Qualification": lemmatize_text(remove_stopwords(clean_text(self.qualification))),
            "Expertise/Area of Intrest": lemmatize_text(remove_stopwords(clean_text(self.expertise))),
        }
        