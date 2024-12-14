# Gemini Collaborator App

React-based collaboration interface for the Gemini AI agent in the Sophia project.

## Overview
This application serves as the collaborative interface for the Gemini AI agent within the Sophia project, focusing on context management and visual design leadership.

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Gemini API
- Recharts

## Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Google Gemini API key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/NesySystems/gemini-collaborator-app.git
```

2. Install dependencies:
```bash
cd gemini-collaborator-app
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Then edit .env with your Gemini API key.

4. Start the development server:
```bash
npm run dev
```

## Project Structure
```
/src
  /components
    /tasks       # Task management components
    /memory      # Memory logging interface
    /visualizations # Data visualization components
  /contexts     # React context providers
  /types        # TypeScript type definitions
  /utils        # Utility functions
```

## Features
- Task Management System
- Memory Logging Interface
- Gemini API Integration
- Real-time Visualizations

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
MIT License
