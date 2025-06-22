# 🧠 NextGen Teacher Hiring AI System

An intelligent backend system built with **FastAPI** that uses a machine learning model to automate and enhance the hiring process for teachers. The system evaluates candidates based on qualifications and skills, trained on real-world data from top institutions like **MIT**, **Harvard**, **Stanford**, **IITs**, **NITs**, and Tier-3 colleges, and provides recommendations on whether to hire a candidate or not.

---

## 🚀 Features

- 🔍 **AI-Based Teacher Evaluation**
- 📊 Ranks candidates based on:
  - Educational background
  - Skills & certifications
  - Teaching experience
  - Institutional pedigree
- 🧠 Trained on real-world, manually collected data from various academic levels
- ⚡ Backend powered by **FastAPI**
- 🎯 Model achieves ~80% accuracy on limited dataset (600 rows)
- 📤 REST API endpoints for integration with frontend or third-party tools

---

## 🧰 Tech Stack

- 🐍 Python
- 🤖 Scikit-learn / XGBoost (or your ML model)
- ⚡ FastAPI
- 📄 Pydantic (for data validation)
- 🧪 Uvicorn (ASGI server)
- 🧪 SQLite / CSV-based dataset

---

## 🗃 Dataset Summary

- 📦 **Rows**: ~600
- 🎓 **Sources**: MIT, Stanford, Cambridge, IITs, NITs, Tier-3 colleges
- 📌 **Features**:
  - Degrees
  - Teaching experience
  - Research publications
  - Skillset
  - Pedagogical rating (manual)
  - Institute category

---

## 🔥 Model Performance

| Metric        | Value    |
|---------------|----------|
| Accuracy      | ~80%     |
| Dataset Size  | 600 rows |
| Limitation    | Limited data size due to manual collection |

---

## 📡 API Endpoints

### `POST /predict`
- **Description**: Predicts the hiring decision and rank of a teacher.
- **Payload**:
  ```json
  {
    "degree": "PhD",
    "experience": 5,
    "skills": ["Machine Learning", "Data Science"],
    "institute": "IIT Bombay",
    "publications": 3
  }
