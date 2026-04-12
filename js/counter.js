// counter.js — Animated stat counters using IntersectionObserver
(function () {
  var counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-target'), 10);
    var prefix   = el.getAttribute('data-prefix') || '';
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 2000; // ms
    var start    = null;

    // For the year "2020" we animate from 2000
    var startValue = target > 1000 ? target - 20 : 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      var elapsed  = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = easeOutQuad(progress);
      var current  = Math.floor(startValue + (target - startValue) * eased);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // Only animate when the stats section enters the viewport
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  } else {
    // Fallback: just set the final value
    counters.forEach(function (counter) {
      var prefix = counter.getAttribute('data-prefix') || '';
      var suffix = counter.getAttribute('data-suffix') || '';
      var target = counter.getAttribute('data-target') || '';
      counter.textContent = prefix + target + suffix;
    });
  }
})();
