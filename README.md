AI Resume Analyzer
Upload your resume, paste a job description, and get an instant AI-powered match score with strengths, missing skills, and tips to improve.

✨ Features
🔐 User authentication with JWT (register and login)
📤 PDF resume upload with automatic text extraction
🤖 AI analysis that compares your resume with any job description
🕘 History page to revisit all past analyses
🆓 Free to run: works with local open-source models through Ollama
🔌 Provider-flexible: any OpenAI-compatible API works (Ollama, Groq, OpenRouter, OpenAI)

🛠️ Tech Stack
Frontend	React (Vite), React Router, Axios
Backend	Node.js, Express
Database	MongoDB (local or Atlas), Mongoose
Auth	JWT, bcryptjs
File handling	Multer, pdf-parse
AI	Ollama (Llama 3.1) via the OpenAI SDK

✅ Prerequisites
Node.js v18 or higher (LTS recommended)
MongoDB running locally, or a free MongoDB Atlas cluster
Ollama for the free local AI model (or an API key from any OpenAI-compatible provider)



