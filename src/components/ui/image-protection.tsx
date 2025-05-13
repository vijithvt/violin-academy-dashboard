
import React, { useState } from "react";

interface ImageProtectionProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ImageProtection: React.FC<ImageProtectionProps> = ({
  src,
  alt,
  className,
  style
}) => {
  const [rightClickEnabled, setRightClickEnabled] = useState(false);

  // Prevent context menu (right click)
  const handleContextMenu = (e: React.MouseEvent) => {
    if (!rightClickEnabled) {
      e.preventDefault();
    }
  };

  // Prevent drag
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Prevent keyboard shortcuts for saving images
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent Ctrl+S, Ctrl+U, Ctrl+Shift+S
    if ((e.ctrlKey && (e.key === 's' || e.key === 'u')) || 
        (e.ctrlKey && e.shiftKey && e.key === 's')) {
      e.preventDefault();
    }
  };

  return (
    <div 
      className="protected-image-container relative" 
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ WebkitTouchCallout: "none" }}
    >
      <div 
        className="absolute inset-0 z-10 pointer-events-none mix-blend-normal"
        style={{
          background: "transparent",
          userSelect: "none",
          WebkitUserSelect: "none"
        }}
      />
      <img
        src={src}
        alt={alt}
        className={`select-none ${className}`}
        style={{
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          ...style
        }}
        onDragStart={handleDragStart}
        loading="lazy"
      />
    </div>
  );
};
