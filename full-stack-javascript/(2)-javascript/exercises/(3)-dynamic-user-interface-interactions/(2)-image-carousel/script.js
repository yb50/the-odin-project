function initCarousel(root, intervalMs = 5000) {
  const track = root.querySelector(".carousel-track");
  const slides = Array.from(root.querySelectorAll(".carousel-slide"));
  const prevBtn = root.querySelector(".prev");
  const nextBtn = root.querySelector(".next");
  const dotsWrap = root.querySelector(".carousel-dots");

  if (!track || slides.length === 0) return;

  let index = 0;
  let timerId = null;

  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(b);
    return b;
  });

  function render() {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function clamp(i) {
    if (i < 0) return slides.length - 1;
    if (i >= slides.length) return 0;
    return i;
  }

  function goTo(i, user = false) {
    index = clamp(i);
    render();
    if (user) resetTimer();
  }

  function next(user = false) { goTo(index + 1, user); }
  function prev(user = false) { goTo(index - 1, user); }

  function startTimer() {
    stopTimer();
    timerId = setInterval(() => next(), intervalMs);
  }

  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function resetTimer() { startTimer(); }

  if (prevBtn) prevBtn.addEventListener("click", () => prev(true));
  if (nextBtn) nextBtn.addEventListener("click", () => next(true));

  root.addEventListener("mouseenter", stopTimer);
  root.addEventListener("mouseleave", startTimer);

  render();
  startTimer();
}

document.querySelectorAll(".carousel").forEach(carousel => {
  initCarousel(carousel, 5000);
});
