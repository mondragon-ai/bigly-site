document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const mainElement = document.querySelector("main");
  const headerElement = document.querySelector(".navbar");
  const headerHeight = headerElement.offsetHeight;

  const sectionElements = {
    sectionOne: document.querySelector(".sectionOne"),
    sectionTwo: document.querySelector(".sectionTwo"),
    sectionThree: document.querySelector(".sectionThree"),
  };

  const sectionOneElements = {
    headers: sectionElements.sectionOne.querySelectorAll(".txt h1"),
    backgroundHeader: sectionElements.sectionOne.querySelector("#bg-lines"),
    logo: sectionElements.sectionOne.querySelector("div img"),
    paragraph: sectionElements.sectionOne.querySelector(".txt p"),
  };

  const sectionTwoElements = {
    txt: sectionElements.sectionTwo.querySelector(".txt"),
    header: sectionElements.sectionTwo.querySelector(".txt h1"),
    paragraph: sectionElements.sectionTwo.querySelector(".txt p"),
    background: document.querySelector(".bkg-two"),
  };

  const sectionThreeElements = {
    background: document.querySelector(".bkg-three"),
    header: sectionElements.sectionThree.querySelector(".txt"),
  };

  // Scroll Event
  mainElement.addEventListener("scroll", () => {
    const scrollY = mainElement.scrollTop;
    const offset = scrollY - headerHeight;

    const sectionOneHeight =
      sectionElements.sectionOne.getBoundingClientRect().height;
    const sectionTwoStart = sectionOneHeight;
    const sectionTwoEnd = sectionOneHeight * 2;

    // Section One Logic
    if (scrollY >= headerHeight) {
      const opacityValue = Math.max(0, 1 - (offset * 1.7) / sectionOneHeight);
      const progress = offset / sectionOneHeight;

      sectionOneElements.headers.forEach((header, index) => {
        const translateXValue = index === 0 ? offset * 2.5 : offset;
        const transformValue =
          index === 1
            ? `rotate(350deg) translateY(-45%) translateX(${translateXValue}px)`
            : `translateX(${translateXValue}px)`;
        setTransformAndOpacity(header, transformValue, opacityValue);
      });

      setTransformAndOpacity(
        sectionOneElements.backgroundHeader,
        `translate(90%, 0%) scale(2, 2) translateY(${offset * -0.5}px)`,
        1,
      );

      setTransformAndOpacity(
        sectionOneElements.paragraph,
        `translateX(${offset * 2.2}px)`,
        opacityValue,
      );

      setTransformAndOpacity(
        sectionOneElements.logo,
        `rotate(${Math.round(1 - progress * 360)}deg) scale(${
          1 - progress * 0.5
        })`,
        opacityValue,
      );

      // Section Two Header
      const sectionTwoProgress = (scrollY - sectionTwoStart) / sectionOneHeight;
      const translateYValue = Math.max(0, 100 - sectionTwoProgress * 100) - 100;
      setTransformAndOpacity(
        sectionTwoElements.header,
        `translateY(-${translateYValue * 3.5}px)`,
        progress * 0.33,
      );
      setTransformAndOpacity(
        sectionTwoElements.paragraph,
        `translateY(${translateYValue}px)`,
        progress,
      );
    } else {
      resetStyles(
        [
          sectionOneElements.headers,
          sectionOneElements.logo,
          sectionOneElements.paragraph,
        ],
        [
          {transform: "none", opacity: "1"},
          {transform: "none", opacity: "1"},
          {transform: "none", opacity: "1"},
        ],
      );
    }

    // Section Two Logic
    if (scrollY >= sectionTwoStart && scrollY <= sectionTwoEnd) {
      const sectionTwoProgress = (scrollY - sectionTwoStart) / sectionOneHeight;
      const translateYValue = Math.max(0, 100 - sectionTwoProgress * 100) - 100;
      const opacityValue = Math.max(0, 1 - sectionTwoProgress * 1.2);
      const scaleValue = Math.max(0.2, 1 - sectionTwoProgress * 1.2);

      const progress = offset / sectionOneHeight;

      setTransformAndOpacity(
        sectionTwoElements.header,
        `translateY(${translateYValue}px)`,
        opacityValue,
      );
      setTransformAndOpacity(
        sectionTwoElements.paragraph,
        `translateY(${translateYValue}px)`,
        opacityValue,
      );
      setTransformAndOpacity(
        sectionTwoElements.background,
        `scale(${1})`, //`scale(${scaleValue})`,
        opacityValue,
      );

      // ! Section Three Start
      const reverse = sectionOneHeight / (scrollY - sectionTwoStart);
      setTransformAndOpacity(
        sectionThreeElements.background,
        `scale(${1})`, //`scale(${reverse})`,
        Math.abs(1 - progress),
      );

      setTransformAndOpacity(
        sectionThreeElements.header,
        `translateX(${Number(scrollY - sectionTwoStart - 1000) * 0.2}px)`,
        Math.abs(1 - progress),
      );
    } else if (scrollY < sectionTwoStart - 100) {
      resetStyles(
        [sectionTwoElements.background, sectionThreeElements.background],
        [
          {transform: "none", opacity: "1"},
          {transform: "none", opacity: "0"},
        ],
      );
    } else if (scrollY > sectionTwoEnd) {
      resetStyles(
        [
          sectionTwoElements.header,
          sectionTwoElements.paragraph,
          sectionTwoElements.background,
          sectionThreeElements.background,
        ],
        [
          {transform: "translateY(-100px)", opacity: "0.2"},
          {transform: "translateY(600px)", opacity: "1"},
          {transform: "none", opacity: "0"},
          {transform: "scale(1)", opacity: "1"},
        ],
      );
    }

    // Section Three Logic (Example Placeholder)
    const sectionThreeStart = sectionOneHeight * 2;
    const sectionThreeEnd = sectionOneHeight * 3;
    if (scrollY >= sectionThreeStart && scrollY <= sectionThreeEnd) {
      const sectionThreeProgress =
        (scrollY - sectionThreeStart) / sectionOneHeight;
      const translateYValue =
        Math.max(0, 100 - sectionThreeProgress * 100) - 100;
      const opacityValue = Math.max(0, 1 - sectionThreeProgress * 1.2);
      const scaleValue = Math.max(0.2, 1 - sectionThreeProgress * 1.2);

      //translateX(${translateXValue}px)
      //   setTransformAndOpacity(
      //     sectionThreeElements.header,
      //     `translateX(${scrollY - sectionThreeStart}px)`,
      //     opacityValue,
      //   );
    }
  });
});

// Helper Functions
const setTransformAndOpacity = (element, transformValue, opacityValue) => {
  element.style.transform = transformValue;
  element.style.opacity = opacityValue;
};

const resetStyles = (elements, styles) => {
  elements.forEach((element, index) => {
    Object.entries(styles[index]).forEach(([property, value]) => {
      element.style[property] = value;
    });
  });
};
