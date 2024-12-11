document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  let panelsContainer = document.querySelector("#panels-container");
  let tween;

  /* Panels */
  const panels = gsap.utils.toArray("#panels-container .panel");
  tween = gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#panels-container",
      pin: true,
      start: "top top",
      scrub: 1,
      anticipatePin: 1,
      snap: {
        snapTo: 1 / (panels.length - 1),
        inertia: false,
        duration: {min: 0.1, max: 0.1},
      },
      end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
    },
  });

  /* Main navigation */
  //   let panelsSection = document.querySelector("#panels");

  //   let scrollFunc = ScrollTrigger.getScrollFunc(window);

  //   document.querySelectorAll(".anchor").forEach((anchor) => {
  //     anchor.addEventListener("click", function (e) {
  //       e.preventDefault();
  //       let targetElem = document.querySelector(e.target.getAttribute("href")),
  //         y = targetElem;
  //       if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
  //         let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
  //           totalMovement = (panels.length - 1) * targetElem.offsetWidth;
  //         y = Math.round(
  //           tween.scrollTrigger.start +
  //             (targetElem.offsetLeft / totalMovement) * totalScroll,
  //         );
  //       }
  //       gsap.to(window, {
  //         scrollTo: {
  //           y: y,
  //           autoKill: false,
  //         },
  //         onStart: () => (scrollFunc.cacheID = Math.random()),
  //         onUpdate: ScrollTrigger.update,
  //         duration: 1,
  //       });
  //     });
  //   });
});
