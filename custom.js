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

const scrollToHref = (href, sectionHeight) => {
  console.log(href, sectionHeight);
  switch (href) {
    case "service": {
      window.scrollTo({
        top: sectionHeight * 4,
        behavior: "smooth",
      });
      break;
    }
    case "ecom": {
      window.scrollTo({
        top: sectionHeight * 4,
        behavior: "smooth",
      });
      break;
    }
    case "marketing": {
      window.scrollTo({
        top: sectionHeight * 5,
        behavior: "smooth",
      });
      break;
    }
    case "growth": {
      window.scrollTo({
        top: sectionHeight * 6,
        behavior: "smooth",
      });
      break;
    }
    case "partner": {
      window.scrollTo({
        top: sectionHeight * 7,
        behavior: "smooth",
      });
      break;
    }
    case "apply": {
      window.scrollTo({
        top: sectionHeight * 10,
        behavior: "smooth",
      });
      break;
    }

    default:
      break;
  }
};

document.addEventListener("DOMContentLoaded", (event) => {
  const mainElement = document.querySelector("main");
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const wholesale = document.getElementById("wholesale");
  const influencer = document.getElementById("influencer");
  const apply = document.getElementById("apply");
  const form = document.querySelector(".contactWrapper");

  var random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var particles = 10,
    spread = 40,
    sizeMin = 3,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -0.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = 0.13,
    dyMax = 0.18,
    dThetaMin = 0.4,
    dThetaMax = 0.7 - dThetaMin;

  var colorThemes = [
    function () {
      return color(
        (200 * random()) | 0,
        (200 * random()) | 0,
        (200 * random()) | 0,
      );
    },
    function () {
      var black = (200 * random()) | 0;
      return color(200, black, black);
    },
    function () {
      var black = (200 * random()) | 0;
      return color(black, 200, black);
    },
    function () {
      var black = (200 * random()) | 0;
      return color(black, black, 200);
    },
    function () {
      return color(200, 100, (200 * random()) | 0);
    },
    function () {
      return color((200 * random()) | 0, 200, 200);
    },
    function () {
      var black = (256 * random()) | 0;
      return color(black, black, black);
    },
    function () {
      return colorThemes[random() < 0.5 ? 1 : 2]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 3 : 5]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 2 : 4]();
    },
  ];

  function color(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // Cosine interpolation
  function interpolation(a, b, t) {
    return ((1 - cos(PI * t)) / 2) * (b - a) + a;
  }

  // Create a 1D Maximal Poisson Disc over [0, 1]
  var radius = 1 / eccentricity,
    radius2 = radius + radius;
  function createPoisson() {
    // domain is the set of points which are still available to pick from
    // D = union{ [d_i, d_i+1] | i is even }
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i,
        l,
        interval,
        a,
        b,
        c,
        d;

      // Find where dart lies
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        (a = domain[i]), (b = domain[i + 1]), (interval = b - a);
        if (dart < measure + interval) {
          spline.push((dart += a - measure));
          break;
        }
        measure += interval;
      }
      (c = dart - radius), (d = dart + radius);

      // Update the domain
      for (i = domain.length - 1; i > 0; i -= 2) {
        (l = i - 1), (a = domain[l]), (b = domain[i]);
        // c---d          c---d  Do nothing
        //   c-----d  c-----d    Move interior
        //   c--------------d    Delete interval
        //         c--d          Split interval
        //       a------b
        if (a >= c && a < d)
          if (b > d) domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2);
        // Delete interval
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
      }

      // Re-measure the domain
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  // Create the overarching container
  var container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "0";
  container.style.overflow = "visible";
  container.style.zIndex = "9999";

  // Confetto constructor
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement("div");
    this.inner = document.createElement("div");
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = "absolute";
    outerStyle.width = sizeMin + sizeMax * random() + "px";
    outerStyle.height = sizeMin + sizeMax * random() + "px";
    innerStyle.width = "100%";
    innerStyle.height = "100%";
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = "50px";
    outerStyle.transform = "rotate(" + 360 * random() + "deg)";
    this.axis =
      "rotate3D(" + cos(360 * random()) + "," + cos(360 * random()) + ",0,";
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + "deg)";

    this.x = window.innerWidth * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + "px";
    outerStyle.top = this.y + "px";

    // Create the periodic spline
    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      // Compute spline and convert to polar
      var phi = (this.frame % 7777) / 7777,
        i = 0,
        j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i]),
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + "px";
      outerStyle.top = this.y + rho * sin(phi) + "px";
      innerStyle.transform = this.axis + this.theta + "deg)";
      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      // Append the container
      document.body.appendChild(container);

      // Add confetti
      var theme = colorThemes[0],
        count = 0;
      (function addConfetto() {
        var confetto = new Confetto(theme);
        confetti.push(confetto);
        container.appendChild(confetto.outer);
        timer = setTimeout(addConfetto, spread * random());
      })(0);

      // Start the loop
      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = window.innerHeight;

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return (frame = requestAnimationFrame(loop));

        // Cleanup
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  [wholesale, influencer].forEach((e) => {
    if (!e) return;
    e.addEventListener("click", (event) => {
      event.preventDefault();
      const id = e.getAttribute("id");

      if ("wholesale" == id) {
        influencer.classList.remove("active");
        e.classList.add("active");
      } else {
        wholesale.classList.remove("active");
        e.classList.add("active");
      }
    });
  });

  apply.addEventListener("click", async () => {
    const state = {
      first_name: document.getElementById("first_name").value || "",
      last_name: document.getElementById("last_name").value || "",
      email: document.getElementById("email").value || "",
      phone: "",
      note: document.getElementById("notes").value || "",
    };

    const setLoading = (isLoading) => {
      if (isLoading) {
        apply.disabled = true;
        apply.classList.add("loading");
        apply.innerHTML = "Loading";
      } else {
        apply.disabled = true;
        apply.classList.remove("loading");
        apply.innerHTML = "Submit Applicaiton";
      }
    };

    const submit = (isSuccess) => {
      if (isSuccess) {
        form.innerHTML = "<h1>We will be in touch soon!</h1>";
        poof();
      }
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://us-central1-bigly-server.cloudfunctions.net/forms/influencers/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: state.first_name || "",
            last_name: state.last_name || "",
            email: state.email || "",
            phone: state.phone || null,
            note: state.note || "",
          }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (data && data.ok) {
        setLoading(false);
        submit(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      submit(true);
    } finally {
      setLoading(false);
      submit(true);
    }
  });

  console.log(
    "%c BIGLY ",
    "font-size: 40px; font-weight: bold; color: #e71d36; text-shadow: 2px 2px 0 #000, 4px 4px 0 #f4d35e, 6px 6px 0 #28a745;",
  );
  console.log(
    "%c Where bold ideas ignite growth.",
    "font-size: 16px; color: #555;",
  );
  // Creator credit
  console.log(
    "%c Created by Angel Mondragon ",
    "font-size: 14px; font-style: italic; color: #007BFF; text-shadow: 1px 1px 0 #000; border: 1px solid #007BFF; padding: 4px; border-radius: 4px;",
  );

  // Get Sections
  const sections = document.querySelectorAll("main section");
  let sectionHeight = 0;

  // Check for the `section` query parameter in the URL
  const params = new URLSearchParams(window.location.search);
  const targetSection = params.get("section");
  console.log(targetSection);
  if (targetSection) {
    setTimeout(() => scrollToHref(targetSection, sectionHeight), 2000);
  }

  const navList = document.querySelectorAll("a");
  navList.forEach((e) => {
    e.addEventListener("click", (event) => {
      // event.preventDefault();
      const href = e.getAttribute("href");
      if (href.startsWith("#")) {
        scrollToHref(href.slice(1), sectionHeight);
      }
    });
  });

  const cards = document.querySelectorAll(".team .card");
  const prevButton = document.querySelector(".btns img:first-child");
  const nextButton = document.querySelector(".btns img:last-child");
  const cardsPerPage = isMobile ? 1 : 4;
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
    const handleExplode = (mobile) => {
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

        const top = mobile ? 300 : 600;
        const left = mobile ? 2 : 1;

        // Animate to the randomized position
        setTimeout(() => {
          smiley.style.left = `${
            centerX + Number(offsetX * left) - size / 2
          }px`;
          smiley.style.top = `${Number(centerY + offsetY - size / 2) - top}px`;
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
    };

    if (isMobile) {
      el.addEventListener("click", () => handleExplode(true));
    } else {
      el.addEventListener("mouseenter", () => handleExplode(false));
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

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      nElements.h1.forEach((element, index) => {
        if (index === 0) return; // Skip the first h1

        const offset = index * 0.52;
        const y = calculateTranslate(progress, 100 * offset, 10 * offset, 1);

        lastTranslations[index] = y;
        element.style.transform = `translateY(${y}%) translateX(-50%)`;
        element.style.opacity = progress;
      });
    } else {
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
        element.style.opacity = progress;
      });
    }
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

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) {
        elements.h1.forEach((element, index) => {
          if (index === 0) return;

          const translateY = calculateTranslate(
            progress,
            lastTranslations[index],
            0,
            1,
          );
          element.style.transform = `translateY(-${translateY}%) translateX(-50%)`;
          element.style.opacity = opacity;
        });
      } else {
        elements.h1.forEach((element, index) => {
          if (index === 0) return;

          const translateY = calculateTranslate(
            progress,
            lastTranslations[index],
            0,
            1,
          );
          element.style.transform = `translateY(-${translateY}%)`;
          element.style.opacity = opacity;
        });
      }
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
        transform: "translateX(0%) scale(0.7) rotate(350deg) translateY(0%)",
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

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const x = isMobile ? 0 : calculateTranslate(progress, 0, 200, 1);
      const y = isMobile ? calculateTranslate(progress, 0, 100, 1) : 0;
      applyStyles(bear, {
        transform: `translateX(-${x}%) scale(1.5) rotate(360deg) translateY(${y}%)`,
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

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const x = isMobile ? 0 : 200;
  const y = isMobile ? 100 : 0;

  const bear = document.querySelector(".bigly-logo");
  if (progress > 0 && progress <= 1) {
    if (progress > 0.1) {
      const scale = calculateTranslate(progress, 1, 2.5, 1);
      const blur = calculateTranslate(progress, 0, 10, 1);

      applyStyles(bear, {
        transform: `translateX(-${x}%) scale(${scale}) rotate(360deg) translateY(${y}%)`,
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
        transform: `translateX(-${x}%) scale(${1}) rotate(360deg) translateY(${y}%)`,
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
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) {
        const currY = calculateTranslate(progress, 0, -100, 0.6);
        setOpacityAndTransform(current, opacity, `translateY(${currY}%)`);

        const nextY = calculateTranslate(progress, 100, 0, 1);
        applyStyles(next, {
          opacity: progress * 1.2,
          transform: `translateY(${nextY}%)`,
          ["z-index"]: 10,
          display: "flex",
        });
      } else {
        const currX = calculateTranslate(progress, 0, -100, 0.6);
        setOpacityAndTransform(current, opacity, `translateX(${currX}%)`);

        const nextX = calculateTranslate(progress, 100, 0, 1);
        applyStyles(next, {
          opacity: progress * 1.2,
          transform: `translateX(${nextX}%)`,
          ["z-index"]: 10,
          display: "flex",
        });
      }

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

window.onload = function () {
  // Globals
  var random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var particles = 10,
    spread = 40,
    sizeMin = 3,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -0.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = 0.13,
    dyMax = 0.18,
    dThetaMin = 0.4,
    dThetaMax = 0.7 - dThetaMin;

  var colorThemes = [
    function () {
      return color(
        (200 * random()) | 0,
        (200 * random()) | 0,
        (200 * random()) | 0,
      );
    },
    function () {
      var black = (200 * random()) | 0;
      return color(200, black, black);
    },
    function () {
      var black = (200 * random()) | 0;
      return color(black, 200, black);
    },
    function () {
      var black = (200 * random()) | 0;
      return color(black, black, 200);
    },
    function () {
      return color(200, 100, (200 * random()) | 0);
    },
    function () {
      return color((200 * random()) | 0, 200, 200);
    },
    function () {
      var black = (256 * random()) | 0;
      return color(black, black, black);
    },
    function () {
      return colorThemes[random() < 0.5 ? 1 : 2]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 3 : 5]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 2 : 4]();
    },
  ];

  function color(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // Cosine interpolation
  function interpolation(a, b, t) {
    return ((1 - cos(PI * t)) / 2) * (b - a) + a;
  }

  // Create a 1D Maximal Poisson Disc over [0, 1]
  var radius = 1 / eccentricity,
    radius2 = radius + radius;
  function createPoisson() {
    // domain is the set of points which are still available to pick from
    // D = union{ [d_i, d_i+1] | i is even }
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i,
        l,
        interval,
        a,
        b,
        c,
        d;

      // Find where dart lies
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        (a = domain[i]), (b = domain[i + 1]), (interval = b - a);
        if (dart < measure + interval) {
          spline.push((dart += a - measure));
          break;
        }
        measure += interval;
      }
      (c = dart - radius), (d = dart + radius);

      // Update the domain
      for (i = domain.length - 1; i > 0; i -= 2) {
        (l = i - 1), (a = domain[l]), (b = domain[i]);
        // c---d          c---d  Do nothing
        //   c-----d  c-----d    Move interior
        //   c--------------d    Delete interval
        //         c--d          Split interval
        //       a------b
        if (a >= c && a < d)
          if (b > d) domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2);
        // Delete interval
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
      }

      // Re-measure the domain
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  // Create the overarching container
  var container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "0";
  container.style.overflow = "visible";
  container.style.zIndex = "9999";

  // Confetto constructor
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement("div");
    this.inner = document.createElement("div");
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = "absolute";
    outerStyle.width = sizeMin + sizeMax * random() + "px";
    outerStyle.height = sizeMin + sizeMax * random() + "px";
    innerStyle.width = "100%";
    innerStyle.height = "100%";
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = "50px";
    outerStyle.transform = "rotate(" + 360 * random() + "deg)";
    this.axis =
      "rotate3D(" + cos(360 * random()) + "," + cos(360 * random()) + ",0,";
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + "deg)";

    this.x = window.innerWidth * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + "px";
    outerStyle.top = this.y + "px";

    // Create the periodic spline
    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      // Compute spline and convert to polar
      var phi = (this.frame % 7777) / 7777,
        i = 0,
        j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i]),
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + "px";
      outerStyle.top = this.y + rho * sin(phi) + "px";
      innerStyle.transform = this.axis + this.theta + "deg)";
      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      // Append the container
      document.body.appendChild(container);

      // Add confetti
      var theme = colorThemes[0],
        count = 0;
      (function addConfetto() {
        var confetto = new Confetto(theme);
        confetti.push(confetto);
        container.appendChild(confetto.outer);
        timer = setTimeout(addConfetto, spread * random());
      })(0);

      // Start the loop
      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = window.innerHeight;

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return (frame = requestAnimationFrame(loop));

        // Cleanup
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  // poof();
};
