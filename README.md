# 1980s Mars Dashboard

A retro, 1980s sci-fi themed dashboard that displays NASA Mars Rover data. The application uses NASA's Mars Rover API to show manifest details and a photo gallery for each rover. Built with React, TypeScript, Vite, and styled-components.

## Table of Contents

1. [Clone the Repository](#1-clone-the-repository)
2. [Installation](#2-installation)
3. [Environment Variables](#3-environment-variables)
4. [Running the App](#4-running-the-app)
5. [Running Tests](#5-running-tests)
6. [Project Structure](#6-project-structure)
7. [Contributing](#7-contributing)
8. [License](#8-license)

## 1. Clone the Repository

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd 1980s-mars-dashboard
   ```

## 2. Installation

1. **Install the dependencies:**

   ```bash
   yarn
   ```

## 3. Environment Variables

1. Create a `.env` file in the root of your project.
2. Add your NASA API key to the file:

   ```env
   VITE_NASA_API_KEY=your_actual_api_key_here
   ```

## 4. Running the App

1.  **Start the dev server:**

   ```bash
   yarn dev
   ```
Open http://localhost:5173 in your browser to view the dashboard.

2. **Build for production and preview:**

   ```bash
   yarn build
   yarn preview
   ```

## 5. Running Tests

1. **Run the tests:**

   ```bash
   yarn test
   ```

## 6. Project Structure

   ```bash
   1980s-mars-dashboard/
   ├── public/
   ├── src/
   │ ├── api/
   │ │ └── nasa.ts # NASA API fetching logic
   │ ├── components/
   │ │ └── RoverManifest.tsx # Component displaying rover details and photo gallery
   │ ├── hooks/
   │ │ ├── useRoverManifest.ts # Custom hook for fetching rover manifest data
   │ │ └── useRoverPhotos.ts # Custom hook for fetching rover photos
   │ ├── styles/
   │ │ └── theme.ts # Theme configuration for styled-components
   │ ├── App.tsx
   │ ├── main.tsx
   │ └── styled.d.ts # Type definitions for styled-components theme
   ├── .env # Environment variables (ignored by Git)
   ├── .gitignore
   ├── package.json
   ├── tsconfig.app.json
   └── vite.config.ts
   ```      

## 7. Contributing

1. **Fork the repository.**

2. **Create a feature branch:**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit your changes:**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push the branch:**

   ```bash
   git push origin feature/YourFeature

5. **Open pull request:**

## 8. License

This project is licensed under the MIT License.
