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

    // INTRO – SLIDE 1
    slide1Label: "",
    slide1Title: "Introduction",
    slide1Text:
      "Population genetics aims to understand why populations have the genetic characteristics we observe today. By studying DNA from different individuals and using statistical models, it is possible to reconstruct what happened in the past, such as changes in population size, migrations, or periods of isolation.",

    // INTRO – SLIDE 2 (continuation, no title)
    slide2Label: "",
    slide2Title: "",
    slide2Text:
      "Each individual has two copies of their DNA, inherited from their parents. Small differences between these copies contain information about the population’s history. By tracing these differences back in time, we can reconstruct how individuals are related to each other.\n\nThe goal of this thesis is to develop methods to determine whether populations are well connected or, on the contrary, isolated. This is especially important to understand species evolution and to support conservation.",

    // SLIDE 3 – CHAPTER 1
    slide3Label: "",
    slide3Title: "Chapter 1",
    slide3Text:
      "Many methods that reconstruct a population’s history from DNA assume that everyone mixes equally, as if the population were one homogeneous group. In nature, however, populations are often split into groups or partially isolated subpopulations.\n\nThe issue is that this group structure can create DNA patterns that look very similar to what we would expect after a recent population decline. In this chapter, we show that when structure exists, some inferred size changes can be artefacts. If this is ignored, it is easy to draw incorrect conclusions about the population’s history and current status.",

    // QUESTIONS
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
    headerTitle: "",
    headerSubtitle: "",
    headerHint: "Desliza hacia arriba para continuar",

    // INTRO – SLIDE 1
    slide1Label: "",
    slide1Title: "Introducción",
    slide1Text:
      "La genética de poblaciones busca entender por qué las poblaciones tienen hoy las características genéticas que observamos. Para ello estudia el ADN de distintos individuos y utiliza modelos estadísticos para reconstruir lo que ocurrió en el pasado, como cambios en el tamaño de la población, migraciones o periodos de aislamiento.",

    // INTRO – SLIDE 2 (continuación, sin título)
    slide2Label: "",
    slide2Title: "",
    slide2Text:
      "Cada persona o individuo tiene dos copias de su ADN, heredadas de sus progenitores. Las pequeñas diferencias entre estas copias contienen información sobre la historia de la población. Siguiendo estas diferencias hacia atrás en el tiempo, es posible reconstruir cómo los individuos están relacionados entre sí.\n\nEl objetivo de esta tesis es desarrollar métodos que permitan saber si las poblaciones están bien conectadas entre ellas o, por el contrario, aisladas. Esta información es especialmente importante para entender la evolución de las especies y para su conservación.",

    // SLIDE 3 – CAPÍTULO 1
    slide3Label: "",
    slide3Title: "Capítulo 1",
    slide3Text:
      "Muchos métodos para reconstruir la historia de una población con ADN asumen que todos los individuos se mezclan por igual, como si fuera una única población homogénea. Sin embargo, en la naturaleza suele haber grupos o subpoblaciones parcialmente aisladas.\n\nEl problema es que esa separación en grupos puede producir señales en el ADN muy parecidas a las que veríamos si la población hubiera disminuido recientemente. En este capítulo mostramos que, cuando existe esta división, algunos cambios de tamaño reconstruidos pueden ser artefactos. Si no se tiene en cuenta, es fácil sacar conclusiones equivocadas sobre la historia y el estado actual de la población.",

    // PREGUNTAS
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
    headerTitle: "",
    headerSubtitle: "",
    headerHint: "Glissez vers le haut pour continuer",

    // INTRO – SLIDE 1
    slide1Label: "",
    slide1Title: "Introduction",
    slide1Text:
      "La génétique des populations cherche à comprendre pourquoi les populations présentent aujourd’hui les caractéristiques génétiques que nous observons. En étudiant l’ADN de différents individus et à l’aide de modèles statistiques, il est possible de reconstituer ce qui s’est passé dans le passé, comme des changements de taille de population, des migrations ou des périodes d’isolement.",

    // INTRO – SLIDE 2 (suite, sans titre)
    slide2Label: "",
    slide2Title: "",
    slide2Text:
      "Chaque individu possède deux copies de son ADN, héritées de ses parents. De petites différences entre ces copies contiennent des informations sur l’histoire de la population. En remontant ces différences dans le temps, on peut comprendre comment les individus sont liés entre eux.\n\nL’objectif de cette thèse est de développer des méthodes permettant de savoir si les populations sont bien connectées entre elles ou, au contraire, isolées. Ces informations sont particulièrement importantes pour comprendre l’évolution des espèces et pour leur conservation.",

    // SLIDE 3 – CHAPITRE 1
    slide3Label: "",
    slide3Title: "Chapitre 1",
    slide3Text:
      "De nombreuses méthodes qui reconstruisent l’histoire d’une population à partir de l’ADN supposent que tous les individus se mélangent de la même façon, comme si la population était un groupe homogène. Or, dans la nature, il existe souvent des groupes ou des sous-populations partiellement isolées.\n\nLe problème est que cette organisation en groupes peut produire dans l’ADN des signaux très proches de ceux attendus après une diminution récente de la population. Dans ce chapitre, nous montrons que, lorsqu’il existe une structure, certains changements de taille reconstruits peuvent être des artefacts. Si on ne le sait pas, on peut facilement tirer de mauvaises conclusions sur l’histoire et l’état actuel de la population.",

    // QUESTIONS
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
