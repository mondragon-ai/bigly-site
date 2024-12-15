// Get Elements
const setupElements = (section) => ({
  h1: section.querySelectorAll("h1") || null,
  h4: section.querySelectorAll("h4") || null,
  txt: section.querySelector(".txt") || null,
  p: section.querySelectorAll("p") || null,
  bkg: section.querySelector(".bkg") || null,
  image: section.querySelector("div > img") || null,
});

// Section Reset and Style Functions
const resetSections = (activeSection = null) => {
  const sections = document.querySelectorAll("main section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  if (activeSection) {
    activeSection.style.display = "flex";
  } else if (sections.length > 0) {
    const firstSection = sections[0];
    const sectionHeight = getHeight(firstSection);
    const scroll = window.scrollY;
    const index = Math.round(scroll / (sectionHeight || 1));
    if (sections[index]) sections[index].style.display = "flex";
  }
};

const applyStyles = (element, styles) => {
  Object.entries(styles).forEach(([property, value]) => {
    if (element) element.style[property] = value;
  });
};

// Set Animation
const setOpacityAndTransform = (element, opacity, transform = "none") => {
  applyStyles(element, {opacity, transform});
};

// Get Section Height
const getHeight = (section) => {
  return section.getBoundingClientRect().height;
};

// Calc Section Progress
const calculateScrollProgress = (scrollTop, start, end) => {
  if (scrollTop < start) return 0;
  if (scrollTop > end) return 1;
  return (scrollTop - start) / (end - start);
};

// Fade Out Opacity

const calculateFadeOut = (progress, multiplier = 1) => {
  return Math.max(0, 1 - progress * multiplier);
};

// Apply Keyframe Animations
const applyKeyframeAnimations = (elements, progress, keyframes) => {
  keyframes.forEach(({progress: keyProgress, apply}) => {
    if (progress >= keyProgress) {
      apply(elements, progress);
    }
  });
};

/**
 * Calculate the translate value based on section progress
 * @param {number} progress - The progress of the section (0 to 1)
 * @param {number} startPosition - The starting position for the translate effect
 * @param {number} endPosition - The ending position for the translate effect
 * @param {number} speed - The speed multiplier for the animation
 * @returns {number} - The calculated translate value
 */
const calculateTranslate = (
  progress,
  startPosition,
  endPosition,
  speed = 1,
) => {
  if (progress <= 0) return startPosition;
  if (progress >= 1) return endPosition;
  return startPosition + (endPosition - startPosition) * progress * speed;
};

/**
 * Interpolate between two colors based on progress
 * @param {number} progress - The progress of the transition (0 to 1)
 * @param {string} startColor - The starting color in RGB format (e.g., "rgb(255, 255, 255)")
 * @param {string} endColor - The ending color in RGB format (e.g., "rgb(0, 0, 0)")
 * @returns {string} - The calculated intermediate color
 */
const calculateColorTransition = (progress, startColor, endColor) => {
  const parseRGB = (color) =>
    color.replace("rgb(", "").replace(")", "").split(", ").map(Number);

  const [r1, g1, b1] = parseRGB(startColor);
  const [r2, g2, b2] = parseRGB(endColor);

  const r = Math.round(r1 + (r2 - r1) * progress);
  const g = Math.round(g1 + (g2 - g1) * progress);
  const b = Math.round(b1 + (b2 - b1) * progress);

  return `rgb(${r}, ${g}, ${b})`;
};

