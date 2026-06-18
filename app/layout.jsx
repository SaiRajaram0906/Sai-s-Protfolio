import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ backgroundColor: '#090909', colorScheme: 'dark' }}>
      <head>
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
