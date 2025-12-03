# BMO Portfolio 🕹️

A retro-themed personal portfolio website inspired by BMO from *Adventure Time*. Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and a lot of nostalgia.

![BMO Portfolio Preview](public/me.png) 

## 🌟 Features

-   **Interactive BMO Interface**: Fully functional virtual D-Pad and buttons (A/B/Triangle) for navigation.
-   **"Wake Up" Mechanic**: Toggles between BMO's face (Screensaver/Sleep Mode) and the content screen.
-   **BMO Mixtape Player**: A functional audio player with a visual cassette tape animation.
    -   Controls: Play/Pause, Next Track, Previous Track.
    -   Playlist includes: "Island Song", "Adventure Time Intro", "Everything Stays", and "Remember You".
-   **Animated Critters**: CSS-animated Adventure Time characters (Bee, Butterfly, and the Worm) living in the background.
-   **Retro Styling**:
    -   Custom **VT323** pixel font.
    -   CRT Scanline effects.
    -   CSS-drawn BMO body and details.
-   **Responsive Design**: Works on desktop and mobile (buttons are touch-friendly).

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Modules/Global CSS for complex animations.
-   **Icons**: Inline SVGs (replaced FontAwesome for better performance).
-   **Fonts**: `next/font/google` (VT323).

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/bmo-portfolio.git
    cd bmo-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to play with BMO!

## 🎮 Controls

-   **Triangle Button (Blue)**: Toggle Menu / Wake Up / Sleep Mode.
-   **D-Pad (Up/Down/Left/Right)**: Navigate through pages (Home, Skills, Projects, Education, Contact, Mixtape).
-   **A Button (Green)**: Next Page.
-   **B Button (Red)**: Previous Page.

## 📁 Project Structure

-   `app/page.tsx`: The main game loop/component containing the BMO logic, state management, and content rendering.
-   `app/globals.css`: Contains the specific CSS for BMO's body, animations (critters, tape reel), and retro effects.
-   `public/`: Static assets (mp3 files, images, SVGs).

## 🎵 Audio Credits

-   *Island Song* (Adventure Time Outro)
-   *Adventure Time Intro*
-   *Everything Stays* (Marceline)
-   *Remember You* (Marceline & Ice King)

## 📄 License

This project is for educational and portfolio purposes. BMO and Adventure Time are properties of Cartoon Network.

---
*Made with ♥ by Kercson G. Didal*