import React from 'react';

const ColorPreview = () => {
  const themes = [
    {
      name: "Deep Blue & Gold",
      description: "Trust & premium feel",
      primary: "#1E3A5F",
      accent: "#D4AF37",
      secondary: "#0F2340",
      background: "#F8F9FA",
      text: "#1E3A5F"
    },
    {
      name: "Forest Green & Cream",
      description: "Natural, eco-friendly vibe",
      primary: "#2D5A3D",
      accent: "#8FBC8F",
      secondary: "#1A3D2A",
      background: "#FFFEF5",
      text: "#2D5A3D"
    },
    {
      name: "Charcoal & Teal",
      description: "Modern tech aesthetic",
      primary: "#14B8A6",
      accent: "#5EEAD4",
      secondary: "#1F2937",
      background: "#F3F4F6",
      text: "#1F2937"
    },
    {
      name: "Burgundy & Beige",
      description: "Warm, professional tone",
      primary: "#8B2942",
      accent: "#C4926E",
      secondary: "#3D1F25",
      background: "#FAF6F3",
      text: "#3D1F25"
    },
    {
      name: "Slate Gray & Coral",
      description: "Contemporary, energetic",
      primary: "#FF6B6B",
      accent: "#FFA07A",
      secondary: "#3D4F5F",
      background: "#F5F7F9",
      text: "#3D4F5F"
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f0f0f', 
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        color: 'white', 
        textAlign: 'center', 
        fontSize: '32px', 
        marginBottom: '40px',
        fontWeight: 'bold'
      }}>
        Color Theme Options
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {themes.map((theme, index) => (
          <div 
            key={index}
            style={{
              backgroundColor: theme.background,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
          >
            {/* Header with secondary color */}
            <div style={{
              backgroundColor: theme.secondary,
              padding: '24px',
              color: 'white'
            }}>
              <h2 style={{ 
                margin: 0, 
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '4px'
              }}>
                {theme.name}
              </h2>
              <p style={{ 
                margin: 0, 
                opacity: 0.8,
                fontSize: '14px'
              }}>
                {theme.description}
              </p>
            </div>

            {/* Content preview */}
            <div style={{ padding: '24px' }}>
              {/* Mini hero preview */}
              <div style={{
                backgroundColor: theme.secondary,
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <p style={{ 
                  color: 'white', 
                  margin: '0 0 8px 0',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Construction Software
                </p>
                <h3 style={{ 
                  color: 'white', 
                  margin: '0 0 12px 0',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  BUILDING THE BEST
                </h3>
                <span style={{
                  color: theme.accent,
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  ESTIMATION SOFTWARE
                </span>
              </div>

              {/* Button preview */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <button style={{
                  backgroundColor: theme.primary,
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Primary Button
                </button>
                <button style={{
                  backgroundColor: 'transparent',
                  color: theme.text,
                  border: `2px solid ${theme.primary}`,
                  padding: '10px 20px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Secondary
                </button>
              </div>

              {/* Color swatches */}
              <div style={{ 
                display: 'flex', 
                gap: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: theme.primary,
                    borderRadius: '4px',
                    marginBottom: '4px'
                  }} />
                  <span style={{ fontSize: '10px', color: theme.text }}>Primary</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: theme.accent,
                    borderRadius: '4px',
                    marginBottom: '4px'
                  }} />
                  <span style={{ fontSize: '10px', color: theme.text }}>Accent</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: theme.secondary,
                    borderRadius: '4px',
                    marginBottom: '4px'
                  }} />
                  <span style={{ fontSize: '10px', color: theme.text }}>Secondary</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: theme.background,
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    marginBottom: '4px'
                  }} />
                  <span style={{ fontSize: '10px', color: theme.text }}>BG</span>
                </div>
              </div>

              {/* Sample card */}
              <div style={{
                border: `1px solid ${theme.primary}20`,
                padding: '16px',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <p style={{ 
                      margin: 0, 
                      fontWeight: '600',
                      color: theme.text,
                      fontSize: '14px'
                    }}>
                      Sample Project
                    </p>
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      color: '#666',
                      fontSize: '12px'
                    }}>
                      Commercial Building
                    </p>
                  </div>
                  <span style={{
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary,
                    padding: '4px 8px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    $125,000
                  </span>
                </div>
              </div>
            </div>

            {/* Theme number */}
            <div style={{
              backgroundColor: theme.primary,
              color: 'white',
              padding: '12px 24px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              Option {index + 1}
            </div>
          </div>
        ))}
      </div>

      <p style={{ 
        color: '#888', 
        textAlign: 'center', 
        marginTop: '40px',
        fontSize: '14px'
      }}>
        Tell me which number (1-5) you prefer, or describe your custom colors!
      </p>
    </div>
  );
};

export default ColorPreview;