document.addEventListener("DOMContentLoaded", (event) => {
  const mainElement = document.querySelector("main");

  const cards = document.querySelectorAll(".team .card");
  const prevButton = document.querySelector(".btns img:first-child");
  const nextButton = document.querySelector(".btns img:last-child");
  const cardsPerPage = 4;
  let currentPage = 0;

  function updateCards() {
    cards.forEach((card, index) => {
      if (
        index >= currentPage * cardsPerPage &&
        index < (currentPage + 1) * cardsPerPage
      ) {
        card.style.display = "inline-block";
      } else {
        card.style.display = "none";
      }
    });
    updateButtons();
  }

  function updateButtons() {
    if (currentPage === 0) {
      prevButton.style.opacity = 0.5;
      prevButton.style.pointerEvents = "none";
    } else {
      prevButton.style.opacity = 1;
      prevButton.style.pointerEvents = "auto";
    }

    if ((currentPage + 1) * cardsPerPage >= cards.length) {
      nextButton.style.opacity = 0.5;
      nextButton.style.pointerEvents = "none";
    } else {
      nextButton.style.opacity = 1;
      nextButton.style.pointerEvents = "auto";
    }
  }

  nextButton.addEventListener("click", () => {
    if ((currentPage + 1) * cardsPerPage < cards.length) {
      currentPage++;
      updateCards();
      nextButton.style.opacity = 1;
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      updateCards();
      prevButton.style.opacity = 1;
    }
  });

  // Get Sections
  const sections = document.querySelectorAll("main section");
  let sectionHeight = 0;

  window.addEventListener("load", async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => resetSections(sections[0]), 500);

    setTimeout(() => {
      // Set Scrollable Height
      sectionHeight = getHeight(sections[0]);
      mainElement.style.paddingBottom = `${sectionHeight * 11}px`;
    }, 700);
  });

  // Function to calculate the closest section based on scroll position
  const getClosestSectionIndex = (scrollY) => {
    return Math.round(scrollY / sectionHeight);
  };

  // Function to snap to the closest section
  const snapToSection = () => {
    const scrollY = window.scrollY;
    const closestSectionIndex = getClosestSectionIndex(scrollY);
    const targetPosition = closestSectionIndex * sectionHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  let isThrottling = false;
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (!isThrottling) {
      isThrottling = true;

      setTimeout(() => {
        snapToSection();
        isThrottling = false;
      }, 1000);
    }

    handleSectionOne(scrollY, sectionHeight, sections[0], sections[1]);
    handleMottoSection(scrollY, sectionHeight, sections[1], sections[2]);
    handlePartnersSection(scrollY, sectionHeight, sections[2], sections[3]);
    handleFloatSection(scrollY, sectionHeight, sections[3], sections[4]);
    handleServiceSections(scrollY, sectionHeight, sections[4], sections[5], 0);
    handleServiceSections(scrollY, sectionHeight, sections[5], sections[6], 1);
    handleServiceSections(scrollY, sectionHeight, sections[6], sections[7], 2);
    handleTeamSections(scrollY, sectionHeight, sections[7], sections[8]);
    handleApplySections(scrollY, sectionHeight, sections[8], sections[9]);
  });

  updateCards();

  document.querySelectorAll(".main-image").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      // if (isAnimating) return;
      isAnimating = true;
      const smileyContainer = document.querySelector(".explode-container");
      const mainImage = document.querySelector(".main-image");

      smileyContainer.style.zIndex = 101;

      // Get the dimensions and position of the main-image
      const mainImageRect = mainImage.getBoundingClientRect();
      const containerRect = smileyContainer.getBoundingClientRect();

      // Calculate the center of the main-image relative to the explode-container
      const centerX =
        mainImageRect.left + mainImageRect.width / 2 - containerRect.left;
      const centerY =
        mainImageRect.top + mainImageRect.height / 2 - containerRect.top;

      const totalSmileys = 10;
      const concentrationFactor = 0.2;

      // Clear existing smileys (optional, in case of multiple hovers)
      // smileyContainer.innerHTML = "";

      for (let i = 0; i < totalSmileys; i++) {
        const smiley = document.createElement("img");
        smiley.src = "/assets/svg/smiley.png";
        smiley.classList.add("smiley");

        // Randomize final positions
        const size = Math.random() * 30 + 10;
        const offsetX = (Math.random() - 0.5) * containerRect.width * 0.5;
        const offsetY =
          (Math.random() - 0.5) * containerRect.height * concentrationFactor;
        const rotation = Math.random() * 360;

        // Start at the center of the triggering image
        smiley.style.width = `${size}px`;
        smiley.style.height = `${size}px`;
        smiley.style.left = `${centerX - size / 2}px`;
        smiley.style.top = `${centerY - size / 2}px`;
        smiley.style.transform = `scale(0) rotate(${rotation}deg)`;

        smileyContainer.appendChild(smiley);

        // Animate to the randomized position
        setTimeout(() => {
          smiley.style.left = `${centerX + offsetX - size / 2}px`;
          smiley.style.top = `${Number(centerY + offsetY - size / 2) - 600}px`;
          smiley.style.transform = `scale(${
            (Math.random() * 10) / 2
          }) rotate(${rotation}deg)`;
        }, 10);

        // Remove element after animation
        setTimeout(() => {
          isAnimating = false; // Allow animations again
          smiley.remove();
          smileyContainer.style.zIndex = 1;
        }, 2000);
      }
    });
  });
});

