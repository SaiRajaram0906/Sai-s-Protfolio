// Seed data for the Projects & Experiments section.
// This only gets written to localStorage once, the first time a visitor
// loads the page on a given browser (or after they clear their saved data).

export const SEED_PROJECTS = [
  {
    id: 'seed-timetable',
    title: 'My Timetable – Smart Offline Schedule Organizer',
    shortDescription:
      'My Timetable is a responsive offline timetable management web application built using HTML, CSS, and JavaScript. It helps students easily view and organize their schedules.',
    description:
      'My Timetable is a responsive offline timetable management web application built using HTML, CSS, and JavaScript. It helps students easily view and organize their class schedules without requiring an internet connection. The app stores data locally and provides a clean, intuitive interface for managing weekly timetables.',
    category: 'Web Development',
    tools: ['HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Offline Support',
      'Responsive Design',
      'Local Storage',
      'Weekly View',
      'Easy Schedule Management',
    ],
    problem: 'Students needed a simple, offline-capable tool to manage their class schedules.',
    solution: 'A lightweight PWA-style web app that works without internet and stores schedules locally.',
    architecture:
      'A vanilla HTML/CSS/JavaScript frontend that leverages localStorage for persistent offline data storage with a responsive layout for mobile and desktop.',
    future: ['Export to PDF', 'Push notifications for classes', 'Dark mode toggle'],
    status: 'Completed',
    accent: 'orange',
    featured: false,
    demoLink: '',
    githubLink: '',
    imageBase64: '',
    images: [],
    createdAt: '2025-01-05T00:00:00.000Z',
  },
  {
    id: 'seed-fintel',
    title: 'FinIntel – Privacy-Preserving Fraud Intelligence Platform',
    shortDescription:
      'FinIntel is a real-time financial fraud detection and intelligence platform that monitors transactions, analyzes risk patterns, and identifies suspicious activities.',
    description:
      'FinIntel is a real-time financial fraud detection and intelligence platform that monitors transactions, analyzes risk patterns, and identifies suspicious activities. It combines modern frontend technologies with AI-powered analysis to provide comprehensive fraud intelligence while preserving user privacy.',
    category: 'FinTech / AI',
    tools: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js'],
    highlights: [
      'Real-Time Monitoring',
      'Risk Pattern Analysis',
      'Privacy-Preserving',
      'Fraud Detection',
      'Transaction Intelligence',
    ],
    problem: 'Financial institutions need real-time fraud detection without compromising user privacy.',
    solution: 'A privacy-preserving platform that uses AI to detect fraud patterns in real-time while keeping sensitive data secure.',
    architecture:
      'React/Vite frontend with Tailwind CSS for styling, backed by a Node.js/Express API that processes transactions and applies ML-based risk scoring.',
    future: ['Blockchain audit trail', 'Multi-institution federation', 'Advanced anomaly detection'],
    status: 'Completed',
    accent: 'blue',
    featured: true,
    demoLink: '',
    githubLink: '',
    imageBase64: '',
    images: [],
    createdAt: '2025-01-06T00:00:00.000Z',
  },
  {
    id: 'seed-parkease',
    title: 'ParkEase – AI Powered Smart Parking Platform',
    shortDescription:
      'AI-powered platform connecting drivers with available parking, including unused private spaces. Real-time discovery, booking, and navigation in one flow.',
    description:
      'ParkEase is an AI-powered smart parking platform that connects drivers with available parking spaces, including unused private residential parking. Users can discover nearby parking through real-time availability, map-based search, AI-powered recommendations, secure online booking, and navigation support. The platform helps reduce traffic congestion while enabling property owners to earn income by renting unused parking spaces.',
    category: 'Full Stack / AI',
    tools: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'Google Maps API',
      'Razorpay',
      'Firebase',
      'Socket.io',
    ],
    highlights: [
      'AI Recommendation',
      'Real-Time Availability',
      'Secure Booking',
      'Google Maps Navigation',
      'Razorpay Payments',
      'Parking Marketplace',
    ],
    problem: 'Drivers waste time searching for parking.',
    solution: 'AI-powered parking recommendation system with booking and navigation.',
    architecture:
      'React/Next.js frontend talks to a Node.js + Express API; PostgreSQL holds structured booking and user data while MongoDB stores flexible listing data. Firebase handles auth and Socket.io pushes real-time slot-availability updates to connected clients. Razorpay handles payment capture, and the Google Maps API powers search and turn-by-turn navigation.',
    future: ['IoT Sensors', 'Dynamic Pricing', 'Smart City Integration'],
    status: 'Featured Project',
    accent: 'orange',
    featured: true,
    demoLink: '',
    githubLink: '',
    imageBase64: '',
    images: [],
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-cardio',
    title: 'Cardiovascular Disease Prediction System',
    shortDescription:
      'Machine learning solution predicting cardiovascular disease risk using supervised learning. Covers preprocessing through model comparison.',
    description:
      'Developed a machine learning solution for predicting cardiovascular disease using multiple supervised learning algorithms. The project involved complete data preprocessing, feature engineering, model training, evaluation, and performance comparison.',
    category: 'Machine Learning',
    tools: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'Jupyter Notebook'],
    highlights: [
      'Data Cleaning & Preprocessing',
      'Feature Engineering',
      'Multiple ML Models',
      'Performance Comparison',
      'Accuracy Evaluation',
      'Visualization Dashboard',
    ],
    problem: 'Manually screening for cardiovascular risk factors is slow and inconsistent across patient datasets.',
    solution:
      'A supervised learning pipeline that cleans patient data, engineers relevant features, and compares multiple classification models to flag likely risk.',
    architecture:
      'A Python/Jupyter pipeline: pandas and NumPy handle preprocessing and feature engineering, Scikit-Learn trains and evaluates multiple classifiers side by side, and Matplotlib visualizes comparative performance.',
    future: ['Larger clinical datasets', 'Model deployment as an API', 'Explainability dashboards for clinicians'],
    status: 'Completed',
    accent: 'blue',
    featured: false,
    demoLink: '',
    githubLink: '',
    imageBase64: '',
    images: [],
    createdAt: '2025-01-02T00:00:00.000Z',
  },
  {
    id: 'seed-helpdesk',
    title: 'Smart Help Desk System',
    shortDescription:
      'Responsive help desk platform for student complaints and issue tracking. Improves visibility between students and administration.',
    description:
      'A responsive help desk platform developed for managing student complaints and issue tracking. The system allows users to submit requests, monitor status updates, and improve communication between students and administration.',
    category: 'Web Development',
    tools: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    highlights: [
      'Complaint Submission',
      'Issue Tracking',
      'Status Updates',
      'Responsive Dashboard',
      'Bootstrap UI',
    ],
    problem: 'Students lacked a clear channel to submit and track complaints with administration.',
    solution: 'A responsive web dashboard for submitting complaints and following their status end-to-end.',
    architecture:
      'A Bootstrap-based responsive frontend with vanilla JavaScript handling form submission, status updates, and dashboard interactivity.',
    future: ['Email/SMS notifications', 'Admin analytics dashboard', 'Role-based access control'],
    status: 'Completed',
    accent: 'purple',
    featured: false,
    demoLink: '',
    githubLink: '',
    imageBase64: '',
    images: [],
    createdAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'seed-library',
    title: 'Library Management System',
    shortDescription:
      'MySQL-based system automating library inventory with stored procedures and triggers. Reduces manual data-entry errors.',
    description:
      'Designed and implemented a MySQL-based Library Management System with stored procedures and triggers to automate inventory management and reduce manual errors.',
    category: 'Database Management',
    tools: ['MySQL', 'SQL', 'Stored Procedures', 'Triggers'],
    highlights: [
      'Book Management',
      'Inventory Tracking',
      'Stored Procedures',
      'Automated Triggers',
      'Database Optimization',
    ],
    problem: 'Manual library inventory tracking was error-prone and slow to update.',
    solution: 'A MySQL schema with stored procedures and triggers that automate inventory updates and enforce data integrity.',
    architecture:
      'A normalized MySQL schema with stored procedures encapsulating common operations (checkouts, returns) and triggers that automatically update inventory counts on each transaction.',
    future: ['Web-based admin interface', 'Barcode/RFID integration', 'Overdue-fine automation'],
    status: 'Completed',
    accent: 'green',
    featured: false,
    demoLink: '',
    githubLink: '',
    imageBase64: '',
    images: [],
    createdAt: '2025-01-04T00:00:00.000Z',
  },
];

export const SECTION_STATS = [
  { label: 'Projects Completed', value: 6, suffix: '+' },
  { label: 'Technologies Used', value: 20, suffix: '+' },
  { label: 'Domains', value: 4, suffix: '', detail: 'AI · ML · Full Stack · Database' },
];
