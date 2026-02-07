# AI Voice Mental Health Assistant

A voice-enabled assistant designed to provide empathetic support, mental health resources, and simple CBT-style exercises. This repository contains a full-stack prototype (frontend + backend) that demonstrates conversational voice interactions, sentiment-aware responses, and resource linking for users seeking mental health support.

Owner: Sayak Pal

## About

This project aims to create an accessible voice-first mental health assistant that listens, reflects, and guides users to helpful resources. It is not a replacement for professional mental health care. If someone is in crisis, contact local emergency services or a crisis hotline.

## Features

- Voice input and output (microphone + text-to-speech)
- Sentiment and intent detection (basic sentiment analysis)
- Conversational, empathetic responses with grounding and breathing prompts
- Resource linking (hotlines, articles, nearby services)
- Modular frontend and backend for easy experimentation

## Tech Stack

- Backend: FastAPI + Uvicorn (Python)
- Frontend: Static HTML/CSS/JS (served locally)

## Quick Start (Windows)

From the repo root:

Backend:

```powershell
python -m venv .venv
.\.venv\Scripts\activate
pip install -r backend\requirements.txt
python backend\app.py
```

Frontend (static server):

```powershell
cd frontend
python -m http.server 5173
```

Open the app:

- http://localhost:5173
- Backend API: http://localhost:8000

## Usage Examples

- Start the app, allow microphone access, and say:
  - "I'm feeling anxious today." -> Assistant responds with empathetic reflection and a breathing exercise.
  - "I can't sleep." -> Assistant offers grounding techniques and links to sleep hygiene resources.
  - "I feel hopeless." -> Assistant provides supportive language and emergency resources if needed.

Example API call (backend):

```json
POST /api/session/start
Content-Type: application/json

{ "user_name": "Alex", "country": "US" }
```

## Project Structure

- backend/ - Python server, APIs, NLP modules
- frontend/ - UI client, voice capture, TTS
- CHECKPOINT_7_MANUAL_TESTING_GUIDE.md - Manual testing instructions
- CHECKPOINT_7_SUMMARY.md - Project summary and checkpoint notes
- setup.py - Installer/packaging helper

## Ethics and Safety

This project is experimental. It is not a medical device. Do not rely on it for urgent crisis situations. Include clear disclaimers in UI and docs.

## License

This project is licensed under the MIT License. See LICENSE for details.
