'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/page.module.css';

export const EXPERIENCE_ITEMS = [
  {
    role: 'Machine Learning Intern',
    org: 'Corizo',
    period: '2025 – 2026',
    achievements: [
      'Data Collection',
      'Data Cleaning',
      'Feature Engineering',
      'Supervised Learning Models',
      'Model Evaluation',
    ],
  },
  {
    role: 'Enactus Marketer',
    org: 'Rajalakshmi Engineering College',
    period: '',
    achievements: [
      'Communication Skills',
      'Marketing Activities',
      'Team Collaboration',
      'Social Impact Projects',
    ],
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
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

  return (
    <section id="experience" className={styles.experienceSection}>
      <p className={styles.sectionLabel}>Experience</p>
      <h2 className={styles.sectionTitle}>Where I&rsquo;ve Worked</h2>

      <div
        ref={containerRef}
        className={`${styles.experienceContainer} ${visible ? styles.containerVisible : ''}`}
      >
        {EXPERIENCE_ITEMS.map((item) => (
          <div key={item.role} className={styles.experienceColumn}>
            <div className={styles.experienceHeader}>
              <h3 className={styles.experienceRole}>{item.role}</h3>
              {item.period && <span className={styles.experiencePeriod}>{item.period}</span>}
            </div>
            <p className={styles.experienceOrg}>{item.org}</p>
            <ul className={styles.experienceBulletList}>
              {item.achievements.map((a) => (
                <li key={a} className={styles.experienceBulletItem}>
                  <span className={styles.experienceBulletDot} />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
