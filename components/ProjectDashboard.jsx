'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../styles/page.module.css';
import { SEED_PROJECTS, SECTION_STATS } from './projectSeedData';

const STORAGE_KEY = 'portfolioProjects';
const LEGACY_STORAGE_KEY = 'cinematicPortfolioProjects';
const SEED_FLAG_KEY = 'portfolioProjectsSeeded';

const initialFormValues = {
  title: '',
  description: '',
  shortDescription: '',
  tools: [],
  toolInput: '',
  category: 'AI',
  status: 'Completed',
  accent: 'orange',
  imageBase64: '',
  imageName: '',
  demoLink: '',
  githubLink: '',
  featured: false,
};

function buildProject(values, existingId) {
  return {
    id: existingId ?? Date.now().toString(),
    title: values.title.trim(),
    description: values.description.trim(),
    shortDescription: (values.shortDescription || values.description).trim().slice(0, 220),
    tools: values.tools,
    category: values.category,
    status: values.status || 'Completed',
    accent: values.accent || 'orange',
    imageBase64: values.imageBase64,
    demoLink: values.demoLink.trim(),
    githubLink: values.githubLink.trim(),
    featured: values.featured,
    createdAt: existingId ? values.createdAt || new Date().toISOString() : new Date().toISOString(),
  };
}

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