// Section One Elements
const currElementOne = [
  {
    progress: 0,
    apply: (elements, progress) => {
      elements.h1.forEach((header, index) => {
        const transform =
          index === 1
            ? `rotate(350deg) translateX(${0}px)`
            : `translateX(${0}px)`;

        applyStyles(header, {opacity: 1, transform});
      });

      elements.p.forEach((para, index) => {
        applyStyles(para, {opacity: 1, transform: "translateX(0px)"});
      });

      applyStyles(elements.bkg, {
        opacity: 1,
        transform: "translate(90%, 0%) scale(2, 2) translateY(0%)",
      });

      applyStyles(elements.image, {
        opacity: 1,
        transform: "rotate(0deg) scale(1)",
        ["z-index"]: 5,
      });
    },
  },
  {
    progress: 0.2,
    apply: (elements, progress) => {
      const opacity = calculateFadeOut(progress);

      elements.h1.forEach((header, index) => {
        const multiplier = index === 0 ? 2.5 : 1;
        const translateX = calculateTranslate(progress, 0, 200, multiplier);
        const transform =
          index === 1
            ? `rotate(350deg) translateX(${calculateTranslate(
                progress,
                0,
                500,
                1,
              )}%)`
            : `translateX(${translateX}%)`;
        setOpacityAndTransform(header, opacity * 1.7, transform);
      });

      elements.p.forEach((para) => {
        const translateX = calculateTranslate(progress, 0, 200, 1.3);
        setOpacityAndTransform(
          para,
          opacity * 1.3,
          `translateX(${translateX}%)`,
        );
      });

      setOpacityAndTransform(
        elements.bkg,
        1,
        `translate(90%, 0%) scale(2, 2) translateY(${calculateTranslate(
          progress,
          0,
          -20,
          1,
        )}%)`,
      );

      const img = `rotate(${1 - progress * 360}deg) scale(${opacity * 0.3})`;
      applyStyles(elements.image, {
        opacity: 1,
        transform: img,
        ["z-index"]: 5,
      });
    },
  },
  {
    progress: 0.95,
    apply: (elements) => {
      const img = `rotate(0deg) scale(0)`;
      applyStyles(elements.image, {
        opacity: 0,
        transform: img,
        ["z-index"]: 0,
      });
    },
  },
];

const lastTranslations = [];

/**
 * Hero section transitioning to "motto" section
 * @param {number} scrollY
 * @param {number} height
 * @param {HTML Element} curr
 * @param {HTML Element} next
 */
const handleSectionOne = (scrollY, sectionHeight, current, next = null) => {
  const start = current.offsetTop;
  const end = start + sectionHeight;
  const progress = calculateScrollProgress(scrollY, start, end);

  // Current section elements / animations
  const cElements = setupElements(current);

  // Next section elements / animations
  const nElements = setupElements(next);

  if (progress > 0 && progress <= 1) {
    next.style.display = "flex";
    next.style.zIndex = 0;
    current.style.zIndex = 2;

    if (progress > 0.2) {
      next.style.zIndex = 2;
      current.style.zIndex = 1;
    }

    applyKeyframeAnimations(cElements, progress, currElementOne);

    if (progress > 0.6) {
      setOpacityAndTransform(next, progress);
      nElements.h1[0].style.zIndex = 101;
      const y = calculateTranslate(progress, 60, 0, 1);
      setOpacityAndTransform(nElements.p[0], 1, `translateY(${y}%)`);
    } else {
      applyStyles(next, {
        opacity: 0,
        transform: "none",
      });
    }
  }

  if (progress >= 1) {
    setOpacityAndTransform(next, 1);
  }

  if (progress > 0.6) {
    setOpacityAndTransform(next, progress);
    nElements.h1[0].style.zIndex = 101;

    nElements.h1.forEach((element, index) => {
      if (index === 0) return; // Skip the first h1

      const offset = index * 50; // Adjust based on spacing between h1s
      const effectiveProgress = Math.min(
        1,
        Math.max(0, progress - index * 0.1),
      );
      const translateY = offset * (1 - effectiveProgress);

      lastTranslations[index] = translateY;

      element.style.transform = `translateY(-${translateY}px)`;
      element.style.opacity = translateY === 0 ? 0 : 1;
    });
  }
};

