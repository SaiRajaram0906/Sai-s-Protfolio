import styles from '../styles/CinematicLayer.module.css';

/**
 * Ambient hero backdrop — replaces the previous Three.js bokeh-particle
 * layer with a static, near-zero-cost visual: a faint grid overlay plus a
 * slow-moving radial gradient wash. Premium-but-restrained, Apple-style.
 */
export default function CinematicLayer() {
  return (
    <div className={styles.ambientLayer} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.gradientWash} />
    </div>
  );
}
