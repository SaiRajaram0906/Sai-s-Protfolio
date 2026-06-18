import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ backgroundColor: '#090909', colorScheme: 'dark' }}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Sai Rajaram J — Full-Stack Developer, Data Analyst & AI enthusiast. Building at the intersection of AI, cinematic design, and modern engineering." />
        <meta property="og:title" content="Sai Rajaram — Creative Technologist" />
        <meta property="og:description" content="Full-Stack Developer, Data Analyst & AI enthusiast. Explore my projects, tech stack, and experience." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/hero-bg-poster.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sai Rajaram — Creative Technologist" />
        <meta name="twitter:description" content="Full-Stack Developer, Data Analyst & AI enthusiast." />
        <meta name="twitter:image" content="/hero-bg-poster.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#090909' }}>{children}</body>
    </html>
  );
}
