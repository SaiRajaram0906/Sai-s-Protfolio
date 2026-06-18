'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/page.module.css';

const STACK_GROUPS = [
  {
    title: 'Frontend',
    accent: 'orange',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Bootstrap'],
  },
  {
    title: 'Backend',
    accent: 'blue',
    skills: ['Node.js', 'Express.js'],
  },
  {
    title: 'Database',
    accent: 'green',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    title: 'AI & ML',
    accent: 'purple',
    skills: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy'],
  },
];

function SkillGroupCard({ group, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
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

  const accentClass = styles[`accent_${group.accent}`] || styles.accent_orange;

  return (
    <div
      ref={cardRef}
      className={`${styles.skillGroupCard} ${accentClass} ${visible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
    >
      <h3 className={styles.skillGroupTitle}>{group.title}</h3>
      <div className={styles.skillPillRow}>
        {group.skills.map((skill, i) => (
          <span
            key={skill}
            className={styles.skillPill}
            style={{ transitionDelay: visible ? `${index * 100 + i * 60}ms` : '0ms' }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <div className={styles.techStackSection}>
      <h3 className={styles.techStackHeading}>Tech Stack</h3>
      <div className={styles.techStackGrid}>
        {STACK_GROUPS.map((group, i) => (
          <SkillGroupCard key={group.title} group={group} index={i} />
        ))}
      </div>
    </div>
  );
}
