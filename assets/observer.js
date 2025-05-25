const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate counter
      document.querySelectorAll('.counter').forEach(counter => {
        const countTo = parseInt(counter.getAttribute('data-count'), 10);
        const duration = 3000;
        const start = 0;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentCount = Math.floor(progress * (countTo - start) + start);
          counter.textContent = currentCount;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = countTo;
          }
        }

        requestAnimationFrame(updateCount);
      });

      // Add class to progress value
      document.querySelectorAll('.progress-value').forEach(el => {
        el.classList.add('progress-animation');
      });
    }
  });
});

// Observe counter container
const counterContainer = document.querySelector('.counter-container');
if (counterContainer) {
  observer.observe(counterContainer);
}