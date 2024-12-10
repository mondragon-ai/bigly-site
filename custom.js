document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const mainElement = document.querySelector("main");
  const headerElement = document.querySelector(".navbar");
  const headerHeight = headerElement.offsetHeight;

  const sections = {
    one: document.querySelector(".sectionOne"),
    two: document.querySelector(".sectionTwo"),
    three: document.querySelector(".sectionThree"),
    four: document.querySelector(".sectionFour"),
  };

  const sectionOneElements = {
    headers: sections.one.querySelectorAll(".txt h1"),
    backgroundHeader: sections.one.querySelector("#bg-lines"),
    logo: sections.one.querySelector("div img"),
    paragraph: sections.one.querySelector(".txt p"),
  };

  const sectionTwoElements = {
    txt: sections.two.querySelector(".txt"),
    img: sections.two.querySelector("img"),
    header: sections.two.querySelector(".txt h1"),
    paragraph: sections.two.querySelector(".txt p"),
    background: document.querySelector(".bkg-two"),
  };

  const sectionThreeElements = {
    background: document.querySelector(".bkg-three"),
    header: sections.three.querySelector(".txt"),
    clients: sections.three.querySelector(".clientsWrapper"),
  };

  const sectionFourElements = {
    ecom: sections.four.querySelector("#ecom"),
    sub: sections.four.querySelector("h4"),
    title: sections.four.querySelector("h1"),
    para: sections.four.querySelectorAll("p"),
  };

  // Helper Functions
  const setTransformAndOpacity = (element, transform, opacity) => {
    element.style.transform = transform;
    element.style.opacity = opacity;
  };

  const resetStyles = (elements, styles) => {
    elements.forEach((element, index) => {
      Object.entries(styles[index]).forEach(([property, value]) => {
        element.style[property] = value;
      });
    });
  };

  // Scroll Event
  mainElement.addEventListener("scroll", () => {
    const scrollY = mainElement.scrollTop;
    const offset = scrollY - headerHeight;
    const sectionOneHeight = sections.one.getBoundingClientRect().height;
    const sectionTwoStart = sectionOneHeight;
    const sectionTwoEnd = sectionOneHeight * 2;

    // Section One Logic
    if (offset > 0) {
      const opacity = Math.max(0, 1 - (offset * 1.7) / sectionOneHeight);
      const progress = offset / sectionTwoEnd;
      //   const progress = scrollY / sectionOneHeight;
      //   const opacity = Math.max(0, (1 - progress) * 2);

      console.log({progress, opacity, offset, scrollY});
      sectionOneElements.headers.forEach((header, index) => {
        const translateX = index === 0 ? offset * 2.5 : offset;
        const transform =
          index === 1
            ? `rotate(350deg) translateY(-45%) translateX(${translateX}px)`
            : `translateX(${translateX}px)`;

        console.log({indextransform});
        setTransformAndOpacity(header, transform, opacity);
      });

      setTransformAndOpacity(
        sectionOneElements.backgroundHeader,
        `translate(90%, 0%) scale(2, 2) translateY(${offset * -0.5}px)`,
        1,
      );

      setTransformAndOpacity(
        sectionOneElements.paragraph,
        `translateX(${offset * 2.2}px)`,
        opacity,
      );

      setTransformAndOpacity(
        sectionOneElements.logo,
        `rotate(${Math.round(1 - progress * 360)}deg) scale(${
          1 - progress * 0.5
        })`,
        opacity,
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
      const translateY = Math.max(0, 100 - sectionTwoProgress * 100) - 100;
      const progress = scrollY / sectionTwoEnd;
      const opacity = Math.max(0, (1 - progress) * 2);

      setTransformAndOpacity(
        sectionTwoElements.header,
        `translateY(${translateY}px)`,
        opacity,
      );
      setTransformAndOpacity(
        sectionTwoElements.paragraph,
        `translateY(${translateY}px)`,
        opacity,
      );

      setTransformAndOpacity(
        sectionTwoElements.img,
        `scale(${1 - progress * 0.2})`,
        opacity,
      );

      if (progress > 0.6) {
        // ! Section Three Start
        const reverse = sectionOneHeight / (scrollY - sectionTwoStart);
        setTransformAndOpacity(
          sectionThreeElements.background,
          `scale(${1})`, //`scale(${reverse})`,
          Math.abs(progress),
        );

        setTransformAndOpacity(
          sectionThreeElements.header,
          `translateX(${Number(scrollY - sectionTwoStart - 1000) * 0.2}px)`,
          Math.abs(1 - progress * 0.9),
        );

        setTransformAndOpacity(
          sectionThreeElements.clients,
          "none",
          Math.abs(1 - progress * 0.91),
        );
      } else {
        resetStyles(
          [sectionTwoElements.background, sectionThreeElements.background],
          [
            {transform: "none", opacity: "1"},
            {transform: "none", opacity: "0"},
          ],
        );
      }
    } else if (scrollY < sectionTwoStart) {
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

    const sectionThreeStart = sectionOneHeight * 2;
    const sectionThreeEnd = sectionOneHeight * 3;

    // Section Three Logic
    if (scrollY >= sectionThreeStart && scrollY <= sectionThreeEnd) {
      const progress = scrollY / sectionThreeEnd;
      console.log(progress);

      resetStyles(
        [
          sectionThreeElements.background,
          sectionThreeElements.header,
          sectionThreeElements.clients,
        ],
        [
          {transform: "scale(1)", opacity: "1"},
          {transform: "translateX(0px)", opacity: "1"},
          {transform: "none", opacity: "0.8"},
        ],
      );
      if (progress > 0.4) {
        setTransformAndOpacity(
          sectionFourElements.title,
          `translateX(${offset - sectionThreeEnd}px)`,
          Math.abs(progress),
        );

        sectionFourElements.para.forEach((header, index) => {
          const translateX =
            index === 0
              ? (offset - sectionThreeEnd) * 2.5
              : index === 1
              ? (offset - sectionThreeEnd) * 3.5
              : (offset - sectionThreeEnd) * 4.5;
          setTransformAndOpacity(
            header,
            `translateX(${translateX}px)`,
            Math.abs(progress),
          );
        });
      }
    } else if (scrollY > sectionThreeEnd) {
      resetStyles(
        [sectionThreeElements.background],
        [{transform: "none", opacity: "0"}],
      );
    }

    const sectionFourStart = sectionOneHeight * 3;
    const sectionFourEnd = sectionOneHeight * 4;

    // Section Four Logic
    if (scrollY >= sectionFourStart && scrollY <= sectionFourEnd) {
      resetStyles(
        [sectionFourElements.title],
        [{transform: "none", opacity: "1"}],
      );

      sectionFourElements.para.forEach((header, index) => {
        resetStyles([header], [{transform: "none", opacity: "1"}]);
      });
    }
  });
});
