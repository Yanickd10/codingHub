   
const today =new Date();
mydate = document.getElementById("mydate").textContent= (today.getFullYear()); 
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    return false;
  }, false);
window.onbeforeprint = function () {
    return false;
};
// Disable right-click context menu
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    return false;
  });
  
  // Disable keyboard shortcuts for copy
  document.addEventListener('keydown', function(event) {
    // Prevent Ctrl+C, Ctrl+X, Ctrl+P, Ctrl+S
    if ((event.ctrlKey || event.metaKey) && 
        (event.key === 'c' || event.key === 'x' || 
         event.key === 'p' || event.key === 's')) {
      event.preventDefault();
      return false;
    }
  });
  
  // Disable text selection
  document.addEventListener('selectstart', function(event) {
    event.preventDefault();
    return false;
  });
  
  // For PDF object specifically
  const pdfObject = document.querySelector('object[type="application/pdf"], embed[type="application/pdf"], iframe');
  if (pdfObject) {
    pdfObject.addEventListener('contextmenu', function(event) {
      event.preventDefault();
      return false;
    });
    
    // Optional: Add CSS to make content non-selectable
    pdfObject.style.userSelect = 'none';
    pdfObject.style.webkitUserSelect = 'none';
  }
//   =========
// Method 1: Apply CSS to the iframe itself
document.getElementById('pdf-iframe').style.userSelect = 'none';
document.getElementById('pdf-iframe').style.webkitUserSelect = 'none';
document.getElementById('pdf-iframe').style.msUserSelect = 'none';
document.getElementById('pdf-iframe').style.mozUserSelect = 'none';

// Method 2: Prevent default behavior on mousedown
document.getElementById('pdf-iframe').addEventListener('mousedown', function(e) {
  e.preventDefault();
  return false;
});
// ============
// Create a transparent overlay
const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.zIndex = '1000';
overlay.style.background = 'transparent';

// Get the iframe's position and size
const iframe = document.getElementById('pdf-iframe');
const rect = iframe.getBoundingClientRect();

// Position the overlay over the iframe
overlay.style.top = rect.top + 'px';
overlay.style.left = rect.left + 'px';
overlay.style.width = rect.width + 'px';
overlay.style.height = rect.height + 'px';

// Add to document
document.body.appendChild(overlay);

// ===============
// Get reference to the iframe
const pdfIframe = document.getElementById('pdf-iframe');

// Method 1: Apply styles directly to the iframe content when it loads
pdfIframe.addEventListener('load', function() {
  try {
    // Access the iframe's document
    const iframeDocument = pdfIframe.contentDocument || pdfIframe.contentWindow.document;
    
    // Add CSS to disable text selection on everything in the iframe
    const style = iframeDocument.createElement('style');
    style.textContent = `
      * {
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
      }
    `;
    iframeDocument.head.appendChild(style);
    
    // Additionally, prevent selection events
    iframeDocument.addEventListener('selectstart', function(e) {
      e.preventDefault();
      return false;
    }, false);
    
    // Prevent right-click menu which could allow copying
    iframeDocument.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    }, false);
    
  } catch (e) {
    console.error('Error applying no-select to iframe:', e);
  }
});
