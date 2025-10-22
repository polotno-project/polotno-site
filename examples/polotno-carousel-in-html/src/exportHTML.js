// Helper function to create virtual DOM nodes (similar to React.createElement)
const h = (type, props, ...children) => {
  return { type, props, children: children || [] };
};

// Function to wrap HTML with carousel JavaScript
const wrapHTMLWithCarousel = (htmlContent) => {
  const carouselScript = `
    <style>
      .polotno-carousel-container {
        position: relative;
        overflow: hidden;
      }
      .carousel-slide {
        transition: opacity 0.5s ease-in-out;
      }
      .carousel-slide-active {
        display: block !important;
        opacity: 1;
      }
    </style>
    <script>
      (function() {
          // Initialize carousel functionality
          function initCarousels() {
            const carousels = document.querySelectorAll('[data-carousel="true"]');
          
          carousels.forEach(carousel => {
            const slides = carousel.querySelectorAll('.carousel-slide');
            if (slides.length <= 1) return;
            
            let currentIndex = 0;
            
            // Function to show slide at index
            function showSlide(index) {
              slides.forEach((slide, i) => {
                if (i === index) {
                  slide.style.display = 'block';
                  slide.classList.add('carousel-slide-active');
                  // Fade in
                  setTimeout(() => {
                    slide.style.opacity = '1';
                  }, 10);
                } else {
                  slide.style.opacity = '0';
                  slide.classList.remove('carousel-slide-active');
                  // Hide after transition
                  setTimeout(() => {
                    slide.style.display = 'none';
                  }, 500);
                }
              });
            }
            
            // Auto-rotate carousel with custom timeout
            const timeout = parseInt(carousel.getAttribute('data-timeout')) || 3000;
            setInterval(() => {
              currentIndex = (currentIndex + 1) % slides.length;
              showSlide(currentIndex);
            }, timeout);
          });
        }
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initCarousels);
        } else {
          initCarousels();
        }
      })();
    </script>
  `;

  // Insert the script before closing body tag
  if (htmlContent.includes('</body>')) {
    return htmlContent.replace('</body>', carouselScript + '</body>');
  } else {
    // If no body tag, append to the end
    return htmlContent + carouselScript;
  }
};

// Function to download a file
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Custom download function
export const downloadAsHTML = async (store) => {
  try {
    // Export to HTML with custom element hook
    const html = await store.toHTML({
      elementHook: ({ dom, element }) => {
        // Check if element has custom.images array
        if (
          element.custom &&
          element.custom.images &&
          Array.isArray(element.custom.images)
        ) {
          // Remove all children of the element
          dom.children = [];
          const images = element.custom.images;

          // Get the original DOM properties
          const originalProps = dom.props || {};
          const originalStyle = originalProps.style || {};

          // Get carousel timeout from element custom properties
          const carouselTimeout = element.custom?.carouselTimeout || 3000;

          // Build array of slide children
          const slides = [
            ...images.map((imageSrc, index) =>
              h('img', {
                src: imageSrc,
                class: 'carousel-slide',
                style: {
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: index === 0 ? 'block' : 'none',
                },
              })
            ),
          ];

          // Create carousel container with all slides
          const carouselContainer = h(
            'div',
            {
              class: 'polotno-carousel-container',
              'data-carousel': 'true',
              'data-timeout': carouselTimeout.toString(),
              style: {
                ...originalStyle,
                position: originalStyle.position || 'absolute',
                overflow: 'hidden',
              },
            },
            ...slides
          );

          return carouselContainer;
        }

        return dom;
      },
    });

    // Wrap HTML with carousel JavaScript
    const wrappedHTML = wrapHTMLWithCarousel(html);

    // Download the file
    downloadFile(wrappedHTML, 'polotno-export.html', 'text/html');
  } catch (error) {
    console.error('Error exporting to HTML:', error);
    alert('Failed to export HTML. Please try again.');
  }
};
