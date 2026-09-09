// layout.js — Single Source of Truth for Routing, Navigation & Footer
// ======================================================================

(function () {
  'use strict';

  // 1. ROUTING CONFIGURATION (Single source of truth for all site routes)
  const ROUTES = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/innovations', label: 'Innovations' },
    { path: '/infrastructure', label: 'Infrastructure' },
    { path: '/contact', label: 'Contact Us', isCta: true }
  ];

  // 2. SITE & CONTACT CONFIGURATION (Single source of truth for company info)
  const SITE_CONFIG = {
    name: 'Hemee International Pvt. Ltd.',
    logo: 'images/logo.png',
    tagline: 'Castor Oil & Derivatives Manufacturer / Exporter &mdash; Delivering quality chemical solutions from the heart of Gujarat to the world.',
    address: {
      title: 'India Office:',
      lines: [
        'Opp. Jain Mandir, Nr. Nandasan Bridge,',
        'Ahmedabad&ndash;Mehsana Highway,',
        'Nandasan&ndash;382705, Ta: Kadi,',
        'Dist: Mehsana, Gujarat'
      ]
    },
    email: 'office@hemee.in',
    phones: [
      { label: '+91 84015 52799', tel: '+918401552799' },
      { label: '+91 95376 45654', tel: '+919537645654' }
    ],
    social: {
      whatsapp: 'https://wa.me/918401552799',
      facebook: 'https://www.facebook.com'
    },
    meta: {
      copyright: '&copy; 2025 Hemee International Pvt. Ltd. All rights reserved.',
      gstn: '24AAICK3951D1ZQ',
      iec: 'AAICK3951D'
    }
  };

  // SVGs
  const SVG_CALL = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
  const SVG_WHATSAPP = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  const SVG_FACEBOOK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';

  // Active Route Matcher
  function isRouteActive(routePath) {
    const current = (window.location.pathname || '').toLowerCase();
    if (routePath === '/') {
      return (
        current === '/' ||
        current.endsWith('/index.html') ||
        current.endsWith('/hemee/') ||
        current.endsWith('/hemee')
      );
    }
    const clean = routePath.replace(/^\//, '').toLowerCase();
    return current.includes('/' + clean) || current.endsWith(clean + '.html');
  }

  // 3. RENDER NAVBAR
  function renderNavbar() {
    const navEl = document.getElementById('navbar');
    if (!navEl) return;

    const desktopLinksHtml = ROUTES.map(r => {
      const active = isRouteActive(r.path);
      const classes = [];
      if (active) classes.push('active');
      if (r.isCta) classes.push('nav-cta');
      const classAttr = classes.length ? ` class="${classes.join(' ')}"` : '';
      return `<li><a href="${r.path}"${classAttr}>${r.label}</a></li>`;
    }).join('\n        ');

    const mobileLinksHtml = ROUTES.map(r => {
      const active = isRouteActive(r.path);
      const classAttr = active ? ' class="active"' : '';
      return `<a href="${r.path}"${classAttr}>${r.label}</a>`;
    }).join('\n      ');

    navEl.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="nav-logo">
        <img src="${SITE_CONFIG.logo}" alt="${SITE_CONFIG.name}">
      </a>
      <ul class="nav-links">
        ${desktopLinksHtml}
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" id="nav-mobile">
      ${mobileLinksHtml}
    </div>`;

    // Re-bind navbar event listeners
    bindNavbarEvents();
  }

  // Navbar interactions (scroll shadow & hamburger menu)
  function bindNavbarEvents() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');

    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    if (hamburger && navMobile) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        navMobile.classList.toggle('open');
      });

      navMobile.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          hamburger.classList.remove('open');
          navMobile.classList.remove('open');
        });
      });
    }
  }

  // 4. RENDER FOOTER
  function renderFooter() {
    const footerEl = document.querySelector('footer');
    if (!footerEl) return;

    const navListHtml = ROUTES.map(r => {
      return `<li><a href="${r.path}">${r.label}</a></li>`;
    }).join('\n            ');

    const phonesHtml = SITE_CONFIG.phones.map(p => {
      return `<a href="tel:${p.tel}">
              <span class="ph-ico">${SVG_CALL}</span>
              ${p.label}
            </a>`;
    }).join('\n            ');

    const addressLinesHtml = SITE_CONFIG.address.lines.join('<br>');

    footerEl.innerHTML = `
    <div class="container">
      <div class="footer-grid">

        <!-- Brand -->
        <div class="footer-brand">
          <a href="/" class="nav-logo">
            <img src="${SITE_CONFIG.logo}" alt="${SITE_CONFIG.name}">
          </a>
          <p>${SITE_CONFIG.tagline}</p>
          <div class="footer-social">
            <div class="footer-social-label">Follow Us</div>
            <div class="footer-social-links">
              <a href="${SITE_CONFIG.social.whatsapp}" target="_blank" rel="noopener" class="footer-social-link whatsapp">
                ${SVG_WHATSAPP}
                WhatsApp
              </a>
              <a href="${SITE_CONFIG.social.facebook}" target="_blank" rel="noopener" class="footer-social-link facebook">
                ${SVG_FACEBOOK}
                Facebook
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            ${navListHtml}
          </ul>
        </div>

        <!-- Contact Details -->
        <div class="footer-col">
          <h4>Get In Touch</h4>
          <address>
            <strong>${SITE_CONFIG.address.title}</strong><br>
            ${addressLinesHtml}<br><br>
            <a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a><br>
          </address>
          <div class="footer-phones">
            ${phonesHtml}
          </div>
        </div>

      </div>
      <div class="footer-divider"></div>
      <div class="footer-bottom">
        <p>${SITE_CONFIG.meta.copyright}</p>
        <span class="gstn">GSTN: ${SITE_CONFIG.meta.gstn} &nbsp;|&nbsp; IEC: ${SITE_CONFIG.meta.iec}</span>
      </div>
    </div>`;
  }

  // Initialize layout when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      renderNavbar();
      renderFooter();
    });
  } else {
    renderNavbar();
    renderFooter();
  }

  // Export globally for programmatic updates if needed
  window.HemeeLayout = {
    ROUTES: ROUTES,
    SITE_CONFIG: SITE_CONFIG,
    renderNavbar: renderNavbar,
    renderFooter: renderFooter
  };
})();
