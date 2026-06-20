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
        className={styles.timelineWrap}
      >
        {EXPERIENCE_ITEMS.map((item, index) => (
          <div 
            key={item.role} 
            className={`${styles.timelineItem} ${visible ? styles.cardVisible : ''}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className={styles.timelineDotCol}>
              <div className={styles.timelineDot} />
              {index < EXPERIENCE_ITEMS.length - 1 && <div className={styles.timelineLine} />}
            </div>
            
            <div className={styles.timelineCard}>
              <div className={styles.timelineCardHeader}>
                <h3 className={styles.timelineRole}>{item.role}</h3>
                {item.period && <span className={styles.timelinePeriod}>{item.period}</span>}
              </div>
              <p className={styles.timelineOrg}>{item.org}</p>
              <ul className={styles.experienceBulletList}>
                {item.achievements.map((a) => (
                  <li key={a} className={styles.experienceBulletItem}>
                    <span className={styles.experienceBulletDot} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
