# Chor Police - The Card Game

_Chor Police_ is a digital remake of the classic childhood game, brought to life for the modern era! This full-stack project lets four players take on the roles of **Raja**, **Mantri**, **Sipahi**, and **Chor**, competing for points in each round. The Sipahi's job is to guess who among the players is the Chor—guess right or wrong, and the scores shift for everyone. Powered by real-time multiplayer support using **Socket.IO**, this game delivers a nostalgic blend of fun, strategy, and coding.

## Features

- **Multiplayer Gameplay**: Join with friends or random players online, each assigned a unique role every round.
- **Real-time Interaction**: Game state, moves, and chats are synchronized instantly using Socket.IO.
- **Score Tracking**: Points are awarded based on correct or incorrect guesses, keeping the game competitive.
- **Modern UI**: A clean, intuitive interface makes playing easy and enjoyable.
- **Nostalgic Experience**: Relive the excitement of the classic Chor Police game—no cards required!

## Game Rules

1. Four players join a room. Roles (Raja, Mantri, Sipahi, Chor) are assigned randomly each round.
2. The Sipahi must guess who is the Chor.
3. If the guess is correct, Sipahi and Mantri earn points; if wrong, Chor and Raja earn points.
4. Roles rotate in each round, and scores are updated accordingly.
5. The game continues for a set number of rounds or until a target score.

## Tech Stack

- **Frontend**: (React/HTML/CSS or your chosen framework)
- **Backend**: Node.js, Express
- **Real-time Communication**: [Socket.IO](https://socket.io/) for instant updates and multiplayer support

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/durgeshkr-5/Chor_Police_The_Card_Game.git
   cd Chor_Police_The_Card_Game
   ```
2. **Install dependencies for both frontend and backend:**
   ```bash
   npm install
   # If you have a client/ directory, cd client && npm install
   ```
3. **Run the server:**
   ```bash
   npm start
   ```
   _Or as per your project setup (see details below)._

4. **Open the app in your browser:**  
   Navigate to `http://localhost:3000` (or the port specified).

## Socket.IO Integration

- The game leverages Socket.IO to handle:
  - Room creation and joining
  - Role assignment and rotation
  - Turn-based actions and guesses
  - Real-time score updates
  - Chat and player notifications

## Folder Structure

- `/client` or `/frontend`: Contains the React (or other) UI code.
- `/server` or `/backend`: Contains Node.js/Express server code and Socket.IO logic.
- `/public` or `/assets`: Static assets and images.

## Contribution

Feel free to fork, improve, or add new features! Pull requests and feedback are always welcome.

## License

This project is licensed under the MIT License.

---

**Relive the classic Chor Police game with friends—now online and better than ever!**
