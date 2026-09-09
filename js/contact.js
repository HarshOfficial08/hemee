// contact.js — FormSubmit AJAX form submission
// -------------------------------------------------------
// The recipient email where form enquiries will be sent:
var RECIPIENT_EMAIL = 'office@hemee.in';
// -------------------------------------------------------

(function () {
  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('submit-btn');
  var btnText = document.getElementById('btn-text');
  var btnIcon = document.getElementById('btn-icon');
  var statusDiv = document.getElementById('form-status');

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

  function validatePhone(phone) {
    // Check allowable characters: optional leading '+', brackets, spaces, dots, hyphens, and digits
    if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(phone)) {
      return false;
    }
    // Verify total digit count complies with international telephone standards (7 to 15 digits, ITU-T E.164)
    var digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusDiv.className = 'form-status';

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var product = document.getElementById('product').value;
    var message = document.getElementById('message').value.trim();
    var company = document.getElementById('company').value.trim();
    var phone = document.getElementById('phone').value.trim();

    // Validation
    if (!name) { showStatus('error', 'Please enter your full name.'); return; }
    if (!email || !validateEmail(email)) { showStatus('error', 'Please enter a valid email address.'); return; }
    if (phone && !validatePhone(phone)) { showStatus('error', 'Please enter a valid phone number (7 to 15 digits, e.g. +91 98765 43210).'); return; }
    if (!product) { showStatus('error', 'Please select a product of interest.'); return; }
    if (!message) { showStatus('error', 'Please enter your message or requirements.'); return; }

    setLoading(true);

    var payload = {
      'Full Name': name,
      'Email Address': email,
      'Company': company || 'N/A',
      'Phone Number': phone || 'N/A',
      'Product Interest': product,
      'Message': message,
      _subject: 'New Enquiry from ' + name + ' (Hemee Website)',
      _template: 'table',
      _captcha: 'false'
    };

    fetch('https://formsubmit.co/ajax/' + encodeURIComponent(RECIPIENT_EMAIL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setLoading(false);
        if (data.success === 'true' || data.success === true || responseIsOk(data)) {
          form.reset();
          showStatus('success', '✅ Thank you, ' + name + '! Your enquiry has been sent. Our team will get back to you within 1 business day.');
        } else {
          showStatus('error', '❌ ' + (data.message || 'Failed to send message. Please email us directly at ' + RECIPIENT_EMAIL));
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error('Submission error:', error);
        showStatus('error', '❌ Failed to send your message. Please email us directly at ' + RECIPIENT_EMAIL);
      });
  });

  function responseIsOk(data) {
    return data && (data.message === 'The form was submitted successfully.' || data.status === 'success');
  }
})();
