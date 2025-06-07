const hero = document.querySelector("#hero");
const heroImage = document.querySelector(".hero-image");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    heroImage.style.display = entry.isIntersecting ? "block" : "none";
  });
}, { threshold: 0.1 });

observer.observe(hero);
