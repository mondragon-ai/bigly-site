// Get Elements
const setupElements = (section) => ({
  h1: section.querySelectorAll("h1") || null,
  h4: section.querySelectorAll("h4") || null,
  txt: section.querySelector(".txt") || null,
  p: section.querySelectorAll("p") || null,
  bkg: section.querySelector(".bkg") || null,
  image: section.querySelector("div > img") || null,
});

// Set & Reset Styles
const resetSections = (section = null) => {
  const sections = document.querySelectorAll("main section");
  sections.forEach((s) => {
    s.style.opacity = 0;
  });
  if (section) {
    section.style.opacity = 1;
  } else {
    const sectionHeight = getHeight(sections[0]);
    const scroll = window.scrollY;
    const i = Math.round(sectionHeight / (scroll > 0 ? scroll : 1));
    // sections[i].style.opacity = "1";
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
const calculateFadeOut = (scrollY, bottomHeight, multiplier = 1.2) => {
  return Math.max(0, 1 - (scrollY * multiplier) / bottomHeight);
};

// Fade In Opacity
const calculateFadeIn = (progress, multiplier = 1) => {
  return Math.min(1, Math.abs(progress * multiplier));
};

// Generalized Translation Function
const translate = (progress, direction = "top-to-bottom", multiplier = 1) => {
  let value = 0;

  switch (direction) {
    case "top-to-bottom":
      value = progress * -100 * multiplier;
      break;
    case "bottom-to-top":
      value = (1 - progress) * 100 * multiplier;
      break;
    case "left-to-right":
      value = progress * 100 * multiplier;
      break;
    case "right-to-left":
      value = (1 - progress) * -100 * multiplier;
      break;
    default:
      console.error(`Invalid direction: ${direction}`);
  }

  return Number(value.toFixed(2));
};

// Translate Y in PX (Top to Bottom)
const translateY = (progress, direction = "top-to-bottom", multiplier = 1) => {
  return translate(progress, direction, multiplier);
};

// Translate X in PX (Left to Right)
const translateX = (progress, direction = "left-to-right", multiplier = 1) => {
  return translate(progress, direction, multiplier);
};

document.addEventListener("DOMContentLoaded", (event) => {
  const mainElement = document.querySelector("main");

  // Get Sections
  const sections = document.querySelectorAll("main section");

  window.addEventListener("load", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => resetSections(sections[0]), 500);
  });

  // Set Scrollable Height
  const sectionHeight = getHeight(sections[0]);
  mainElement.style.paddingBottom = `${sectionHeight * sections.length}px`;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    handleSectionOne(scrollY, sectionHeight, sections[0], sections[1]);
    handleSectionTwo(scrollY, sectionHeight, sections[1], sections[2]);
    handleSectionThree(scrollY, sectionHeight, sections[2], sections[3]);
    handleServiceSections(scrollY, sectionHeight, sections[3], sections[4], 0);
    handleServiceSections(scrollY, sectionHeight, sections[4], sections[5], 1);
    handleServiceSections(scrollY, sectionHeight, sections[5], sections[6], 2);
    handleApplySection(scrollY, sectionHeight, sections[6], sections[7]);
    handleTeamSections(scrollY, sectionHeight, sections[7], sections[8]);
  });

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

  updateCards();
  let isAnimating = false; // State variable to track animation status

  document.querySelector(".main-image").addEventListener("mouseenter", () => {
    if (isAnimating) return; // Prevent reanimation if already animating
    isAnimating = true; // Set the state to animating
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
    smileyContainer.innerHTML = "";

    for (let i = 0; i < totalSmileys; i++) {
      const smiley = document.createElement("img");
      smiley.src = "/assets/svg/smiley.png";
      smiley.classList.add("smiley");

      // Randomize final positions
      const size = Math.random() * 30 + 10; // Random size between 10px and 40px
      const offsetX =
        (Math.random() - 0.5) * containerRect.width * concentrationFactor;
      const offsetY =
        (Math.random() - 0.5) * containerRect.height * concentrationFactor;
      const rotation = Math.random() * 360; // Random rotation

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
        smiley.style.top = `${Number(centerY + offsetY - size / 2) - 400}px`;
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

// HERO -> MOTTO SECITON
const handleSectionOne = (scrollY, sectionHeight, current, next = null) => {
  const oneTop = sectionHeight * 0;
  const oneBottom = sectionHeight * 1;
  if (scrollY > oneTop && scrollY < oneBottom) {
    const progress = calculateScrollProgress(scrollY, oneTop, oneBottom);
    const opacity = calculateFadeOut(scrollY, oneBottom);

    const elements = setupElements(current);
    if (progress > 0.2) {
      elements.h1.forEach((header, index) => {
        const translateX = index === 0 ? scrollY * 2.5 : scrollY;
        const transform =
          index === 1
            ? `rotate(350deg) translateX(${translateX}px)`
            : `translateX(${translateX}px)`;
        setOpacityAndTransform(header, opacity, transform);
      });
      elements.p.forEach((para, index) => {
        setOpacityAndTransform(para, opacity, `translateX(${scrollY * 1.7}px)`);
      });
      setOpacityAndTransform(
        elements.bkg,
        1,
        `translate(90%, 0%) scale(2, 2) translateY(${scrollY * -0.5}px)`,
      );

      setOpacityAndTransform(
        elements.image,
        opacity,
        `rotate(${Math.round(1 - progress * 360)}deg) scale(${
          1 - progress * 0.5
        })`,
      );
    } else {
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
      });
    }

    const prev = setupElements(next);
    if (progress > 0.8) {
      setOpacityAndTransform(next, progress * 0.4);

      setOpacityAndTransform(
        prev.h1[0],
        progress * 0.4,
        `translateY(${(1 - progress) * -100}%)`,
      );
      if (progress > 0.9) {
        setOpacityAndTransform(next, progress * 0.85);
      }
    } else {
      applyStyles(next, {
        opacity: 0,
        transform: "none",
      });
    }
  }
};

// MOTTO SECITON -> PARTNERS SECTION
const handleSectionTwo = (scrollY, sectionHeight, section, next) => {
  const oneTop = sectionHeight * 1;
  const oneBottom = sectionHeight * 2;
  if (scrollY >= oneTop && scrollY < oneBottom) {
    const progress = calculateScrollProgress(scrollY, oneTop, oneBottom);
    const opacity = calculateFadeOut(scrollY, oneBottom);

    const elements = setupElements(section);
    if (progress > 0.2) {
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
    } else {
      applyStyles(section, {
        opacity: 1,
        transform: "none",
      });
      applyStyles(elements.txt, {
        opacity: 1,
        transform: "none",
      });
      applyStyles(elements.image, {
        opacity: 1,
        transform: "none",
      });
    }

    if (progress > 0.6) {
      setOpacityAndTransform(next, Math.abs(progress));
    } else {
      applyStyles(next, {
        opacity: 0,
        transform: "none",
      });
    }
  }
};

// PARTNERS SECTION -> SERVICE SECTION(S)
let isXReset = true;
const handleSectionThree = (scrollY, sectionHeight, section, next) => {
  const oneTop = sectionHeight * 2;
  const oneBottom = sectionHeight * 3;

  if (scrollY >= oneTop && scrollY < oneBottom) {
    document.querySelector(".sectionThree").style.opacity = 1;
    const progress = calculateScrollProgress(scrollY, oneTop, oneBottom);

    if (isXReset) {
      setOpacityAndTransform(
        next,
        1,
        `translateX(0%) translateY(${(1 - progress) * 100}%)`,
      );
    }
  } else {
    setOpacityAndTransform(next, 1, `translateX(0%) translateY(100%)`);
  }
};

// SERVICE SECTIONS 1 - 4
let isApplyXReset = true;
const handleServiceSections = (scrollY, sectionHeight, section, next, step) => {
  const oneTop = sectionHeight * (3 + step);
  const oneBottom = sectionHeight * (4 + step);

  if (scrollY >= oneTop && scrollY < oneBottom) {
    document.querySelector(".sectionThree").style.opacity = 0;
    const progress = calculateScrollProgress(scrollY, oneTop, oneBottom);
    const opacity = calculateFadeOut(scrollY, oneBottom, 0.9);

    const curr = setupElements(section);
    curr.p.forEach((para) => {
      setOpacityAndTransform(para, 1, `translateX(0px)`);
    });
    setOpacityAndTransform(curr.h1[0], 1, "translateX(0px)");
    if (progress > 0.4) {
      isXReset = false;

      setOpacityAndTransform(
        section,
        opacity,
        `translateX(${((progress - 0.4) * -100) / 0.6}%) translateY(0%)`,
      );
      setOpacityAndTransform(
        next,
        progress * 0.8,
        `translateX(${(1 - progress) * 100}%) translateY(0%)`,
      );

      const elements = setupElements(next);
      if (progress > 0.5) {
        setOpacityAndTransform(
          elements.h1[0],
          1,
          `translateX(${scrollY - oneBottom}px)`,
        );

        elements.p.forEach((para, index) => {
          const translateX =
            index === 0
              ? (scrollY - oneBottom) * 2.5
              : index === 1
              ? (scrollY - oneBottom) * 3.5
              : (scrollY - oneBottom) * 4.5;
          setOpacityAndTransform(para, 1, `translateX(${translateX}px)`);
        });

        setOpacityAndTransform(
          elements.bkg,
          `translateY(${(1 - progress) * -100}%)`,
          Math.abs(progress),
        );
      }
      if (progress > 0.95) {
        setOpacityAndTransform(elements.h1[0], 1, `translateX(0px)`);

        elements.p.forEach((para, index) => {
          setOpacityAndTransform(para, 1, `translateX(0px)`);
        });
      }
    } else {
      setOpacityAndTransform(section, 1, "translateX(0%) translateY(0%)");
      setOpacityAndTransform(next, 1, "translateX(100%) translateY(0%)");
      isXReset = true;
    }
  }
};

// SERVICE -> MEET THE TEAM
const handleApplySection = (scrollY, sectionHeight, section, next) => {
  const oneTop = sectionHeight * 6;
  const oneBottom = sectionHeight * 7;

  const curr = setupElements(next);
  if (scrollY >= oneTop && scrollY <= oneBottom) {
    const progress = calculateScrollProgress(scrollY, oneTop, oneBottom);
    section.style.zIndex = 8;
    next.style.zIndex = 10;

    if (progress < 0.2) {
      cards.forEach((card) => {
        setOpacityAndTransform(
          card,
          1,
          "translateY(100%) rotateX(45deg) rotateZ(-35deg)",
        );
      });
    }
    if (progress <= 0.3) {
      setOpacityAndTransform(next, (progress + 0.4) * 1.5);
      const translateX = -100 + progress * (100 / 0.3);
      setOpacityAndTransform(curr.h1[0], 1, `translateX(${translateX}%)`);
    } else {
      setOpacityAndTransform(curr.h1[0], 1, "translateX(0%)");
    }

    const cards = document.querySelectorAll(".card");
    if (progress >= 0.2 && progress <= 0.8) {
      cards.forEach((card, i) => {
        const delay = i * 0.3;
        const effectiveProgress = Math.max(0, progress - delay);
        const y = 100 - effectiveProgress * (100 / 0.8);

        const translateY = Math.max(y, 0);

        setOpacityAndTransform(
          card,
          1,
          `translateY(${translateY}%) rotateX(45deg) rotateZ(-35deg)`,
        );
      });
    }
    if (progress > 0.8) {
      cards.forEach((card) => {
        setOpacityAndTransform(
          card,
          1,
          "translateY(0%) rotateX(45deg) rotateZ(-35deg)",
        );
      });
    }
    if (progress > 0.9) {
      setOpacityAndTransform(section, 0);
    }
  } else {
    setOpacityAndTransform(next, 0, `translateX(0%) translateY(0%)`);
  }
};

// MEET THE TEAM -> APPLY
const handleTeamSections = (scrollY, sectionHeight, section, next) => {
  const oneTop = sectionHeight * 7;
  const oneBottom = sectionHeight * 8;

  const elements = setupElements(next);
  if (scrollY >= oneTop && scrollY <= oneBottom) {
    setOpacityAndTransform(section, 1);
    const progress = calculateScrollProgress(scrollY, oneTop, oneBottom);
    const opacity = calculateFadeOut(scrollY, oneBottom, 0.6);
    next.style.zIndex = 10;

    if (progress > 0.3) {
      applyStyles(section, {
        opacity,
        transform: `translateX(0%) scale(${1 - progress})`,
        filter: "blur(8px)",
        ["box-shadow"]: "0px 0px 20px 20px #ffdada",
      });
    } else {
      applyStyles(section, {
        opacity: 1,
        transform: `translateX(0%) scale(1)`,
        filter: "blur(0px)",
        ["box-shadow"]: "0px 0px 0px 0px transparent",
      });
    }

    if (progress > 0.5) {
      const xLeft = -100 + progress * 100;
      setOpacityAndTransform(elements.h1[0], 1, `translateX(${xLeft}%)`);
      const yUp = -100 + progress * 100;
      setOpacityAndTransform(elements.h4[0], 1, `translateY(${yUp}%)`);
      const yDown = 60 - (progress - 0.5) * 120;
      setOpacityAndTransform(
        document.querySelector("#apply"),
        1,
        `translateY(${yDown}%)`,
      );
    }
    setOpacityAndTransform(
      next,
      1,
      `translateX(0%) translateY(${(1 - progress) * 100}%)`,
    );
    if (progress > 0.95) {
      setOpacityAndTransform(next, 1, `translateX(0%) translateY(0%)`);
    }
  } else {
    setOpacityAndTransform(next, 1, `translateX(0%) translateY(100%)`);
    // setOpacityAndTransform(section, 0);
  }
};
