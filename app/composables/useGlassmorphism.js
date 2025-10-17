export default function useGlassmorphism() {
  const getGlassStyle = (color, variant = 'container') => {
    const variants = {
      container: {
        yellow: {
          background: 'rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
        },
        pink: {
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.4)'
        },
        blue: {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
        }
      },
      
      card: {
        yellow: {
          background: 'rgba(0, 0, 0, 0.18)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.4)'
        },
        pink: {
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.4)'
        },
        blue: {
          background: 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.4)'
        }
      },
      
      button: {
        yellow: {
          background: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
          color: 'rgba(0, 0, 0, 0.95)',
        },
        pink: {
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
          color: 'rgba(0, 0, 0, 0.9)',
        },
        blue: {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
          color: 'rgba(0, 0, 0, 0.9)',
        }
      },
      
      pagination: {
        yellow: {
          background: 'rgba(0, 0, 0, 0.25)',
          border: 'rgba(0, 0, 0, 0.8)',
          bulletBg: 'rgba(255, 255, 255, 0.6)',
          bulletActiveBg: 'rgba(255, 255, 255, 0.9)',
          bulletHoverBg: 'rgba(255, 255, 255, 0.75)'
        },
        pink: {
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'rgba(255, 255, 255, 0.3)',
          bulletBg: 'rgba(0, 0, 0, 0.6)',
          bulletActiveBg: 'rgba(0, 0, 0, 0.9)',
          bulletHoverBg: 'rgba(0, 0, 0, 0.75)'
        },
        blue: {
          background: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.25)',
          bulletBg: 'rgba(0, 0, 0, 0.6)',
          bulletActiveBg: 'rgba(0, 0, 0, 0.9)',
          bulletHoverBg: 'rgba(0, 0, 0, 0.75)'
        }
      }
    }
    
    let colorVariant = 'blue'
    if (color === '#FFE142') colorVariant = 'yellow'
    else if (color === '#FF64D4') colorVariant = 'pink'
    
    const styles = variants[variant]?.[colorVariant] || variants.container.blue
    
    if (styles.backdropFilter) {
      styles.WebkitBackdropFilter = styles.backdropFilter
    }
    
    return styles
  }

  const getPaginationCSSProperties = (color) => {
    const paginationStyles = getGlassStyle(color, 'pagination')
    
    return {
      '--pagination-bg': paginationStyles.background,
      '--pagination-border': paginationStyles.border,
      '--bullet-bg': paginationStyles.bulletBg,
      '--bullet-active-bg': paginationStyles.bulletActiveBg,
      '--bullet-hover-bg': paginationStyles.bulletHoverBg
    }
  }
  
  const applyPaginationStyles = (color) => {
    if (typeof window !== 'undefined' && document?.documentElement) {
      const root = document.documentElement
      const properties = getPaginationCSSProperties(color)
      
      Object.entries(properties).forEach(([property, value]) => {
        root.style.setProperty(property, value)
      })
    }
  }
  
  return {
    getGlassStyle,
    getPaginationCSSProperties,
    applyPaginationStyles
  }
}