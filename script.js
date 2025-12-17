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

    // INTRO – SLIDE 2 (no title)
    slide2Label: "",
    slide2Title: "",
    slide2Text:
      "Each individual has two copies of their DNA, inherited from their parents. Small differences between these copies contain information about the population’s history. By tracing these differences back in time, we can reconstruct how individuals are related to each other.\n\nThe goal of this thesis is to develop methods to determine whether populations are well connected or, on the contrary, isolated. This is especially important to understand species evolution and to support conservation.",

    // CHAPTER 1 – SLIDE 3
    slide3Label: "",
    slide3Title: "Chapter 1",
    slide3Text:
      "Many methods that reconstruct a population’s history from DNA assume that everyone mixes equally, as if the population were one homogeneous group. In nature, however, populations are often split into groups or partially isolated subpopulations.",

    // CHAPTER 1 – SLIDE 4 (no title)
    slide4Label: "",
    slide4Title: "",
    slide4Text:
      "The issue is that this group structure can create DNA patterns that look very similar to what we would expect after a recent population decline. In this chapter, we show that when structure exists, some inferred size changes can be artefacts. If this is ignored, it is easy to draw incorrect conclusions about the population’s history and current status.",

    // CHAPTER 2 – SLIDE 5
    slide5Label: "",
    slide5Title: "Chapter 2",
    slide5Text:
      "Ideally, we should take into account how a population is organised when we try to reconstruct its history from DNA. The problem is that describing this organisation in detail requires a huge number of computations and a high computational cost.\n\nIn this study, we propose a different solution based on artificial intelligence. Starting from genealogical trees obtained from DNA, we build a matrix that summarises their information.",

    // CHAPTER 2 – SLIDE 6 (no title)
    slide6Label: "",
    slide6Title: "",
    slide6Text:
      "We treat this matrix like an image and analyse it using an existing image-recognition system. This approach greatly simplifies the process, saving computing time, energy, and CO₂ emissions.\n\nSurprisingly, a system trained to tell a dog from a cat can also learn to detect complex genetic patterns. Thanks to this, we can identify whether a population is isolated or whether there are migration routes between populations, without explicitly modelling all the complexity of the evolutionary process.",

    // CONCLUSION – SLIDE 7
    slide7Label: "",
    slide7Title: "Conclusion",
    slide7Text:
      "This thesis studies how SMC methods behave when populations are not fully mixed and show internal structure. We find that methods such as PSMC and SMC++ can produce different results depending on how the population is organised.\n\nWe also identify effects caused by population structure that may look like errors, but can actually provide useful information when analysing real data.",

    // CONCLUSION – SLIDE 8 (no title)
    slide8Label: "",
    slide8Title: "",
    slide8Text:
      "We propose an artificial intelligence–based method to detect population structure using whole genomes. This approach makes it possible to reuse already trained models and greatly reduce computational cost.\n\nOverall, this work presents a more efficient way to study population history and organisation from DNA data.",

    // CREDITS – SLIDE 9
    slide9Label: "",
    slide9Title: "",
    slide9Text:
      'Developed with ❤️ by David Palacín Giménez.<br><br>' +
      'Contact me at <a href="mailto:palacingimenezdavid.fpllefia@gmail.com">palacingimenezdavid.fpllefia@gmail.com</a>' +
      ' or on LinkedIn: <a href="https://www.linkedin.com/in/david-palacin-gimenez/" target="_blank" rel="noopener noreferrer">David Palacín Giménez</a>',

    // QUESTIONS
    questionsLabel: "Questions",
    questionsTitle: "Do you have any questions?",
    questionsIntro: "Send your questions using this form.",
    labelNombre: "Your name (optional)",
    labelEmail: "Your email",
    labelPregunta: "Question",
    submitButton: "Send question",
    questionsNote: "Your question will be securely emailed to the PhD candidate.",


    nextSlideHint: "Swipe up to see the credits",

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

    // INTRO – SLIDE 2 (sin título)
    slide2Label: "",
    slide2Title: "",
    slide2Text:
      "Cada persona o individuo tiene dos copias de su ADN, heredadas de sus progenitores. Las pequeñas diferencias entre estas copias contienen información sobre la historia de la población. Siguiendo estas diferencias hacia atrás en el tiempo, es posible reconstruir cómo los individuos están relacionados entre sí.\n\nEl objetivo de esta tesis es desarrollar métodos que permitan saber si las poblaciones están bien conectadas entre ellas o, por el contrario, aisladas. Esta información es especialmente importante para entender la evolución de las especies y para su conservación.",

    // CAPÍTULO 1 – SLIDE 3
    slide3Label: "",
    slide3Title: "Capítulo 1",
    slide3Text:
      "Muchos métodos para reconstruir la historia de una población con ADN asumen que todos los individuos se mezclan por igual, como si fuera una única población homogénea. Sin embargo, en la naturaleza suele haber grupos o subpoblaciones parcialmente aisladas.",

    // CAPÍTULO 1 – SLIDE 4 (sin título)
    slide4Label: "",
    slide4Title: "",
    slide4Text:
      "El problema es que esa separación en grupos puede producir señales en el ADN muy parecidas a las que veríamos si la población hubiera disminuido recientemente. En este capítulo mostramos que, cuando existe esta división, algunos cambios de tamaño reconstruidos pueden ser artefactos. Si no se tiene en cuenta, es fácil sacar conclusiones equivocadas sobre la historia y el estado actual de la población.",

    // CAPÍTULO 2 – SLIDE 5
    slide5Label: "",
    slide5Title: "Capítulo 2",
    slide5Text:
      "Lo ideal sería tener en cuenta cómo está organizada una población cuando intentamos reconstruir su historia a partir del ADN. El problema es que describir esta organización con detalle requiere muchísimos cálculos y un gran coste computacional.\n\nEn este estudio proponemos una solución distinta basada en inteligencia artificial. A partir de los árboles genealógicos que se obtienen del ADN, construimos una matriz que resume su información.",

    // CAPÍTULO 2 – SLIDE 6 (sin título)
    slide6Label: "",
    slide6Title: "",
    slide6Text:
      "Tratamos esa matriz como si fuera una imagen y la analizamos con un sistema de reconocimiento de imágenes ya existente. Este enfoque simplifica mucho el proceso y ahorra tiempo de cálculo, energía y emisiones de CO₂.\n\nDe forma sorprendente, un sistema entrenado para distinguir un perro de un gato también puede aprender a detectar patrones genéticos complejos. Gracias a ello, es posible identificar si una población está aislada o si existen rutas de migración entre poblaciones, sin necesidad de modelar explícitamente toda la complejidad del proceso evolutivo.",

    // CONCLUSIÓN – SLIDE 7
    slide7Label: "",
    slide7Title: "Conclusión",
    slide7Text:
      "Se ha estudiado cómo funcionan los métodos SMC cuando las poblaciones no están completamente mezcladas y presentan estructura. Se ha observado que métodos como PSMC y SMC++ pueden dar resultados distintos dependiendo de cómo esté organizada la población.\n\nAdemás, se han identificado efectos causados por la estructura poblacional que pueden parecer errores, pero que en realidad pueden aportar información útil cuando se analizan datos reales.",

    // CONCLUSIÓN – SLIDE 8 (sin título)
    slide8Label: "",
    slide8Title: "",
    slide8Text:
      "En esta tesis se propone un método basado en inteligencia artificial para detectar estructura poblacional a partir de genomas completos. Este enfoque permite reutilizar modelos ya entrenados y reducir de forma considerable el coste computacional.\n\nEn conjunto, este trabajo muestra una manera más eficiente de estudiar la historia y organización de las poblaciones a partir del ADN.",

    // CRÉDITOS – SLIDE 9
    slide9Label: "",
    slide9Title: "",
    slide9Text:
      'Desarrollado con ❤️ por David Palacín Giménez.<br><br>' +
      'Contáctame en <a href="mailto:palacingimenezdavid.fpllefia@gmail.com">palacingimenezdavid.fpllefia@gmail.com</a>' +
      ' o en LinkedIn: <a href="https://www.linkedin.com/in/david-palacin-gimenez/" target="_blank" rel="noopener noreferrer">David Palacín Giménez</a>',

    // PREGUNTAS
    questionsLabel: "Preguntas",
    questionsTitle: "¿Tienes alguna pregunta?",
    questionsIntro:
      "Puedes enviar aquí tus preguntas sobre la tesis. Se enviarán automáticamente por correo.",
    labelNombre: "Tu nombre (opcional)",
    labelEmail: "Tu correo",
    labelPregunta: "Pregunta",
    submitButton: "Enviar pregunta",
    questionsNote: "Tu pregunta se enviará de forma segura a la doctoranda.",

    nextSlideHint: "Desliza hacia arriba para ver los créditos",

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

    // INTRO – SLIDE 2 (sans titre)
    slide2Label: "",
    slide2Title: "",
    slide2Text:
      "Chaque individu possède deux copies de son ADN, héritées de ses parents. De petites différences entre ces copies contiennent des informations sur l’histoire de la population. En remontant ces différences dans le temps, on peut comprendre comment les individus sont liés entre eux.\n\nL’objectif de cette thèse est de développer des méthodes permettant de savoir si les populations sont bien connectées entre elles ou, au contraire, isolées. Ces informations sont particulièrement importantes pour comprendre l’évolution des espèces et pour leur conservation.",

    // CHAPITRE 1 – SLIDE 3
    slide3Label: "",
    slide3Title: "Chapitre 1",
    slide3Text:
      "De nombreuses méthodes qui reconstruisent l’histoire d’une population à partir de l’ADN supposent que tous les individus se mélangent de la même façon, comme si la population était un groupe homogène. Or, dans la nature, il existe souvent des groupes ou des sous-populations partiellement isolées.",

    // CHAPITRE 1 – SLIDE 4 (sans titre)
    slide4Label: "",
    slide4Title: "",
    slide4Text:
      "Le problème est que cette organisation en groupes peut produire dans l’ADN des signaux très proches de ceux attendus après une diminution récente de la population. Dans ce chapitre, nous montrons que, lorsqu’il existe une structure, certains changements de taille reconstruits peuvent être des artefacts. Si on ne le sait pas, on peut facilement tirer de mauvaises conclusions sur l’histoire et l’état actuel de la population.",

    // CHAPITRE 2 – SLIDE 5
    slide5Label: "",
    slide5Title: "Chapitre 2",
    slide5Text:
      "Idéalement, il faudrait tenir compte de la manière dont une population est organisée lorsque l’on tente de reconstituer son histoire à partir de l’ADN. Le problème est que décrire cette organisation en détail demande énormément de calculs et un coût informatique très élevé.\n\nDans cette étude, nous proposons une solution différente basée sur l’intelligence artificielle. À partir des arbres généalogiques obtenus depuis l’ADN, nous construisons une matrice qui en résume l’information.",

    // CHAPITRE 2 – SLIDE 6 (sans titre)
    slide6Label: "",
    slide6Title: "",
    slide6Text:
      "Nous traitons cette matrice comme une image et nous l’analysons avec un système de reconnaissance d’images déjà existant. Cette approche simplifie fortement le processus et permet d’économiser du temps de calcul, de l’énergie et des émissions de CO₂.\n\nDe façon surprenante, un système entraîné à distinguer un chien d’un chat peut aussi apprendre à détecter des motifs génétiques complexes. Grâce à cela, on peut identifier si une population est isolée ou s’il existe des routes de migration entre populations, sans modéliser explicitement toute la complexité du processus évolutif.",

    // CONCLUSION – SLIDE 7
    slide7Label: "",
    slide7Title: "Conclusion",
    slide7Text:
      "Cette thèse étudie le fonctionnement des méthodes SMC lorsque les populations ne sont pas complètement mélangées et présentent une structure interne. Nous montrons que des méthodes comme PSMC et SMC++ peuvent produire des résultats différents selon l’organisation de la population.\n\nNous identifions également des effets liés à la structure des populations qui peuvent sembler être des erreurs, mais qui peuvent fournir des informations utiles lors de l’analyse de données réelles.",

    // CONCLUSION – SLIDE 8 (sans titre)
    slide8Label: "",
    slide8Title: "",
    slide8Text:
      "Nous proposons une méthode basée sur l’intelligence artificielle pour détecter la structure des populations à partir de génomes complets. Cette approche permet de réutiliser des modèles déjà entraînés et de réduire fortement le coût computationnel.\n\nDans l’ensemble, ce travail présente une manière plus efficace d’étudier l’histoire et l’organisation des populations à partir de l’ADN.",

    // CRÉDITS – SLIDE 9
    slide9Label: "",
    slide9Title: "",
    slide9Text:
      'Développé avec ❤️ par David Palacín Giménez.<br><br>' +
      'Contactez-moi à <a href="mailto:palacingimenezdavid.fpllefia@gmail.com">palacingimenezdavid.fpllefia@gmail.com</a>' +
      ' ou sur LinkedIn : <a href="https://www.linkedin.com/in/david-palacin-gimenez/" target="_blank" rel="noopener noreferrer">David Palacín Giménez</a>',

    // QUESTIONS
    questionsLabel: "Questions",
    questionsTitle: "Vous avez des questions ?",
    questionsIntro: "Envoyez vos questions via ce formulaire.",
    labelNombre: "Votre nom (optionnel)",
    labelEmail: "Votre e-mail",
    labelPregunta: "Question",
    submitButton: "Envoyer la question",
    questionsNote:
      "Votre question sera envoyée en toute sécurité à la doctorante.",

    nextSlideHint: "Glissez vers le haut pour voir les crédits",

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

    slide4Label: "slide4Label",
    slide4Title: "slide4Title",
    slide4Text: "slide4Text",

    slide5Label: "slide5Label",
    slide5Title: "slide5Title",
    slide5Text: "slide5Text",

    slide6Label: "slide6Label",
    slide6Title: "slide6Title",
    slide6Text: "slide6Text",

    slide7Label: "slide7Label",
    slide7Title: "slide7Title",
    slide7Text: "slide7Text",

    slide8Label: "slide8Label",
    slide8Title: "slide8Title",
    slide8Text: "slide8Text",

    slide9Text: "slide9Text",


    questionsLabel: "questionsLabel",
    questionsTitle: "questionsTitle",
    questionsIntro: "questionsIntro",

    labelNombre: "labelNombre",
    labelEmail: "labelEmail",
    labelPregunta: "labelPregunta",

    submitButton: "submitButton",
    questionsNote: "questionsNote",
    nextSlideHint: "nextSlideHint",

  };

  Object.keys(map).forEach((key) => {
    const element = document.getElementById(map[key]);

    if (element) {
      element.innerHTML = translations[lang][key].replace(/\n/g, "<br>");
    }

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

    if (!email) {
      alert("Por favor, introduce tu correo electrónico.");
      return;
    }

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
