import "./globals.css";

export const metadata = {
  title: "SpareTime - Your availability, your way",
  description: "A social availability layer that helps you share when you're free while protecting your boundaries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Load Poppins font from Google Fonts CDN at runtime */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
