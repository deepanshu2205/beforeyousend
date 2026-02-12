import "./globals.css";
export const metadata = {
  title: "beforeyousend.ai",
  description: "Test your cold DM before you ruin your pipeline.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
