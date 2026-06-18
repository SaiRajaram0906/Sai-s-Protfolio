'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/page.module.css';

const EXPERIENCE_AREAS = ['AI & ML', 'Full Stack Development', 'Database Design', 'UI/UX'];

const PROFILE_STATS = [
  { label: 'Projects Completed', value: 6, suffix: '+' },
  { label: 'Technologies', value: 26, suffix: '+' },
  { label: 'Internship', value: 1, suffix: '' },
];

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function ProfileStat({ stat, active, delay }) {
  const count = useCountUp(stat.value, active);
  return (
    <div className={styles.profileStat} style={{ transitionDelay: active ? `${delay}ms` : '0ms' }}>
      <div className={styles.profileStatValue}>
        {count}
        <span className={styles.statSuffix}>{stat.suffix}</span>
      </div>
      <div className={styles.profileStatLabel}>{stat.label}</div>
    </div>
  );
}

export default function ProfileCard() {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      ref={cardRef}
      className={`${styles.profileCard} ${visible ? styles.profileCardVisible : ''}`}
    >
      <div className={styles.profileAvatar} aria-hidden="true">
        <span>SR</span>
      </div>

      <h3 className={styles.profileName}>Sai Rajaram J</h3>

      <div className={styles.profileRoles}>
        <span className={styles.profileRolePill}>AI &amp; Data Science Student</span>
        <span className={styles.profileRolePill}>Full Stack Developer</span>
        <span className={styles.profileRolePill}>Machine Learning Enthusiast</span>
      </div>

      <p className={styles.profileBio}>
        Passionate about building AI-powered applications, machine learning solutions, and modern
        web experiences. Focused on solving real-world problems through technology and innovation.
      </p>

      <div className={styles.profileStatsRow}>
        {PROFILE_STATS.map((stat, i) => (
          <ProfileStat key={stat.label} stat={stat} active={visible} delay={i * 140} />
        ))}
      </div>

      <div className={styles.profileDivider} />

      <h4 className={styles.profileAreasHeading}>Experience Areas</h4>
      <ul className={styles.profileAreasList}>
        {EXPERIENCE_AREAS.map((area) => (
          <li key={area} className={styles.profileAreaItem}>
            <span className={styles.profileAreaDot} />
            {area}
          </li>
        ))}
      </ul>
    </aside>
  );
}
