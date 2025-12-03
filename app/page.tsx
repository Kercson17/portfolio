"use client";

import React, { useState, useRef, useEffect } from "react";

export default function Home() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFaceVisible, setIsFaceVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = [
    { title: "Island Song", src: "/Island_Song.mp3" },
    { title: "Adventure Time Intro", src: "/Adventure_Time_Intro.mp3" },
    { title: "Everything Stays", src: "/Everything_Stays.mp3" },
    { title: "Remember You", src: "/Remember_You.mp3" },
  ];

  const pages = [
    "p-home",
    "p-skills",
    "p-projects",
    "p-edu",
    "p-contact",
    "p-music",
  ];

  // Handle audio play/pause based on state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const playMusic = () => {
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true); // Auto-play next song
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true); // Auto-play prev song
  };

  const toggleMenu = () => {
    // If we are waking up (face is visible -> going to content)
    if (isFaceVisible) {
        // Automatically play music if not already playing
        if (!isPlaying) {
            playMusic();
        }
    }
    
    setIsFaceVisible(!isFaceVisible);
    
    if (!isFaceVisible) {
      // Going back to face
    } else {
      // Waking up
      setCurrentPageIndex(0);
    }
  };

  const changePage = (direction: number) => {
    if (isFaceVisible) {
      toggleMenu();
      return;
    }

    // If BMO is already awake, ensure music is playing if a navigation button is pressed
    if (!isPlaying) {
        playMusic();
    }

    let newIndex = currentPageIndex + direction;
    if (newIndex >= pages.length) newIndex = 0;
    if (newIndex < 0) newIndex = pages.length - 1;
    setCurrentPageIndex(newIndex);
  };

  // Render content based on index
  const renderContent = () => {
    switch (currentPageIndex) {
      case 0: // Home
        return (
          <div className="page-section active">
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <img 
                src="/me.png" 
                alt="Kercson" 
                style={{ 
                  width: "80px", 
                  height: "80px", 
                  borderRadius: "50%", 
                  objectFit: "cover", 
                  border: "2px solid var(--bmo-teal-dark)",
                  margin: "0 auto 5px auto",
                  display: "block"
                }} 
              />
              <h3>KERCSON G. DIDAL</h3>
              <small>LEVEL 21 | IT STUDENT</small>
            </div>
            <p style={{ fontSize: "1rem" }}>
              I am a 21-year-old IT student who loves learning new technologies.
              I always do my best in everything I do and make sure to finish
              tasks responsibly.
            </p>
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "0.9rem",
              }}
            >
              ▼ Use D-Pad to Navigate ▼
            </p>
          </div>
        );
      case 1: // Skills
        return (
          <div className="page-section active">
            <h2>TECH STACK</h2>
            <ul>
              <li>
                <strong>WEB:</strong> JS, TypeScript, React, Angular
              </li>
              <li>
                <strong>BACK:</strong> Node.js, Express.js
              </li>
              <li>
                <strong>DB:</strong> SQL, NoSQL, Relational Design
              </li>
              <li>
                <strong>TOOLS:</strong> Git, GitHub, Vercel
              </li>
              <li>
                <strong>LANGS:</strong> C, C++, C#, OOP
              </li>
            </ul>
          </div>
        );
      case 2: // Projects
        return (
          <div className="page-section active">
            <h2>PROJECTS</h2>
            <div style={{ marginBottom: "10px" }}>
              <strong>VOTING SYSTEM</strong>
              <br />
              <small style={{ color: "#444" }}>Secure Online Voting</small>
              <ul style={{ fontSize: "0.9rem", marginTop: "5px" }}>
                <li>React / Next.js</li>
                <li>PostgreSQL + Prisma</li>
              </ul>
            </div>
            <p style={{ fontSize: "0.8rem" }}>
              Academic project focusing on security and data integrity.
            </p>
          </div>
        );
      case 3: // Education
        return (
          <div className="page-section active">
            <h2>EDUCATION</h2>
            <div style={{ marginBottom: "10px" }}>
              <strong>Benedicto College</strong>
              <br />
              <small>2022-2026 | BS IT</small>
              <br />
              <span
                style={{
                  background: "#fff",
                  padding: "0 4px",
                  fontSize: "0.8rem",
                }}
              >
                Dean&apos;s Lister (2023)
              </span>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>University of Cebu - Lapu-Lapu & Mandaue</strong>
              <br />
              <small>2020-2022 | GAS</small>
            </div>
            <div>
              <strong>Junior High School</strong>
              <br />
              <small>Paknaan Mandaue City</small>
              <br />
              <small>2015-2020</small>
            </div>
          </div>
        );
      case 4: // Contact
        return (
          <div className="page-section active">
            <h2>CONTACT</h2>
            <div style={{ textAlign: "center" }}>
              <p>
                <i className="fas fa-phone"></i> 0921 963 9200
              </p>
              <p>
                <i className="fas fa-envelope"></i> kercsondidal@gmail.com
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> Mandaue, Cebu 6014
              </p>
              <br />
              <a
                href="mailto:kercsondidal@gmail.com"
                style={{
                  background: "var(--text-color)",
                  color: "#fff",
                  padding: "5px 10px",
                  textDecoration: "none",
                }}
              >
                SEND MAIL
              </a>
            </div>
          </div>
        );
      case 5: // Music
        return (
          <div className="page-section active">
            <h2>BMO MIXTAPE</h2>

            <div className={`tape-visual ${isPlaying ? 'playing' : ''}`}>
              <div className="tape-reel"></div>
              <div className="tape-window" style={{fontSize: '0.7rem'}}>
                 {/* Show current song index + 1 */}
                 TRACK {currentSongIndex + 1}
              </div>
              <div className="tape-reel"></div>
            </div>

            {/* Song Title Marquee */}
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                background: "rgba(0,0,0,0.05)",
                padding: "8px",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "15px"
              }}
            >
               <div style={{ 
                   whiteSpace: "nowrap", 
                   animation: isPlaying ? "marquee 8s linear infinite" : "none",
                   display: "inline-block",
                   fontWeight: "bold",
                   color: "#2f4f4f"
               }}>
                ♫ {playlist[currentSongIndex].title} ♫
              </div>
            </div>
            
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>

            {/* Player Controls */}
            <div className="player-controls-ui" style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                gap: "30px",
                padding: "10px",
                background: "rgba(255,255,255,0.3)",
                borderRadius: "10px"
            }}>
              {/* Previous Button */}
              <div onClick={prevSong} style={{ cursor: "pointer" }} title="Previous Track">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#333" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/>
                </svg>
              </div>

              {/* Play/Pause Button */}
              <div onClick={toggleMusic} style={{ cursor: "pointer" }} title={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? (
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="#333" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                  </svg>
                ) : (
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="#333" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                )}
              </div>

              {/* Next Button */}
              <div onClick={nextSong} style={{ cursor: "pointer" }} title="Next Track">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#333" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
              </div>
            </div>

            <p
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                marginTop: "15px",
                color: "#666",
              }}
            >
              {isPlaying ? "Now Playing..." : "Paused"}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} src={playlist[currentSongIndex].src} loop onEnded={nextSong} />

      {/* Critters */}
      <div className="at-bee">
        <div className="bee-wing left"></div>
        <div className="bee-wing right"></div>
      </div>

      <div className="at-butterfly">
        <div className="bf-wing left"></div>
        <div className="bf-wing right"></div>
      </div>

      <div className="at-worm">
        <div className="worm-face">
          <div className="worm-smile"></div>
        </div>
        <div className="worm-seg"></div>
        <div className="worm-seg"></div>
        <div className="worm-seg"></div>
      </div>

      <div className="side-label">BMO</div>

      <div className="bmo-body">
        {/* Screen */}
        <div className="screen-container">
          {/* BMO Face (Only on Home/Face Mode) */}
          <div
            className="bmo-face"
            style={{
              opacity: isFaceVisible ? 1 : 0,
              pointerEvents: "none", // Always none so we can click "through" effectively? Actually container handles clicks usually but here inputs are outside.
              display: isFaceVisible ? "flex" : "none", // Remove from flow to allow scroll in content
            }}
          >
            <div className="eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="mouth"></div>
            <div style={{ marginTop: "20px", fontSize: "1.2rem" }}>
              &quot;Who wants to play?" 
            </div>
            <div style={{ fontSize: "0.8rem", marginTop: "5px" }}>
              (Press Any Button)
            </div>
          </div>

          {/* Content Container */}
          <div
            className="content-scroll"
            style={{ display: isFaceVisible ? "none" : "block" }}
          >
            {renderContent()}
          </div>

          <div className="nav-hint">
            {isFaceVisible
              ? "SLEEP MODE"
              : `PAGE ${currentPageIndex + 1}/${pages.length}`}
          </div>
        </div>

        {/* Floppy Drive Slot */}
        <div className="floppy-slot"></div>

        {/* Controls */}
        <div className="controls-row">
          {/* D-Pad */}
          <div className="d-pad">
            {/* Visuals */}
            <div className="d-visual d-h d-pad-visual"></div>
            <div className="d-visual d-v d-pad-visual"></div>
            <div className="d-visual d-c d-pad-visual"></div>

            {/* Click Zones */}
            <div
              style={{
                position: "absolute",
                width: "30px",
                height: "30px",
                top: "0",
                left: "30px",
                cursor: "pointer",
                zIndex: 10,
              }}
              onClick={() => changePage(-1)}
            ></div>{" "}
            {/* Up */}
            <div
              style={{
                position: "absolute",
                width: "30px",
                height: "30px",
                bottom: "0",
                left: "30px",
                cursor: "pointer",
                zIndex: 10,
              }}
              onClick={() => changePage(1)}
            ></div>{" "}
            {/* Down */}
            <div
              style={{
                position: "absolute",
                width: "30px",
                height: "30px",
                top: "30px",
                left: "0",
                cursor: "pointer",
                zIndex: 10,
              }}
              onClick={() => changePage(-1)}
            ></div>{" "}
            {/* Left */}
            <div
              style={{
                position: "absolute",
                width: "30px",
                height: "30px",
                top: "30px",
                right: "0",
                cursor: "pointer",
                zIndex: 10,
              }}
              onClick={() => changePage(1)}
            ></div>{" "}
            {/* Right */}
          </div>

          {/* Shape Buttons */}
          <div className="shape-buttons">
            {/* Triangle */}
            <div className="btn btn-tri" onClick={toggleMenu}></div>
            {/* Green */}
            <div className="btn btn-green" onClick={() => changePage(1)}>
              A
            </div>
            {/* Red */}
            <div className="btn btn-red" onClick={() => changePage(-1)}>
              B
            </div>
          </div>
        </div>

        {/* Controller Ports */}
        <div className="ports">
          <div className="port"></div>
          <div className="port"></div>
        </div>
      </div>
    </>
  );
}