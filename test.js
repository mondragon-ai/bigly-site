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

document.addEventListener("DOMContentLoaded", (event) => {
  const mainElement = document.querySelector("main");

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
      mainElement.style.paddingBottom = `${sectionHeight * 2}px`;
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
      }, 750); // Adjust delay to match smooth scrolling timing
    }

    handleSectionOne(scrollY, sectionHeight, sections[0], sections[1]);
    // handleSectionTwo(scrollY, sectionHeight, sections[1], sections[2]);
    // handleSectionThree(scrollY, sectionHeight, sections[2], sections[3]);
    // handleServiceSections(scrollY, sectionHeight, sections[3], sections[4], 0);
    // handleServiceSections(scrollY, sectionHeight, sections[4], sections[5], 1);
    // handleServiceSections(scrollY, sectionHeight, sections[5], sections[6], 2);
    // handleApplySection(scrollY, sectionHeight, sections[6], sections[7]);
    // handleTeamSections(scrollY, sectionHeight, sections[7], sections[8]);
  });

  // const cards = document.querySelectorAll(".team .card");
  // const prevButton = document.querySelector(".btns img:first-child");
  // const nextButton = document.querySelector(".btns img:last-child");
  // const cardsPerPage = 4;
  // let currentPage = 0;

  // function updateCards() {
  //   cards.forEach((card, index) => {
  //     if (
  //       index >= currentPage * cardsPerPage &&
  //       index < (currentPage + 1) * cardsPerPage
  //     ) {
  //       card.style.display = "inline-block";
  //     } else {
  //       card.style.display = "none";
  //     }
  //   });
  //   updateButtons();
  // }

  // function updateButtons() {
  //   if (currentPage === 0) {
  //     prevButton.style.opacity = 0.5;
  //     prevButton.style.pointerEvents = "none";
  //   } else {
  //     prevButton.style.opacity = 1;
  //     prevButton.style.pointerEvents = "auto";
  //   }

  //   if ((currentPage + 1) * cardsPerPage >= cards.length) {
  //     nextButton.style.opacity = 0.5;
  //     nextButton.style.pointerEvents = "none";
  //   } else {
  //     nextButton.style.opacity = 1;
  //     nextButton.style.pointerEvents = "auto";
  //   }
  // }

  // nextButton.addEventListener("click", () => {
  //   if ((currentPage + 1) * cardsPerPage < cards.length) {
  //     currentPage++;
  //     updateCards();
  //     nextButton.style.opacity = 1;
  //   }
  // });

  // prevButton.addEventListener("click", () => {
  //   if (currentPage > 0) {
  //     currentPage--;
  //     updateCards();
  //     prevButton.style.opacity = 1;
  //   }
  // });

  // updateCards();

  let isAnimating = false;
  document.querySelector(".main-image").addEventListener("mouseenter", () => {
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
        transform: "translate(90%, 0%) scale(2, 2) translateY(0px)",
      });

      applyStyles(elements.image, {
        opacity: 1,
        transform: "rotate(0deg) scale(1)",
        ["z-index"]: 5,
      });
    },
  },
  ,
  {
    progress: 0.2,
    apply: (elements, progress) => {
      const opacity = calculateFadeOut(progress);

      elements.h1.forEach((header, index) => {
        const translateX = index === 0 ? progress * 250 : progress * 100;
        const transform =
          index === 1
            ? `rotate(350deg) translateX(${translateX}px)`
            : `translateX(${translateX}px)`;
        setOpacityAndTransform(header, opacity * 1.3, transform);
      });

      elements.p.forEach((para, index) => {
        setOpacityAndTransform(
          para,
          opacity * 1.3,
          `translateX(${progress * 170}px)`,
        );
      });

      setOpacityAndTransform(
        elements.bkg,
        1,
        `translate(90%, 0%) scale(2, 2) translateY(${progress * -300}px)`,
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
    apply: (elements, progress) => {
      elements.h1.forEach((header, index) => {
        const translateX = index === 0 ? progress * 250 : progress * 100;
        const transform =
          index === 1
            ? `rotate(350deg) translateX(${translateX}px)`
            : `translateX(${translateX}px)`;
        setOpacityAndTransform(header, 0, transform);
      });

      elements.p.forEach((para) => {
        setOpacityAndTransform(para, 0, `translateX(${progress * 170}px)`);
      });

      const img = `rotate(0deg) scale(0)`;
      applyStyles(elements.image, {
        opacity: 0,
        transform: img,
        ["z-index"]: 0,
      });
    },
  },
];

// Apply Keyframe Animations
const applyKeyframeAnimations = (elements, progress, keyframes) => {
  keyframes.forEach(({progress: keyProgress, apply}) => {
    if (progress >= keyProgress) {
      apply(elements, progress);
    }
  });
};

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

  if (progress > 0 && progress <= 1) {
    next.style.display = "flex";
    next.style.zIndex = 0;
    current.style.zIndex = 2;

    if (progress > 0.2) {
      next.style.zIndex = 2;
      current.style.zIndex = 1;
    }

    // Current section elements / animations
    const cElements = setupElements(current);
    applyKeyframeAnimations(cElements, progress, currElementOne);

    // Next section elements / animations
    const nElements = setupElements(next);

    if (progress > 0.8) {
      setOpacityAndTransform(next, progress * 0.4);
      nElements.h1[0].style.zIndex = 101;

      nElements.h1.forEach((element, index) => {
        const delay = index * 0.05; // Stagger effect

        const effectiveProgress = Math.max(0, progress - delay);
        const y = 100 - effectiveProgress * (100 / 0.8);

        const translateY = Math.max(y, 0);

        setOpacityAndTransform(element, 1, `translateY(${translateY}%)`);
      });
    } else {
      applyStyles(next, {
        opacity: 0,
        transform: "none",
      });
    }
  }
  if (progress >= 1) {
    console.log("GRAT");
    setOpacityAndTransform(next, 1);
  }
};

/**
 * Motto section transitioning to partners section
 * @param {number} scrollY
 * @param {number} height
 * @param {HTML Element} curr
 * @param {HTML Element} next
 */
const handleMottoSection = (scrollY, sectionHeight, current, next = null) => {
  const start = current.offsetTop;
  const end = start + sectionHeight;
  const progress = calculateScrollProgress(scrollY, start, end);

  if (progress > 0 && progress <= 1) {
  }
};
