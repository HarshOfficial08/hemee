// products.js — Category expand / collapse toggle
function toggleCategory(headerEl) {
  var card = headerEl.closest('.category-card');
  var isOpen = card.classList.contains('open');

  // Close all cards first
  document.querySelectorAll('.category-card').forEach(function (c) {
    c.classList.remove('open');
  });

  // Open the clicked one if it was closed
  if (!isOpen) {
    card.classList.add('open');
  }
}

// Open card if URL hash matches its id
(function () {
  var hash = window.location.hash;
  if (hash) {
    var target = document.querySelector(hash);
    if (target && target.classList.contains('category-card')) {
      // Close all, then open target
      document.querySelectorAll('.category-card').forEach(function (c) {
        c.classList.remove('open');
      });
      target.classList.add('open');
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }
})();

/* ============================================
   PRODUCT MODAL LOGIC
   ============================================ */

const dummyProductData = {
  title: "COMMERCIAL CASTOR OIL",
  specs: [
    { sr: 1, param: "Appearance", spec: "Viscous Oily Liquid", method: "Visual" },
    { sr: 2, param: "Colour Lovibond 1\" cell, Units", spec: "15Y, 1.5R Max", method: "AOCS Cc 13e-92" },
    { sr: 3, param: "Free Fatty Acid (as oleic acid), %", spec: "2.0 Max", method: "AOCS Ca 5a-40" },
    { sr: 4, param: "Acid Value, mg KOH/g", spec: "4.0 Max", method: "AOCS Ca 5a-40" },
    { sr: 5, param: "Moisture and Insoluble Impurities, %", spec: "0.5 Max", method: "AOCS Ca 2c-25 / AOCS Ca 3a-46" },
    { sr: 6, param: "Iodine Value, g I2/100g", spec: "82 — 90", method: "AOCS Cd 1d-92" },
    { sr: 7, param: "Saponification Value", spec: "177 — 185", method: "AOCS Cd 3-25" },
    { sr: 8, param: "Hydroxyl Value, mg KOH/g", spec: "160 — 168", method: "AOCS Cd 13-60 / GLC" },
    { sr: 9, param: "Specific Gravity at 30°C", spec: "0.954 — 0.960", method: "AOCS Cc 10b-25" },
    { sr: 10, param: "Refractive Index at 40°C", spec: "1.4700 — 1.4740", method: "AOCS Cc 7-25" },
    { sr: 11, param: "Ricinolic Acid Content, %", spec: "85 Min", method: "ISO 5508/12966-2" }
  ],
  packing: [
    "Bulk in Flexi Tank",
    "Bulk in Vessel"
  ],
  shelfLife: "2 years"
};

const productImageMap = {
  "Refined Castor Oil — Commercial Grade": "CastorOilCommercialGrade.png",
  "Refined Castor Oil — Pharma Grade": "CastorOilPharmaGrade.png",
  "Black Oil Fatty Acid": "BlackOilFattyAcid.png",
  "Distilled Fatty Acid": "DistilledFattyAcid.png",
  "Mixed Fatty Acids": "MixFattyAcid.png",
  "Castor De-Oiled Cake (Pellets/Powder)": "CastorDeOilCake.png",
  "Rape Seed Meal": "RapeSeedMeal.png",
  "Lecithin (Soya / Sunflower)": "Lecithin.png",
  "Raw Linseed Oil": "RawLinseedOil.png"
};

function openProductModal(productName) {
  const modal = document.getElementById('productModal');
  const titleEl = document.getElementById('modalProductName');
  const tableBody = document.getElementById('modalTableBody');
  const packingList = document.getElementById('modalPacking');
  const shelfLifeEl = document.getElementById('modalShelfLife');
  const inquiryBtn = document.getElementById('modalInquiryBtn');

  // Use dummy data for everything for now, just change the title
  titleEl.innerText = productName || dummyProductData.title;
  
  // Clear and Populate Table
  tableBody.innerHTML = '';
  dummyProductData.specs.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.sr}</td>
      <td>${row.param}</td>
      <td>${row.spec}</td>
      <td>${row.method}</td>
    `;
    tableBody.appendChild(tr);
  });

  // Populate Packing
  packingList.innerHTML = '';
  dummyProductData.packing.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    packingList.appendChild(li);
  });

  // Populate Shelf Life
  shelfLifeEl.innerText = dummyProductData.shelfLife;

  // Update Inquiry Link
  inquiryBtn.href = `contact.html?subject=Inquiry: ${encodeURIComponent(productName)}`;

  // Show Modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop scrolling
}

function closeModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Resume scrolling
}

// Attach listeners to all product items
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.product-item');
  items.forEach(item => {
    item.addEventListener('click', function() {
      // Find the name in the strong tag
      const name = this.querySelector('strong').innerText;
      openProductModal(name);
    });
  });
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
