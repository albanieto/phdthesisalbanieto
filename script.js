/****************************************************
 * SLIDES - CAMBIO DE PANTALLA TIPO STORIES
 ****************************************************/
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

  // Cuando termine la animación
  setTimeout(() => {
    isAnimating = false;
  }, 650);
}

/* ===== RUEDA DEL RATÓN (ordenador) ===== */
window.addEventListener(
  "wheel",
  (event) => {
    const deltaY = event.deltaY;
    if (deltaY > 0) goToSlide(currentIndex + 1);
    else if (deltaY < 0) goToSlide(currentIndex - 1);
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

    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) goToSlide(currentIndex + 1); // Swipe arriba = siguiente
      else goToSlide(currentIndex - 1); // Swipe abajo = anterior
    }

    touchStartY = null;
    touchEndY = null;
  },
  { passive: true }
);

/****************************************************
 * TRADUCCIONES (ES / EN / FR)
 ****************************************************/
const translations = {
  en: {
    headerTitle: "",
    headerSubtitle: "",
    headerHint: "Swipe up to continue",

    slide1Label: "Part 1",
    slide1Title: "Introduction",
    slide1Text: "Here goes the simple English summary of the introduction.",

    slide2Label: "Part 2",
    slide2Title: "Problem background",
    slide2Text: "English summary of the second part of the presentation.",

    slide3Label: "Part 3",
    slide3Title: "Main results",
    slide3Text: "Short summary of the main results.",

    questionsLabel: "Questions",
    questionsTitle: "Do you have any questions?",
    questionsIntro: "Send your questions using this form.",
    labelNombre: "Your name (optional)",
    labelEmail: "Your email (optional)",
    labelPregunta: "Question",
    submitButton: "Send question",
    questionsNote: "Your question will be securely emailed to the PhD candidate."
  },

  es: {
    headerTitle: "Defensa de tesis – [Nombre]",
    headerSubtitle: "Directores/as: [Director 1] · [Director 2]",
    headerHint: "Desliza hacia arriba para continuar",

    slide1Label: "Parte 1",
    slide1Title: "Introducción",
    slide1Text: "Aquí va el resumen simplificado de la introducción.",

    slide2Label: "Parte 2",
    slide2Title: "Contexto del problema",
    slide2Text: "Aquí va el resumen de la segunda parte de la presentación.",

    slide3Label: "Parte 3",
    slide3Title: "Resultados",
    slide3Text: "Aquí puedes poner un resumen sencillo de los resultados.",

    questionsLabel: "Preguntas",
    questionsTitle: "¿Tienes alguna pregunta?",
    questionsIntro:
      "Puedes enviar aquí tus preguntas sobre la tesis. Se enviarán automáticamente por correo.",
    labelNombre: "Tu nombre (opcional)",
    labelEmail: "Tu correo (opcional)",
    labelPregunta: "Pregunta",
    submitButton: "Enviar pregunta",
    questionsNote: "Tu pregunta se enviará de forma segura a la doctoranda."
  },

  fr: {
    headerTitle: "Soutenance de thèse – [Nom]",
    headerSubtitle: "Directeurs/trices : [Directeur 1] · [Directeur 2]",
    headerHint: "Glissez vers le haut pour continuer",

    slide1Label: "Partie 1",
    slide1Title: "Introduction",
    slide1Text: "Résumé français simple de l'introduction.",

    slide2Label: "Partie 2",
    slide2Title: "Contexte du problème",
    slide2Text: "Résumé français de la deuxième partie de la présentation.",

    slide3Label: "Partie 3",
    slide3Title: "Résultats principaux",
    slide3Text: "Résumé court des résultats principaux.",

    questionsLabel: "Questions",
    questionsTitle: "Vous avez des questions ?",
    questionsIntro: "Envoyez vos questions via ce formulaire.",
    labelNombre: "Votre nom (optionnel)",
    labelEmail: "Votre e-mail (optionnel)",
    labelPregunta: "Question",
    submitButton: "Envoyer la question",
    questionsNote:
      "Votre question sera envoyée en toute sécurité à la doctorante."
  }
};

/****************************************************
 * FUNCIÓN PARA APLICAR IDIOMA
 ****************************************************/
function applyLanguage(lang) {
  const t = translations[lang];

  const map = {
    headerTitle: "headerTitle",
    headerSubtitle: "headerSubtitle",
    headerHint: "headerHint",

    slide1Label: "slide1Label",
    slide1Title: "slide1Title",
    slide1Text: "slide1Text",

    slide2Label: "slide2Label",
    slide2Title: "slide2Title",
    slide2Text: "slide2Text",

    slide3Label: "slide3Label",
    slide3Title: "slide3Title",
    slide3Text: "slide3Text",

    questionsLabel: "questionsLabel",
    questionsTitle: "questionsTitle",
    questionsIntro: "questionsIntro",

    labelNombre: "labelNombre",
    labelEmail: "labelEmail",
    labelPregunta: "labelPregunta",

    submitButton: "submitButton",
    questionsNote: "questionsNote"
  };

  Object.keys(map).forEach((key) => {
    const element = document.getElementById(map[key]);
    if (element) element.textContent = t[key];
  });
}

/****************************************************
 * SELECTOR DE IDIOMA (BANDERAS)
 ****************************************************/
document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "en";
  applyLanguage(currentLang);

  const flags = document.querySelectorAll(".lang-flag");

  flags.forEach((flag) => {
    flag.addEventListener("click", () => {
      const lang = flag.dataset.lang;

      if (lang !== currentLang) {
        currentLang = lang;
        applyLanguage(currentLang);

        flags.forEach((f) => f.classList.remove("is-active"));
        flag.classList.add("is-active");
      }
    });
  });
});

/****************************************************
 * FORMULARIO DE PREGUNTAS → GOOGLE APPS SCRIPT
 ****************************************************/
const questionsForm = document.getElementById("questionsForm");

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyowyupx_sdnUPkFYWgACYfNDm9gebXEPHaB0KGAslX7c6HLW5RvMt0OIVugFYCix2nkg/exec";

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
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

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