const currElTwo = [
  {
    progress: 0,
    apply: (elements, progress) => {
      applyStyles(elements.txt, {
        opacity: 1,
        transform: "none",
      });
      applyStyles(elements.image, {
        opacity: 1,
        transform: "none",
      });
    },
  },
  {
    progress: 0.2,
    apply: (elements, progress) => {
      const opacity = calculateFadeOut(progress);
      setOpacityAndTransform(
        elements.txt,
        opacity,
        `scale(${1 - progress * 0.2})`,
      );

      setOpacityAndTransform(
        elements.image,
        opacity,
        `scale(${1 - progress * 0.2})`,
      );

      elements.h1.forEach((element, index) => {
        if (index === 0) return;

        const translateY = calculateTranslate(
          progress,
          lastTranslations[index],
          0,
          1,
        );
        element.style.transform = `translateY(-${translateY}%)`;
        element.style.opacity = translateY === 0 ? 0 : 1;
      });
    },
  },
];

/**
 * Motto section transitioning to partners section
 * @param {number} scrollY
 * @param {number} height
 * @param {HTML Element} curr
 * @param {HTML Element} next
 */
const handleMottoSection = (scrollY, sectionHeight, current, next = null) => {
  const start = sectionHeight * 1;
  const end = sectionHeight * 2;
  const progress = calculateScrollProgress(scrollY, start, end);

  // Current section elements / animations
  const cElements = setupElements(current);
  const bear = document.querySelector(".bigly-logo");

  if (progress == 0) {
    // setOpacityAndTransform(section, 1);
    applyStyles(cElements.txt, {
      opacity: 1,
      transform: "none",
    });
    applyStyles(bear, {
      transform: "translateX(-50%) scale(500) rotate(350deg)",
      ["z-index"]: 100,
      position: "relative",
      opacity: 1,
    });
  }

  if (progress > 0 && progress <= 1) {
    document.querySelector(".sectionOne").style.zIndex = 1;
    document.querySelector(".sectionOne").style.display = "flex";
    next.style.display = "flex";
    next.style.zIndex = 0;
    current.style.zIndex = 1;

    if (progress > 0.2) {
      next.style.zIndex = 2;
      current.style.zIndex = 1;
    }

    applyKeyframeAnimations(cElements, progress, currElTwo);

    if (progress > 0.4) {
      setOpacityAndTransform(next, Math.abs(progress));

      const x = calculateTranslate(progress, 20, 0, 1);
      const scale = calculateTranslate(progress, 500, 0.5, 1);

      applyStyles(bear, {
        transform: `translateX(-${x}%) scale(${Math.max(
          scale,
          0.7,
        )})  rotate(350deg)`,
        ["z-index"]: 100,
        position: "relative",
        opacity: 0.8,
      });
    } else {
      applyStyles(next, {
        opacity: 0,
        transform: "none",
      });
    }
    if (progress > 0.95) {
      // document.querySelector
      resetSections(next);
    }
  }
};

const currElThree = [
  {
    progress: 0,
    apply: (elements, progress) => {
      const bear = document.querySelector(".bigly-logo");
      const logos = document.querySelectorAll(".tilting");

      applyStyles(bear, {
        transform: "translateX(0%) scale(0.7) rotate(350deg);",
        ["z-index"]: 100,
        position: "relative",
        opacity: 0.8,
        filter: `blur(0px)`,
      });

      logos.forEach((logo) => {
        setOpacityAndTransform(logo, 1);
      });

      elements.h1.forEach((h) => {
        setOpacityAndTransform(h, 1);
      });
    },
  },
  {
    progress: 0.3,
    apply: (elements, progress) => {
      const bear = document.querySelector(".bigly-logo");
      const logos = document.querySelectorAll(".tilting");
      const opacity = calculateFadeOut(progress, 2);

      const x = calculateTranslate(progress, 0, 200, 1);
      applyStyles(bear, {
        transform: `translateX(-${x}%) scale(1.5) rotate(360deg)`,
        ["z-index"]: 100,
        position: "relative",
        opacity: 1,
        filter: `blur(0px)`,
      });

      elements.h1.forEach((h) => {
        setOpacityAndTransform(h, opacity);
      });

      logos.forEach((logo) => {
        setOpacityAndTransform(logo, 0);
      });
    },
  },
];

/**
 * Partners section transitioning to buffer section
 * @param {number} scrollY
 * @param {number} height
 * @param {HTML Element} curr
 * @param {HTML Element} next
 */
