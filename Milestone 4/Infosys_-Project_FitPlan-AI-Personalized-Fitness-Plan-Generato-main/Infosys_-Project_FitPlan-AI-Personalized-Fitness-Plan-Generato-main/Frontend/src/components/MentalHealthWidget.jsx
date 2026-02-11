import React, { useState } from 'react';

const MentalHealthWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="mh-widget-container"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Iframe Wrapper */}
      <div
        style={{
          width: '380px',
          height: '600px',
          maxHeight: '80vh',
          background: 'transparent',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          marginBottom: '15px',
          display: isOpen ? 'block' : 'none',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transformOrigin: 'bottom right',
          transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
          pointerEvents: isOpen ? 'all' : 'none',
        }}
      >
        <iframe
          src="/ai-assistant/widget.html"
          title="MindVoice Assistant"
          width="100%"
          height="100%"
          style={{ border: 'none', background: 'transparent' }}
          allow="microphone; camera; autoplay"
        />
      </div>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0F766E 0%, #2DD4BF 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(15, 118, 110, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Toggle MindVoice Assistant"
      >
        {isOpen ? (
          // Close Icon
          <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          // Chat Icon
          <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default MentalHealthWidget;
