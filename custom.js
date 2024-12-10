document.addEventListener("DOMContentLoaded", () => {
  const mainElement = document.querySelector("main");
  const headerElement = document.querySelector(".navbar");
  const headerHeight = headerElement.offsetHeight;

  // Section One Elements
  const sectionOneElement = document.querySelector(".sectionOne");
  const sectionOneHeaders = sectionOneElement.querySelectorAll(".txt h1");
  const thatHdr = sectionOneElement.querySelector(".txt .abs");
  const bkgHdr = sectionOneElement.querySelector(".sectionOne #bg-lines");
  const sectionOneLogo = sectionOneElement.querySelector(".sectionOne div img");
  const sectionOneP = sectionOneElement.querySelector(".txt p");

  // Section Two Elements
  const sectionTwoEl = document.querySelector(".sectionTwo");
  const sectionTwoHdr = sectionTwoEl.querySelector(".txt h1");
  const sectionTwoP = sectionTwoEl.querySelector(".txt p");

  // Section Three Elements
  const sectionThreeEl = document.querySelector(".sectionThree");
  const sectionThreeHdr = sectionThreeEl.querySelector(".txt h1");
  const sectionThreeP = sectionThreeEl.querySelector(".txt p");

  mainElement.addEventListener("scroll", () => {
    const scrollY = mainElement.scrollTop;
    const offset = scrollY - headerHeight;
    const sectionOneHeight = sectionOneElement.getBoundingClientRect().height;

    // Section One
    if (scrollY >= headerHeight) {
      const opacityValue = Math.max(0, 1 - (offset * 1.7) / sectionOneHeight);
      const progress = offset / sectionOneHeight;

      sectionOneHeaders.forEach((header, index) => {
        const translateXValue = index === 0 ? offset * 2.5 : offset;
        if (index == 1) {
          header.style.transform = `rotate(350deg) translateY(-45%) translateX(${translateXValue}px)`;
          header.style.opacity = opacityValue;
        } else {
          header.style.transform = `translateX(${translateXValue}px)`;
          header.style.opacity = opacityValue;
        }
      });

      bkgHdr.style.transform = `translate(90%, 0%) scale(2, 2) translateY(${
        offset * -0.5
      }px)`;

      sectionOneP.style.transform = `translateX(${offset * 2.2}px)`;
      sectionOneP.style.opacity = opacityValue;

      sectionOneLogo.style.opacity = opacityValue;
      sectionOneLogo.style.transform = `rotate(${Math.round(
        1 - progress * 360,
      )}deg) scale(${1 - progress * 0.5})`;
    } else {
      resetSectionOneStyles(sectionOneHeaders, sectionOneLogo, sectionOneP);
      path.style.strokeDashoffset = 0;
      path.style.opacity = 1;
    }

    // Section Two
    const sectionTwoStart = sectionOneHeight;
    const sectionTwoEnd = sectionOneHeight * 2;
    const sectionTwoProgress = (scrollY - sectionTwoStart) / sectionOneHeight;

    if (scrollY >= sectionTwoStart && scrollY <= sectionTwoEnd) {
      // Translate from out of view to 0px
      const translateYValue = Math.max(0, 100 - sectionTwoProgress * 100) - 100;
      const opacityValue = Math.max(0, 1 - sectionTwoProgress * 1.2);
      const scaleValue = Math.max(0.2, 1 - sectionTwoProgress * 1.2);

      sectionTwoHdr.style.transform = `translateY(${translateYValue}px)`;
      sectionTwoHdr.style.opacity = opacityValue;

      sectionTwoP.style.transform = `translateY(${translateYValue}px)`;

      sectionTwoEl.style.transform = `scale(${scaleValue})`;
      sectionTwoEl.style.opacity = opacityValue;

      const reverse = sectionOneHeight / (scrollY - sectionTwoStart);
      const progress = offset / sectionOneHeight;
      console.log({reverse});

      sectionThreeEl.style.transform = `scale(${reverse})`;
      sectionThreeEl.style.opacity = Math.abs(1 - progress);
    } else if (scrollY <= sectionTwoStart) {
      // Reset H1 styles
      sectionTwoHdr.style.transform = `translateY(-${sectionOneHeight}px)`;
      sectionTwoHdr.style.opacity = 0.2;

      // Reset P styles
      sectionTwoP.style.transform = "translateY(600px)";
      sectionTwoP.style.opacity = 1;

      // Reset Section styles
      sectionTwoEl.style.transform = `scale(1)`;
      sectionTwoEl.style.opacity = 1;
    } else if (scrollY > sectionTwoEnd) {
      // Reset styles when out of range
      resetSectionTwoStyles(sectionTwoHdr, sectionTwoP);
      sectionTwoEl.style.transform = `scale(0)`;
      sectionTwoEl.style.opacity = 0;
    }

    // Section Three
    const sectionThreeStart = sectionOneHeight;
    const sectionThreeEnd = sectionOneHeight * 3;
    const sectionThreeProgress =
      (scrollY - sectionThreeStart) / sectionOneHeight;

    if (scrollY >= sectionThreeStart && scrollY <= sectionThreeEnd) {
      //   sectionThreeEl.style.transform = "scale(1)";
    } else if (scrollY <= sectionThreeStart) {
      //   sectionThreeEl.style.transform = "scale(5)";
    } else if (scrollY > sectionTwoEnd) {
    }
    // var path = document.querySelector(".path");
    // var length = path.getTotalLength();
    // document.documentElement.style.setProperty("--length", length);
    // path.style.strokeDasharray = length;
    // path.style.strokeDashoffset = 0; // Start fully drawn
    // const drawLength = Math.min(length, progress * length);
    // console.log(drawLength);
    // path.style.strokeDashoffset = drawLength;
    // path.style.opacity = opacityValue;
  });
});

function resetSectionOneStyles(headers, logo, p) {
  headers.forEach((header) => {
    if (index == 1) {
      header.style.transform = `rotate(350deg) translateY(-45%) translateX(0)`;
      header.style.opacity = 1;
    } else {
      header.style.transform = "translateX(0)";
      header.style.opacity = 1;
    }
  });
  p.style.transform = "translateX(0)";
  p.style.opacity = 1;
  logo.style.opacity = 1;
  logo.style.transform = "rotate(0deg) scale(1)";
}

function resetSectionTwoStyles(header, paragraph) {
  header.style.transform = "translateY(0) scale(0)";
  header.style.opacity = 0;

  paragraph.style.transform = "translateY(0) scale(0)";
  paragraph.style.opacity = 0;
}
