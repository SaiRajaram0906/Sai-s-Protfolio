import VideoIntro from '../components/VideoIntro';
import ProjectDashboard from '../components/ProjectDashboard';
import ProfileCard from '../components/ProfileCard';
import TechStack from '../components/TechStack';
import Experience from '../components/Experience';
import HeroCards from '../components/HeroCards';
import ProfileHighlights from '../components/ProfileHighlights';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import styles from '../styles/page.module.css';

export const metadata = {
  title: 'Sai Rajaram — Creative Technologist',
  description: 'Full-Stack Developer & Creative Technologist',
};

export default function Home() {
  return (
    <main>
      <VideoIntro />

      {/* Projects section — two-column layout:
          Left: Projects header + description + Tech Stack
          Right: Profile Card with stats and experience areas */}
      <section id="work" className={styles.nextSection}>
        <div className={styles.workHeaderGrid}>
          <div className={styles.workHeaderLeft}>
            <p className={styles.sectionLabel}>Selected Work</p>
            <h2 className={styles.sectionTitle}>Projects & Experiments</h2>
            <p className={styles.sectionBody}>
              Building at the intersection of AI, cinematic design, and modern engineering.
            </p>
            {/* Tech Stack integrated into left column */}
            <TechStack />
          </div>

          <ProfileCard />
        </div>

        <ProjectDashboard />
      </section>

      <Experience />

      <HeroCards />

      <ProfileHighlights />

      <ContactSection />

      <Footer />
    </main>
  );
}
