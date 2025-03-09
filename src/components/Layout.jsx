import React from "react";

function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-8">
      {children}
    </div>
  );
}

export default Layout;
