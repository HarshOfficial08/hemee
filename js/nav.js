// nav.js — Compatibility wrapper pointing to centralized layout.js
// All routing, navigation, and footer logic is now unified in js/layout.js
if (!window.HemeeLayout && !document.querySelector('script[src*="layout.js"]')) {
  var s = document.createElement('script');
  s.src = 'js/layout.js';
  document.head.appendChild(s);
}
