'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/page.module.css';

const CONTACT_DETAILS = {
  email: 'sairajaram0906@gmail.com',
  github: 'https://github.com/SaiRajaram0906',
  githubDisplay: 'github.com/SaiRajaram0906',
  linkedin: 'https://linkedin.com/in/sairajaram',
  linkedinDisplay: 'linkedin.com/in/sairajaram',
  phone: '+91 9629049550',
  location: 'Tamil Nadu, India',
};

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
      <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.8.9.6 0 1 .5 1 1.1v3.4c0 .6-.5 1.1-1.1 1.1C10.6 21.5 2.5 13.4 2.5 3.9 2.5 3.3 3 2.8 3.6 2.8H7c.6 0 1.1.4 1.1 1 .1 1.3.4 2.6.9 3.8.1.3.1.7-.2 1l-2.2 2.2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
      <path d="M12 21s-7-6.4-7-11.5A7 7 0 0 1 19 9.5C19 14.6 12 21 12 21z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

function CopyIcon({ copied }) {
  if (copied) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
        <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" strokeLinecap="round" />
    </svg>
  );
}

function ContactCard({ icon, title, value, displayValue, href, copyValue, external }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — silently ignore, the link itself still works.
    }
  };

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={styles.contactCard}
    >
      <div className={styles.contactCardIcon}>{icon}</div>
      <div className={styles.contactCardBody}>
        <span className={styles.contactCardTitle}>{title}</span>
        <span className={styles.contactCardValue}>{displayValue || value}</span>
      </div>
      <button
        type="button"
        className={`${styles.contactCopyButton} ${copied ? styles.contactCopySuccess : ''}`}
        onClick={handleCopy}
        aria-label={`Copy ${title}`}
      >
        <CopyIcon copied={copied} />
        {copied ? 'Copied' : 'Copy'}
      </button>
    </a>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.contactSection} ${visible ? styles.contactSectionVisible : ''}`}
    >
      <p className={styles.sectionLabel}>Get in Touch</p>
      <h2 className={styles.sectionTitle}>Let&rsquo;s Build Something Amazing Together</h2>
      <p className={styles.sectionBody}>
        Have a project idea, collaboration opportunity, or just want to connect? Feel free to
        reach out.
      </p>

      <div className={styles.contactCardsGrid}>
        <ContactCard
          icon={<EmailIcon />}
          title="Email"
          value={CONTACT_DETAILS.email}
          copyValue={CONTACT_DETAILS.email}
          href={`mailto:${CONTACT_DETAILS.email}`}
        />
        <ContactCard
          icon={<GithubIcon />}
          title="GitHub"
          value={CONTACT_DETAILS.github}
          displayValue={CONTACT_DETAILS.githubDisplay}
          copyValue={CONTACT_DETAILS.github}
          href={CONTACT_DETAILS.github}
          external
        />
        <ContactCard
          icon={<LinkedinIcon />}
          title="LinkedIn"
          value={CONTACT_DETAILS.linkedin}
          displayValue={CONTACT_DETAILS.linkedinDisplay}
          copyValue={CONTACT_DETAILS.linkedin}
          href={CONTACT_DETAILS.linkedin}
          external
        />
        <ContactCard
          icon={<PhoneIcon />}
          title="Phone"
          value={CONTACT_DETAILS.phone}
          copyValue={CONTACT_DETAILS.phone}
          href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`}
        />
      </div>

      <div className={styles.contactLocationRow}>
        <LocationIcon />
        <span>{CONTACT_DETAILS.location}</span>
      </div>

      <div className={styles.contactActionsRow}>
        <a href={`mailto:${CONTACT_DETAILS.email}`} className={styles.contactPrimaryButton}>
          <EmailIcon />
          Send Email
        </a>
        <a
          href={CONTACT_DETAILS.github}
          target="_blank"
          rel="noreferrer"
          className={styles.contactSecondaryButton}
        >
          <GithubIcon />
          View GitHub
        </a>
        <a
          href={CONTACT_DETAILS.linkedin}
          target="_blank"
          rel="noreferrer"
          className={styles.contactSecondaryButton}
        >
          <LinkedinIcon />
          Connect on LinkedIn
        </a>
      </div>
    </section>
  );
}
