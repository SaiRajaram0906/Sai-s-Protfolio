'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/page.module.css';

const CERTIFICATIONS = [
  { title: 'Machine Learning Internship', org: 'Corizo' },
  { title: 'Data Analytics Job Simulation', org: 'Deloitte' },
];


const CORE_COMPETENCIES = [
  'Data Processing',
  'Machine Learning',
  'Website Development',
  'Database Design',
  'Problem Solving',
  'Team Collaboration',
];

function CertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="20" height="20">
      <circle cx="12" cy="8" r="5.5" />
      <path d="M8.5 13 7 21l5-2.5L17 21l-1.5-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AchievementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="18" height="18">
      <path d="M5 4h14v5a7 7 0 0 1-14 0V4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 6H3a3 3 0 0 0 3 3M19 6h2a3 3 0 0 1-3 3" strokeLinecap="round" />
      <path d="M12 16v4M9 21h6" strokeLinecap="round" />
    </svg>
  );
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export default function ProfileHighlights() {
  const [certRef, certVisible] = useReveal();
  const [achieveRef, achieveVisible] = useReveal();
  const [coreRef, coreVisible] = useReveal();
  const [projectCount, setProjectCount] = useState(6);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadStats = () => {
      try {
        const raw = window.localStorage.getItem('portfolioProjects') || window.localStorage.getItem('cinematicPortfolioProjects');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setProjectCount(parsed.length);
          }
        }
      } catch (error) {
        console.warn('Failed to load project count in ProfileHighlights:', error);
      }
    };

    loadStats();
    window.addEventListener('portfolio_projects_updated', loadStats);
    return () => {
      window.removeEventListener('portfolio_projects_updated', loadStats);
    };
  }, []);

  const achievements = [
    `Built ${projectCount}+ Projects`,
    'Full Stack Development',
    'Machine Learning Projects',
    'Database Automation Systems',
  ];

  return (
    <section className={styles.highlightsSection}>
      <div className={styles.highlightsGrid}>
        <div
          ref={certRef}
          className={`${styles.highlightCard} ${certVisible ? styles.cardVisible : ''}`}
        >
          <h3 className={styles.highlightCardTitle}>Certifications</h3>
          <div className={styles.certList}>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.title} className={styles.certItem}>
                <span className={styles.certIcon}>
                  <CertIcon />
                </span>
                <div>
                  <p className={styles.certTitle}>{cert.title}</p>
                  <p className={styles.certOrg}>{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={achieveRef}
          className={`${styles.highlightCard} ${achieveVisible ? styles.cardVisible : ''}`}
        >
          <h3 className={styles.highlightCardTitle}>Achievements</h3>
          <ul className={styles.achievementList}>
            {achievements.map((item) => (
              <li key={item}>
                <span className={styles.achievementIcon}>
                  <AchievementIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={coreRef}
          className={`${styles.highlightCard} ${coreVisible ? styles.cardVisible : ''}`}
        >
          <h3 className={styles.highlightCardTitle}>Core Competencies</h3>
          <div className={styles.competencyPills}>
            {CORE_COMPETENCIES.map((item) => (
              <span key={item} className={styles.competencyPill}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
