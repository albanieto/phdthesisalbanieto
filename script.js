const wrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slide");

let currentIndex = 0;
let isAnimating = false;

// Ajustar altura total del contenedor (N slides * 100vh)
function updateWrapperHeight() {
  wrapper.style.height = `${slides.length * 100}vh`;
}
updateWrapperHeight();

// Función para ir a una slide concreta
function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  if (isAnimating) return;

  isAnimating = true;
  currentIndex = index;
  wrapper.style.transform = `translateY(-${index * 100}vh)`;

  // Cuando termine la animación, permitimos la siguiente
  setTimeout(() => {
    isAnimating = false;
  }, 650);
}

/* ===== RUEDA DEL RATÓN (ordenador) ===== */
window.addEventListener(
  "wheel",
  (event) => {
    const deltaY = event.deltaY;
    if (deltaY > 0) {
      // abajo
      goToSlide(currentIndex + 1);
    } else if (deltaY < 0) {
      // arriba
      goToSlide(currentIndex - 1);
    }
  },
  { passive: true }
);

/* ===== TECLAS (por si acaso en PC) ===== */
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "PageDown") {
    goToSlide(currentIndex + 1);
  } else if (event.key === "ArrowUp" || event.key === "PageUp") {
    goToSlide(currentIndex - 1);
  }
});

/* ===== GESTOS TÁCTILES (móvil) ===== */
let touchStartY = null;
let touchEndY = null;

window.addEventListener(
  "touchstart",
  (event) => {
    touchStartY = event.touches[0].clientY;
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  (event) => {
    touchEndY = event.touches[0].clientY;
  },
  { passive: true }
);

window.addEventListener(
  "touchend",
  () => {
    if (touchStartY === null || touchEndY === null) return;
    const diff = touchStartY - touchEndY;

    const threshold = 50; // píxeles mínimos para considerar swipe
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // swipe hacia arriba -> siguiente slide
        goToSlide(currentIndex + 1);
      } else {
        // swipe hacia abajo -> slide anterior
        goToSlide(currentIndex - 1);
      }
    }

    touchStartY = null;
    touchEndY = null;
  },
  { passive: true }
);

/* ===== FORMULARIO DE PREGUNTAS → GOOGLE APPS SCRIPT ===== */
const questionsForm = document.getElementById("questionsForm");

// 👉 Pega aquí la URL de tu despliegue de Apps Script
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyowyupx_sdnUPkFYWgACYfNDm9gebXEPHaB0KGAslX7c6HLW5RvMt0OIVugFYCix2nkg/exec";

if (questionsForm) {
  questionsForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const pregunta = document.getElementById("pregunta").value.trim();

    if (!pregunta) {
      alert("Por favor, escribe una pregunta antes de enviar.");
      return;
    }

    const data = { nombre, email, pregunta };

    try {
      // Usamos no-cors para evitar líos de CORS.
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Aunque no podamos leer la respuesta, asumimos que ha ido bien.
      questionsForm.reset();
      alert("¡Gracias! Tu pregunta se ha enviado correctamente.");

    } catch (error) {
      console.error(error);
      alert(
        "Ha ocurrido un problema al enviar la pregunta. " +
        "Si persiste, puedes preguntar directamente a la doctoranda."
      );
    }
  });
}
