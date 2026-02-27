import React from "react";

export default function BlogLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Main Blog Content */}
      {children}

      {/* Modal Slot (Parallel Route) */}
      {modal}
    </div>
  );
}