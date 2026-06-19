'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/VideoIntro.module.css';
import CinematicLayer from './CinematicLayer';


export default function VideoIntro() {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showEnableSoundBtn, setShowEnableSoundBtn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let gsap, ctx;
    async function initGSAP() {
      const gsapModule = await import('gsap');
      gsap = gsapModule.default || gsapModule.gsap;
      const elements = contentRef.current?.querySelectorAll('[data-animate]');
      if (!elements) return;
      gsap.set(elements, { opacity: 0, y: 40 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 0.6 });
      tl.to(elements, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', stagger: 0.18 })
        .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6');
      setLoaded(true);
    }
    initGSAP().catch(console.error);
    return () => ctx?.revert();
  }, []);

  // Attempt to autoplay with sound enabled and handle browser policies
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;

    const unmuteOnInteraction = () => {
      if (v.muted) {
        v.muted = false;
        setIsMuted(false);
        setShowEnableSoundBtn(false);
      }
      document.removeEventListener('click', unmuteOnInteraction);
      document.removeEventListener('touchstart', unmuteOnInteraction);
    };

    v.play()
      .then(() => {
        // Success: browser allowed sound to autoplay
        setIsMuted(false);
        setShowEnableSoundBtn(false);
      })
      .catch((err) => {
        // Blocked: play muted, show minimal "Enable Sound" button
        console.log('Unmuted autoplay blocked, playing muted until interaction:', err.message);
        v.muted = true;
        setIsMuted(true);
        setShowEnableSoundBtn(true);
        v.play().catch(console.error);

        document.addEventListener('click', unmuteOnInteraction);
        document.addEventListener('touchstart', unmuteOnInteraction);
      });

    return () => {
      document.removeEventListener('click', unmuteOnInteraction);
      document.removeEventListener('touchstart', unmuteOnInteraction);
    };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted) {
      setShowEnableSoundBtn(false);
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
  };

  const scrollToNext = () => {
    const hero = heroRef.current;
    if (hero) window.scrollTo({ top: hero.offsetHeight, behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Ambient blurred background — static poster frame instead of a second
          decoded video stream, since the heavy blur erases motion detail anyway */}
      <div className={styles.bgVideoWrap}>
        <img
          className={styles.bgVideo}
          src="/hero-bg-poster.jpg"
          alt=""
          aria-hidden="true"
        />
      </div>

      {/* Ambient bokeh particle layer */}
      <CinematicLayer />

      {/* Cinematic overlays */}
      <div className={styles.gradientBase} />
      <div className={styles.gradientVignette} />
      <div className={styles.gradientBottom} />

      {/* Foreground talking-head video */}
      <div className={styles.fgVideoWrap}>
        <div className={styles.fgVideoInner}>
          <video ref={videoRef} className={styles.fgVideo} src="/hero.mp4" playsInline loop onEnded={() => setIsPlaying(false)} />
          <div className={styles.videoRim} />
        </div>
      </div>


      {/* Portfolio content */}
      <div ref={contentRef} className={styles.content}>

        <span data-animate className={styles.tagline}>
          Data Scientist &nbsp;·&nbsp; Web Developer
        </span>

        <div className={styles.nameBlock}>
          <h1 data-animate className={styles.firstName}>SAI RAJARAM</h1>
          <h1 data-animate className={styles.lastName}>J</h1>
        </div>

        <p data-animate className={styles.subtitle}>
          Turning raw data into meaningful insights —<br />
          and <em>passionate about crafting beautiful</em><br />
          digital experiences on the web.
        </p>

        <div data-animate className={styles.collegeBadge}>
          <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" style={{flexShrink:0}}>
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5 8.172V11a3 3 0 00.502 1.658l.002.003C6.37 14.1 8.04 15 10 15c1.96 0 3.63-.9 4.496-2.339l.002-.003A3 3 0 0015 11V8.172l2-1.087V11a1 1 0 002 0V7a1 1 0 00-.553-.894l-8-3.427zM7 9.086L10 10.5l3-1.414V11a1 1 0 01-.168.555C12.27 12.37 11.22 13 10 13c-1.22 0-2.27-.63-2.832-1.445A1 1 0 017 11V9.086z"/>
          </svg>
          Rajalakshmi Engineering College
        </div>

        <div data-animate className={styles.ctaRow}>
          <a href="#work" className={styles.ctaPrimary}>View Work</a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaResume}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="14"
              height="14"
              style={{ marginRight: '8px', flexShrink: 0 }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            View Resume
          </a>
          <a href="#contact" className={styles.ctaGhost}>Get in Touch</a>
        </div>

        <div data-animate className={styles.heroInfoGrid}>
          <div className={styles.heroInfoCard}>
            <span className={styles.heroInfoLabel}>Education</span>
            <p className={styles.heroInfoMain}>B.Tech Artificial Intelligence &amp; Data Science</p>
            <p className={styles.heroInfoSub}>
              Rajalakshmi Engineering College &nbsp;·&nbsp; <span className={styles.heroInfoMeta}>2024 – 2028</span>
            </p>
          </div>

          <div className={styles.heroInfoCard}>
            <span className={styles.heroInfoLabel}>Current Status</span>
            <ul className={styles.heroInfoList}>
              <li>AI &amp; DS Student</li>
              <li>Machine Learning Intern (Completed)</li>
              <li>Enactus Marketer</li>
              <li>Full Stack Developer</li>
            </ul>
          </div>

          <div className={styles.heroInfoCard}>
            <span className={styles.heroInfoLabel}>Languages</span>
            <ul className={styles.heroInfoList}>
              <li>English</li>
              <li>Tamil</li>
              <li>Telugu</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        <button className={styles.controlBtn} onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97V10.18l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Minimal Enable Sound button */}
      {showEnableSoundBtn && (
        <button
          className={styles.enableSoundBtn}
          onClick={(e) => {
            e.stopPropagation();
            const v = videoRef.current;
            if (v) {
              v.muted = false;
              setIsMuted(false);
              setShowEnableSoundBtn(false);
            }
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
          Enable Sound
        </button>
      )}



      {/* Scroll indicator */}
      <button ref={scrollIndicatorRef} className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll down">
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine}>
          <span className={styles.scrollPulse} />
        </span>
      </button>
    </section>
  );
}