const handlePartnersSection = (
  scrollY,
  sectionHeight,
  current,
  next = null,
) => {
  const start = sectionHeight * 2;
  const end = sectionHeight * 3;
  const progress = calculateScrollProgress(scrollY, start, end);

  // Current section elements / animations
  const cElements = setupElements(current);

  if (progress > 0 && progress <= 1) {
    applyKeyframeAnimations(cElements, progress, currElThree);
    const opacity = calculateFadeOut(progress, 2);
    const backgroundColor = calculateColorTransition(
      progress,
      "rgb(255, 255, 255)", // White
      "rgb(0, 0, 0)", // Black
    );

    if (progress > 0.3) {
      document.querySelector("#topography").style.opacity = opacity;
      current.style.background = backgroundColor;
    } else {
      document.querySelector("#topography").style.opacity = 0.8;
      current.style.background = "#f3f3f3";
    }
  }
};

const serviceOneAnimation = [
  {
    progress: 0.5,
    apply: (elements, progress) => {
      const x = calculateTranslate(progress, -100, 0, 1);
      elements.h1.forEach((h) => {
        setOpacityAndTransform(h, 1, `translateX(${x}%)`);
      });

      elements.p.forEach((para, index) => {
        const multipler = index === 0 ? 2.5 : index === 1 ? 3.5 : 4.5;
        setOpacityAndTransform(para, 1, `translateX(${x * multipler}%)`);
      });

      const y = calculateTranslate(progress, 100, 0, 1);
      setOpacityAndTransform(
        elements.bkg,
        Math.abs(progress),
        `translateY(${y}%)`,
      );
    },
  },
];

/**
 * Flaot section transitioning to Service section
 * @param {number} scrollY
 * @param {number} height
 * @param {HTML Element} curr
 * @param {HTML Element} next
 */
const handleFloatSection = (scrollY, sectionHeight, current, next = null) => {
  const start = sectionHeight * 3;
  const end = sectionHeight * 4;
  const progress = calculateScrollProgress(scrollY, start, end);
  const opacity = calculateFadeOut(progress, 1.2);

  // Current section elements / animations
  const nElements = setupElements(next);

  const bear = document.querySelector(".bigly-logo");
  if (progress > 0 && progress <= 1) {
    if (progress > 0.1) {
      const scale = calculateTranslate(progress, 1, 2.5, 1);
      const blur = calculateTranslate(progress, 0, 10, 1);
      applyStyles(bear, {
        transform: `translateX(-200%) scale(${scale}) rotate(360deg)`,
        ["z-index"]: 4,
        position: "relative",
        opacity: opacity,
        filter: `blur(${blur}px)`,
      });

      const nextBlur = calculateTranslate(progress, 13, 0, 1);
      const nextScale = calculateTranslate(progress, 0.2, 1, 1);
      if (progress > 0.4) {
        applyStyles(next, {
          transform: `scale(${nextScale})`,
          ["z-index"]: 10,
          display: "flex",
          opacity: progress * 1.5,
          filter: `blur(${nextBlur}px)`,
        });
      }
      applyKeyframeAnimations(nElements, progress, serviceOneAnimation);
    } else {
      applyStyles(bear, {
        transform: `translateX(-200%) scale(${1}) rotate(360deg)`,
        ["z-index"]: 4,
        position: "relative",
        opacity: opacity,
        filter: `blur(0px)`,
      });
    }
  }
};

const serviceTwoAnimation = [
  {
    progress: 0.5,
    apply: (elements, progress) => {
      const x = calculateTranslate(progress, -100, 0, 1);
      elements.h1.forEach((h) => {
        setOpacityAndTransform(h, 1, `translateX(${x}%)`);
      });

      elements.p.forEach((para, index) => {
        const multipler = index === 0 ? 2.5 : index === 1 ? 3.5 : 4.5;
        setOpacityAndTransform(para, 1, `translateX(${x * multipler}%)`);
      });

      const y = calculateTranslate(progress, -100, 0, 1);
      setOpacityAndTransform(
        elements.bkg,
        Math.abs(progress),
        `translateY(${y}%)`,
      );
    },
  },
];

/**
 * SERVICE SECTIONS 1 - 4
 * @param {number} scrollY
 * @param {number} height
 * @param {HTML Element} curr
 * @param {HTML Element} next
 */
