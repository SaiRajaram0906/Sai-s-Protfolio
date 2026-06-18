'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/page.module.css';

const HERO_CARDS = [
  {
    title: 'Education',
    items: [
      { label: 'AI & Data Science', bold: true },
      { label: 'Rajalakshmi Engineering College' },
      { label: '2024–2028', secondary: true },
    ],
  },
  {
    title: 'Current Status',
    items: [
      { label: 'AI Student', bold: true },
      { label: 'Machine Learning Intern' },
      { label: 'Enactus Marketer' },
      { label: 'Full Stack Developer' },
    ],
  },
  {
    title: 'Languages',
    items: [
      { label: 'English' },
      { label: 'Tamil' },
      { label: 'Telugu' },
    ],
  },
];

function HeroCard({ card, index }) {
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
    <div
      ref={cardRef}
      className={`${styles.heroCard} ${visible ? styles.heroCardVisible : ''}`}
      style={{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }}
    >
      <h3 className={styles.heroCardTitle}>{card.title}</h3>
      <div className={styles.heroCardContent}>
        {card.items.map((item, i) => (
          <div key={i} className={styles.heroCardItem}>
            <span
              className={`${styles.heroCardItemText} ${item.bold ? styles.heroCardItemBold : ''} ${
                item.secondary ? styles.heroCardItemSecondary : ''
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroCards() {
  return (
    <section className={styles.heroCardsSection}>
      <div className={styles.heroCardsGrid}>
        {HERO_CARDS.map((card, i) => (
          <HeroCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
