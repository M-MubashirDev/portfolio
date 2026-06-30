"use client";
import Masonry from "./Masonry";

const items = [
  {
    id: "1",
    img: "/images/html.png",
    height: 260,
    card: { name: "HTML5", color: "#e34f26" },
  },
  {
    id: "2",
    img: "/images/css.png",
    height: 180,
    card: { name: "CSS3", color: "#1572b6" },
  },
  {
    id: "3",
    img: "/images/js.png",
    height: 320,
    card: { name: "JavaScript", color: "#f7df1e" },
  },
  {
    id: "4",
    img: "/images/react.png",
    height: 200,
    card: { name: "React", color: "#61dafb" },
  },
  {
    id: "5",
    img: "/images/redux.png",
    height: 300,
    card: { name: "Redux", color: "#764abc" },
  },
  {
    id: "6",
    img: "/images/tailwind.png",
    height: 160,
    card: { name: "Tailwind", color: "#38bdf8" },
  },
  {
    id: "7",
    img: "/images/node.png",
    height: 340,
    card: { name: "Node.js", color: "#3c873a" },
  },
  {
    id: "8",
    img: "/images/express.png",
    height: 180,
    card: { name: "Express", color: "#cccccc" },
  },
  {
    id: "9",
    img: "/images/mongodb.png",
    height: 280,
    card: { name: "MongoDB", color: "#4db33d" },
  },
  {
    id: "10",
    img: "/images/gsap.png",
    height: 220,
    card: { name: "GSAP", color: "#88ce02" },
  },
  {
    id: "11",
    img: "/images/git.png",
    height: 190,
    card: { name: "Git", color: "#f05032" },
  },
];

export default function Skills() {
  return (
    <section
      className="w-full overflow-hidden py-18 rounded-t-2xl"
      style={{ background: "#ffff" }}
    >
      <div className="main-container">
        <h2 className="font-heading text-9xl text-center capitalize indent-16 leading-26 text-foreground font-bold p-4 textImage">
          tech stack
        </h2>
        <div className="w-full h-150 mt-12">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.97}
            blurToFocus
          />
        </div>
      </div>
    </section>
  );
}
