/* console.clear();
gsap.registerPlugin(DrawSVGPlugin);
const tlHmrb = gsap.timeline({defaults:{ease:"power2.inOut"}});

gsap.set("#theBurger", { autoAlpha:1 });
gsap.set(".buns", { drawSVG: "0% 30%" });
gsap.set(".letters", { drawSVG: "53.5% 100%", x: -155 });


tlHmrb.to(".patty", { duration: 0.35, drawSVG: "50% 50%"}, 0);
tlHmrb.to(".patty", { duration: 0.1, opacity: 0, ease: "none" }, 0.25);
tlHmrb.to(".buns", { duration: 0.85, drawSVG: "69% 96.5%" }, 0);
tlHmrb.to(".letters", { duration: 0.85, drawSVG: "0% 53%", x: 0 }, 0);
tlHmrb.reversed(true);

function colorChange() {
  gsap.to("#burger, .letters", 0.5, {
    stroke: colorArray[this.index],
    ease: "none"
  });
}
;

function animateTheBurger() {
  tlHmrb.reversed(!tlHmrb.reversed());
} */