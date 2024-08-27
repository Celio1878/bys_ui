import { Tag } from "@/app/model/book-dto";

export const chapter = {
  title: "Capitulo 1",
  content: `<p>In the heart of a bustling city, where the streets hummed with the <span style="color: #FF0000">rhythm of life</span>, a <span style="color: #FF4500">young woman</span> named <mark>Emily</mark> found herself at a crossroads. Her days were filled with the monotony of a corporate job, a routine that left her yearning for something more.</p>
<p>One fateful evening, as she sat alone in her apartment, <mark>Emily</mark> stumbled upon an advertisement for a writing workshop. Intrigued, she decided to take a chance and sign up, determined to reignite the creative spark that had long been <span style="color: #FF00FF">dormant within her</span>.</p><hr>
<p><em>The workshop was a revelation</em>, <u>Emily</u> recalled, her eyes shining with newfound purpose. <strong>Under the guidance of a seasoned author, she learned to weave words into tapestries of emotion, painting vivid scenes that transported her readers to distant lands and into the depths of the human experience.</strong></p>
<p>As the weeks passed, Emily's confidence grew, and her passion for writing blossomed. She found herself lost in the worlds she created, her fingers dancing across the keyboard as she poured her heart and soul into every sentence.</p><p>Little did she know, this was just the beginning of a journey that would forever change the course of her life.</p>`,
};

export const users: Tag<string>[] = Array.from({ length: 1000 }).map(
  (_, i) => ({
    id: `user ${i}`,
    title: "User " + i,
  }),
);
