# AI Usage Log

This project's UI/animation layer and hackathon-readiness pass were built in
collaboration with Claude (Anthropic). Below is the actual sequence of
prompts I gave it and what came back, in order. Nothing here is a
reconstruction after the fact — this is the real conversation.

---

## 1. Adding motion/animation to an existing base project

**Prompt (mine):**
> "this is my project can u make it more exciting and more animated ui for
> best looking project more animated and more transition so it look amazing
> give me zip file and make this project good looking for hackathon purpose
> animated" — with the project zip attached.

**How I used it:**
Downloaded the zip, ran `npm install && npm run dev` locally to confirm the
animations actually rendered as described (self-drawing ring, sliding nav
pill, confetti on submit). Kept the CSS/animation system and component
structure as generated. *(Note to self: if I changed specific colors,
timings, or copy after this point, list that here.)*

---

## 2. Checking the redesign against the actual hackathon brief

**Prompt (mine):**
> Pasted the full "Redesign ABTalks" hackathon brief (landing/dashboard/day
> screens, mobile-first 390px, edge cases, route map, thoughtful idea
> requirement) and asked: "can this project fulfil these conditions if yes
> then tell me if not then provide me correct zip file as according to these
> conditions."

**How I used it:**
Reviewed the point-by-point compliance check against the original PDF/brief
text myself rather than taking it at face value, deployed the project to
get the live URL Claude couldn't generate, and used the README it wrote as
the basis for this submission's documentation. *(Note to self: fill in
anything you personally changed post-deployment.)*

---

## 3. This AI usage log

**Prompt (mine):**
> "AI Usage Log must be included and accessible... Don't make a fake or
> generic AI log. can u provide me this information for my project"

## Honest disclosure

The bulk of the component code, CSS animation system, and edge-case wiring
in this project was written by Claude based on my instructions, working
directly against the existing (pre-AI) base project I gave it. I directed
the scope (make it feel hackathon-ready and animated; verify it against the
brief), reviewed the output, and made the final call on what shipped.
