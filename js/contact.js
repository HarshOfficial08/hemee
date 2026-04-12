// contact.js — EmailJS form submission
// -------------------------------------------------------
// SETUP INSTRUCTIONS (one-time):
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail recommended) → note the Service ID
// 3. Create an Email Template with these variables:
//      {{from_name}}, {{from_email}}, {{phone}}, {{company}},
//      {{product}}, {{message}}
//    Set "To Email" to: office@hemee.in
//    Note the Template ID
// 4. Go to Account → API Keys → copy your Public Key
// 5. Replace the three placeholder values below with your real IDs
// -------------------------------------------------------

var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz456'
var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abcDEFghiJKL'

(function () {
  // Initialise EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  var form       = document.getElementById('contact-form');
  var submitBtn  = document.getElementById('submit-btn');
  var btnText    = document.getElementById('btn-text');
  var btnIcon    = document.getElementById('btn-icon');
  var statusDiv  = document.getElementById('form-status');

  if (!form) return;

  function showStatus(type, message) {
    statusDiv.className = 'form-status ' + type;
    statusDiv.textContent = message;
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    if (loading) {
      btnText.textContent = 'Sending…';
      btnIcon.textContent = '⏳';
    } else {
      btnText.textContent = 'Send Enquiry';
      btnIcon.textContent = '→';
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusDiv.className = 'form-status';

    var name    = document.getElementById('name').value.trim();
    var email   = document.getElementById('email').value.trim();
    var product = document.getElementById('product').value;
    var message = document.getElementById('message').value.trim();
    var company = document.getElementById('company').value.trim();
    var phone   = document.getElementById('phone').value.trim();

    // Validation
    if (!name) { showStatus('error', 'Please enter your full name.'); return; }
    if (!email || !validateEmail(email)) { showStatus('error', 'Please enter a valid email address.'); return; }
    if (!product) { showStatus('error', 'Please select a product of interest.'); return; }
    if (!message) { showStatus('error', 'Please enter your message or requirements.'); return; }

    // Check if EmailJS is configured
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
      // Demo mode — show success without actually sending
      setLoading(true);
      setTimeout(function () {
        setLoading(false);
        form.reset();
        showStatus('success', '✅ Thank you, ' + name + '! Your enquiry has been received. (Note: EmailJS not configured yet — please set up your credentials in js/contact.js)');
      }, 1200);
      return;
    }

    setLoading(true);

    var templateParams = {
      from_name:  name,
      from_email: email,
      company:    company || 'N/A',
      phone:      phone   || 'N/A',
      product:    product,
      message:    message
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function () {
        setLoading(false);
        form.reset();
        showStatus('success', '✅ Thank you, ' + name + '! Your enquiry has been sent. Our team will get back to you within 1 business day.');
      })
      .catch(function (error) {
        setLoading(false);
        console.error('EmailJS error:', error);
        showStatus('error', '❌ Failed to send your message. Please email us directly at office@hemee.in');
      });
  });
})();