let isApplyXReset = true;
const handleServiceSections = (scrollY, sectionHeight, current, next, step) => {
  const start = sectionHeight * (4 + step);
  const end = sectionHeight * (5 + step);
  const progress = calculateScrollProgress(scrollY, start, end);
  const opacity = calculateFadeOut(progress, 1);

  // Current section elements / animations
  const nElements = setupElements(next);

  if (progress > 0 && progress <= 1) {
    if (progress > 0.4) {
      const currX = calculateTranslate(progress, 0, -100, 0.6);
      setOpacityAndTransform(current, opacity, `translateX(${currX}%)`);

      const nextX = calculateTranslate(progress, 100, 0, 1);
      applyStyles(next, {
        opacity: progress * 1.2,
        transform: `translateX(${nextX}%)`,
        ["z-index"]: 10,
        display: "flex",
      });

      applyKeyframeAnimations(nElements, progress, serviceTwoAnimation);
    }
  }
};

/**
 * Last Service Section transition to Team service
 * @param {number} scrollY
 * @param {number} height
 * @param {HTML Element} curr
 * @param {HTML Element} next
 */
const handleTeamSections = (scrollY, sectionHeight, current, next) => {
  const start = sectionHeight * 7;
  const end = sectionHeight * 8;
  const progress = calculateScrollProgress(scrollY, start, end);
  const opacity = calculateFadeOut(progress, 1);

  // Current section elements / animations
  const nElements = setupElements(next);

  if (progress > 0 && progress <= 1) {
    if (progress > 0.4) {
      next.style.display = "flex";
      next.style.zIndex = 11;
      const currY = calculateTranslate(progress, 0, -100, 1.2);
      setOpacityAndTransform(current, opacity * 0.35, `translateY(${currY}%)`);

      const x = calculateTranslate(progress, -200, 0, 1);
      setOpacityAndTransform(
        nElements.h1[0],
        progress * 1.35,
        `translateX(${x}%)`,
      );

      const cards = document.querySelectorAll(".card");
      let count = 0;
      cards.forEach((card, i) => {
        const computedStyle = window.getComputedStyle(card);
        if (computedStyle.display === "block") {
          const delay = count * 0.5;
          const y = calculateTranslate(progress, 200, 0, delay);

          const translateY = Math.max(y, 0);

          setOpacityAndTransform(
            card,
            1,
            `translateY(${translateY}%) rotateX(45deg) rotateZ(-35deg)`,
          );
          count = count + 1;
        }
      });

      setOpacityAndTransform(next, progress * 0.6);
    }
  }

  if (progress >= 1) {
    setOpacityAndTransform(next, 1);
  }
};

const applyAnimaiton = [
  {
    progress: 0.5,
    apply: (elements, progress) => {
      const xLeft = calculateTranslate(progress, -120, 0, 1);
      setOpacityAndTransform(elements.h1[0], 1, `translateX(${xLeft}%)`);

      const yUp = calculateTranslate(progress, -70, 0, 1);
      setOpacityAndTransform(elements.h4[0], 1, `translateY(${yUp}%)`);

      const yDown = calculateTranslate(progress, 70, 0, 1);
      setOpacityAndTransform(
        document.querySelector("#apply"),
        1,
        `translateY(${yDown}%)`,
      );

      const scale = calculateTranslate(progress, 2, 1, 1);
      setOpacityAndTransform(elements.bkg, 0.2, `scale(${scale})`);
    },
  },
];

/**
 * Team Service Section transition to Apply service
 * @param {number} scrollY
 * @param {number} height
 * @param {HTML Element} curr
 * @param {HTML Element} next
 */
const handleApplySections = (scrollY, sectionHeight, current, next) => {
  const start = sectionHeight * 8;
  const end = sectionHeight * 9;
  const progress = calculateScrollProgress(scrollY, start, end);
  const opacity = calculateFadeOut(progress, 1);

  // Current section elements / animations
  const nElements = setupElements(next);

  if (progress > 0 && progress <= 1) {
    console.log(progress);

    if (progress > 0.5) {
      next.style.display = "flex";
      next.style.zIndex = 11;

      const scale = calculateTranslate(progress, 1, 0, 0.5);
      const blur = calculateTranslate(progress, 0, 15, 1.3);
      applyStyles(current, {
        transform: `scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        ["box-shadow"]: "0px 0px 20px 20px #ffbbbb",
      });

      setOpacityAndTransform(next, progress);

      applyKeyframeAnimations(nElements, progress, applyAnimaiton);
    } else {
      applyStyles(current, {
        transform: `scale(1)`,
        opacity: 1,
        filter: `blur(0px)`,
        ["box-shadow"]: "0px 0px 0px 0px #transparent",
      });
    }
  }
};
