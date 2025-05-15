import React from "react";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    
  return (
    <html lang="en">
      <body className="antialiased bg-MainBg text-white">
        <div className="min-h-screen flex items-center justify-center bg-MainBg text-white antialiased">
          {children}
        </div>
      </body>
    </html>
  );
}