function StatCard({ stat, active, delay }) {
  const count = useCountUp(stat.value, active);
  return (
    <div
      className={styles.statCard}
      style={{ transitionDelay: active ? `${delay}ms` : '0ms' }}
      data-visible={active}
    >
      <div className={styles.statValue}>
        {count}
        <span className={styles.statSuffix}>{stat.suffix}</span>
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
      {stat.detail && <div className={styles.statDetail}>{stat.detail}</div>}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonLine} style={{ width: '70%' }} />
        <div className={styles.skeletonLine} style={{ width: '40%' }} />
        <div className={styles.skeletonLine} style={{ width: '100%' }} />
        <div className={styles.skeletonLine} style={{ width: '90%' }} />
        <div className={styles.skeletonPills}>
          <span className={styles.skeletonPill} />
          <span className={styles.skeletonPill} />
          <span className={styles.skeletonPill} />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onEdit, onDelete, onShowMore }) {
  const cardRef = useRef(null);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCardVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const accentClass = styles[`accent_${project.accent || 'orange'}`] || styles.accent_orange;
  const shortDesc = project.shortDescription || project.description;

  return (
    <article
      ref={cardRef}
      className={`${styles.projectCard} ${accentClass} ${cardVisible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: cardVisible ? `${Math.min(index, 8) * 90}ms` : '0ms' }}
    >
      {project.imageBase64 || project.image ? (
        <img
          className={styles.projectCardImage}
          src={project.imageBase64 || project.image}
          alt={project.title}
        />
      ) : (
        <div className={styles.projectCardPlaceholder}>
          <span>{project.category}</span>
        </div>
      )}

      {project.featured && <div className={styles.featuredBadge}>★ Featured</div>}

      <div className={styles.projectCardContent}>
        <div className={styles.projectCardHeader}>
          <h3 className={styles.projectCardTitle}>{project.title}</h3>
          <span className={styles.categoryBadge}>{project.category}</span>
        </div>

        {project.status && (
          <span className={`${styles.statusBadge} ${
            project.status.toLowerCase().includes('progress')
              ? styles.statusInProgress
              : styles.statusCompleted
          }`}>
            {project.status}
          </span>
        )}

        <p className={styles.projectCardDescShort}>{shortDesc}</p>

        <div className={styles.toolPills}>
          {project.tools.slice(0, 5).map((tool) => (
            <span key={tool} className={styles.toolPill}>
              {tool}
            </span>
          ))}
          {project.tools.length > 5 && (
            <span className={styles.toolPill}>+{project.tools.length - 5}</span>
          )}
        </div>

        <div className={styles.projectCardActions}>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.primaryButton}`}
            onClick={() => onShowMore(project)}
          >
            Show More
          </button>
          <a
            href={project.githubLink || '#'}
            target="_blank"
            rel="noreferrer"
            className={`${styles.actionButton} ${styles.secondaryButton} ${!project.githubLink ? styles.disabledButton : ''}`}
            aria-disabled={!project.githubLink}
          >
            GitHub
          </a>
          <a
            href={project.demoLink || '#'}
            target="_blank"
            rel="noreferrer"
            className={`${styles.actionButton} ${styles.secondaryButton} ${!project.demoLink ? styles.disabledButton : ''}`}
            aria-disabled={!project.demoLink}
          >
            Demo
          </a>
        </div>

        <div className={styles.projectCardMetaActions}>
          <button type="button" className={styles.metaActionButton} onClick={() => onEdit(project)}>
            Edit
          </button>
          <button type="button" className={styles.metaActionButton} onClick={() => onDelete(project)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectDetailModal({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const images = (project.images && project.images.length > 0
    ? project.images
    : project.imageBase64 || project.image
      ? [project.imageBase64 || project.image]
      : []);

  return (
    <div
      className={styles.projectModalOverlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div ref={modalRef} className={styles.projectModalContent} role="dialog" aria-modal="true">
        <button type="button" className={styles.projectModalCloseButton} onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className={styles.projectModalHeader}>
          <span className={styles.categoryBadge}>{project.category}</span>
          <h2 className={styles.projectModalTitle}>{project.title}</h2>
          {project.status && (
            <span
              className={`${styles.statusBadge} ${
                project.status.toLowerCase().includes('progress')
                  ? styles.statusInProgress
                  : styles.statusCompleted
              }`}
            >
              {project.status}
            </span>
          )}
        </div>

        {images.length > 0 && (
          <div className={styles.projectModalImages}>
            {images.map((src, i) => (
              <img key={i} src={src} alt={`${project.title} screenshot ${i + 1}`} />
            ))}
          </div>
        )}

        <section className={styles.projectModalSection}>
          <h3 className={styles.detailSubheading}>Project Overview</h3>
          <p className={styles.projectModalText}>{project.description}</p>
        </section>

        {project.problem && (
          <section className={styles.projectModalSection}>
            <h3 className={styles.detailSubheading}>Problem Statement</h3>
            <p className={styles.projectModalText}>{project.problem}</p>
            {project.solution && (
              <p className={styles.projectModalText} style={{ marginTop: 10 }}>
                <strong className={styles.projectModalStrong}>Solution: </strong>
                {project.solution}
              </p>
            )}
          </section>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <section className={styles.projectModalSection}>
            <h3 className={styles.detailSubheading}>Features</h3>
            <ul className={styles.featureList}>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.projectModalSection}>
          <h3 className={styles.detailSubheading}>Tech Stack</h3>
          <div className={styles.toolPills}>
            {project.tools.map((tool) => (
              <span key={tool} className={styles.toolPill}>
                {tool}
              </span>
            ))}
          </div>
        </section>

        {project.architecture && (
          <section className={styles.projectModalSection}>
            <h3 className={styles.detailSubheading}>Architecture</h3>
            <p className={styles.projectModalText}>{project.architecture}</p>
          </section>
        )}

        {project.challenges && (
          <section className={styles.projectModalSection}>
            <h3 className={styles.detailSubheading}>Challenges</h3>
            <p className={styles.projectModalText}>{project.challenges}</p>
          </section>
        )}

        {project.future && project.future.length > 0 && (
          <section className={styles.projectModalSection}>
            <h3 className={styles.detailSubheading}>Future Enhancements</h3>
            <ul className={styles.featureList}>
              {project.future.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <div className={styles.modalActions}>
          <a
            href={project.githubLink || '#'}
            target="_blank"
            rel="noreferrer"
            className={`${styles.actionButton} ${styles.secondaryButton} ${!project.githubLink ? styles.disabledButton : ''}`}
            aria-disabled={!project.githubLink}
          >
            GitHub
          </a>
          <a
            href={project.demoLink || '#'}
            target="_blank"
            rel="noreferrer"
            className={`${styles.actionButton} ${styles.primaryButton} ${!project.demoLink ? styles.disabledButton : ''}`}
            aria-disabled={!project.demoLink}
          >
            Demo
          </a>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDashboard() {
  const actionCardRef = useRef(null);
  const statsRef = useRef(null);
  const titleInputRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsProject, setDetailsProject] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [editId, setEditId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  // Load (and seed) projects on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_STORAGE_KEY);
      const alreadySeeded = window.localStorage.getItem(SEED_FLAG_KEY);
      let parsed = raw ? JSON.parse(raw) : [];

      if (!Array.isArray(parsed)) parsed = [];

      if (parsed.length === 0 && !alreadySeeded) {
        parsed = SEED_PROJECTS;
        window.localStorage.setItem(SEED_FLAG_KEY, 'true');
      }

      setProjects(parsed);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch (error) {
      console.warn('Failed to load saved projects:', error);
      setProjects(SEED_PROJECTS);
    } finally {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const card = actionCardRef.current;
    if (!card || typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = statsRef.current;
    if (!node || typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const saveProjects = (projectsToSave) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsToSave));
  };

  useEffect(() => {
    if (typeof window === 'undefined' || isLoading) return;
    saveProjects(projects);
  }, [projects, isLoading]);

  // Lock body scroll whenever any modal (add/edit or detail) is open.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = document.body;
    if (modalOpen || detailsProject) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }
    return () => body.classList.remove('modal-open');
  }, [modalOpen, detailsProject]);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (titleInputRef.current) titleInputRef.current.focus();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const openModal = (project = null) => {
    if (project) {
      setEditId(project.id);
      setFormValues({
        ...initialFormValues,
        ...project,
        toolInput: '',
        imageBase64: project.imageBase64 || project.image || '',
      });
    } else {
      setEditId(null);
      setFormValues(initialFormValues);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setFormValues(initialFormValues);
  };

  const updateField = (name, value) => {
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    updateField(name, type === 'checkbox' ? checked : value);
  };

  const addTool = () => {
    const tool = formValues.toolInput.trim();
    if (!tool || formValues.tools.includes(tool)) return;
    updateField('tools', [...formValues.tools, tool]);
    updateField('toolInput', '');
  };

  const removeTool = (tool) => {
    updateField('tools', formValues.tools.filter((item) => item !== tool));
  };

  const handleToolKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTool();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateField('imageBase64', reader.result || '');
      updateField('imageName', file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProject = () => {
    if (!formValues.title.trim()) return;
    const project = buildProject(formValues, editId);
    setProjects((current) => {
      if (editId) {
        return current.map((item) => (item.id === editId ? { ...item, ...project } : item));
      }
      return [project, ...current];
    });
    closeModal();
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) closeModal();
  };

  const handleDeleteProject = (project) => {
    const confirmed = window.confirm('Delete this project permanently? This cannot be undone.');
    if (!confirmed) return;
    setProjects((current) => current.filter((item) => item.id !== project.id));
  };

  const projectCount = projects.length;
  const techCount = useMemo(() => {
    const all = new Set();
    projects.forEach((p) => (p.tools || []).forEach((t) => all.add(t)));
    return all.size;
  }, [projects]);

  const liveStats = useMemo(
    () => [
      { label: 'Projects Completed', value: projectCount, suffix: '+' },
      { label: 'Technologies Used', value: techCount, suffix: '+' },
      SECTION_STATS[2],
    ],
    [projectCount, techCount]
  );

  return (
    <div className={styles.projectDashboardSection}>
      <div ref={statsRef} className={styles.statsRow}>
        {liveStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} active={statsVisible} delay={i * 140} />
        ))}
      </div>

      <div
        ref={actionCardRef}
        className={`${styles.projectActionCard} ${visible ? styles.visible : ''}`}
      >
        <div className={styles.projectActionCardTop}>
          <div className={styles.projectIcon}>+</div>
          <div className={styles.projectActionTextWrapper}>
            <h3 className={styles.projectActionTitle}>Add New Project</h3>
            <p className={styles.projectActionDescription}>
              Create and showcase a new project in your portfolio.
            </p>
          </div>
        </div>

        <div className={styles.projectActionButtons}>
          <button type="button" className={styles.primaryButton} onClick={() => openModal()}>
            Add Project
          </button>
          <button type="button" className={styles.secondaryButton}>
            Import Project
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.projectGrid}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : projects.length === 0 ? (
        <div className={styles.emptyProjectsNotice}>
          No projects added yet. Use the button above to create your first premium portfolio piece.
        </div>
      ) : (
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onEdit={openModal}
              onDelete={handleDeleteProject}
              onShowMore={setDetailsProject}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <div>
                <h2>{editId ? 'Edit Project' : 'Create New Project'}</h2>
                <p>Build a premium portfolio entry with an image, tags, category, and links.</p>
              </div>
              <button type="button" className={styles.modalCloseButton} onClick={closeModal}>
                ×
              </button>
            </div>

            <form className={styles.projectForm} onSubmit={(event) => event.preventDefault()}>
              <div className={styles.formGrid}>
                <label className={styles.formField}>
                  <span>Project Title</span>
                  <input
                    ref={titleInputRef}
                    name="title"
                    type="text"
                    value={formValues.title}
                    onChange={handleInputChange}
                    placeholder="Enter project title"
                  />
                </label>

                <label className={styles.formField}>
                  <span>Project Demo Link</span>
                  <input
                    name="demoLink"
                    type="url"
                    value={formValues.demoLink}
                    onChange={handleInputChange}
                    placeholder="https://"
                  />
                </label>
              </div>

              <label className={styles.formField}>
                <span>Short Description (shown on card, ~3 lines)</span>
                <textarea
                  name="shortDescription"
                  rows={3}
                  value={formValues.shortDescription}
                  onChange={handleInputChange}
                  placeholder="A brief 2-3 line summary for the card"
                />
              </label>

              <label className={styles.formField}>
                <span>Full Description (shown in modal)</span>
                <textarea
                  name="description"
                  rows={5}
                  value={formValues.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project in full"
                />
              </label>

              <div className={styles.formGrid}>
                <label className={styles.formField}>
                  <span>Tools & Technologies</span>
                  <div className={styles.tagInputWrapper}>
                    <input
                      name="toolInput"
                      type="text"
                      value={formValues.toolInput}
                      onChange={handleInputChange}
                      onKeyDown={handleToolKeyDown}
                      placeholder="React, Next.js, OpenAI API"
                    />
                    <button type="button" className={styles.tagAddButton} onClick={addTool}>
                      Add
                    </button>
                  </div>
                  <div className={styles.tagPills}>
                    {formValues.tools.map((tool) => (
                      <span key={tool} className={styles.tagPill}>
                        {tool}
                        <button
                          type="button"
                          className={styles.tagRemoveButton}
                          onClick={() => removeTool(tool)}
                          aria-label={`Remove ${tool}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </label>

                <label className={styles.formField}>
                  <span>Project Category</span>
                  <select name="category" value={formValues.category} onChange={handleInputChange}>
                    <option>AI</option>
                    <option>Full Stack / AI</option>
                    <option>Web Development</option>
                    <option>Machine Learning</option>
                    <option>Database Management</option>
                    <option>Automation</option>
                    <option>Research</option>
                    <option>Design</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <div className={styles.formGrid}>
                <label className={styles.formField}>
                  <span>Status</span>
                  <select name="status" value={formValues.status} onChange={handleInputChange}>
                    <option>Completed</option>
                    <option>In Progress</option>
                    <option>Featured Project</option>
                  </select>
                </label>

                <label className={styles.formField}>
                  <span>Card Accent</span>
                  <select name="accent" value={formValues.accent} onChange={handleInputChange}>
                    <option value="orange">Orange Gradient</option>
                    <option value="blue">Blue Gradient</option>
                    <option value="purple">Purple Gradient</option>
                    <option value="green">Green Gradient</option>
                  </select>
                </label>
              </div>

              <div className={styles.formGrid}>
                <label className={styles.formField}>
                  <span>Project Image</span>
                  <input name="projectImage" type="file" accept="image/*" onChange={handleImageUpload} />
                  {formValues.imageBase64 && (
                    <div className={styles.imagePreview}>
                      <img
                        className={styles.previewImg}
                        src={formValues.imageBase64}
                        alt={formValues.imageName || 'Project preview'}
                      />
                    </div>
                  )}
                </label>

                <label className={styles.formField}>
                  <span>GitHub Link</span>
                  <input
                    name="githubLink"
                    type="url"
                    value={formValues.githubLink}
                    onChange={handleInputChange}
                    placeholder="https://github.com/"
                  />
                </label>
              </div>

              <label className={styles.checkboxRow}>
                <input
                  name="featured"
                  type="checkbox"
                  checked={formValues.featured}
                  onChange={handleInputChange}
                />
                <span>Featured Project</span>
              </label>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className={styles.saveButton} onClick={handleSaveProject}>
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {detailsProject && (
        <ProjectDetailModal project={detailsProject} onClose={() => setDetailsProject(null)} />
      )}
    </div>
  );
}
