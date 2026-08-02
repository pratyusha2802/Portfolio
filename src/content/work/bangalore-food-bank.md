---
slug: "bangalore-food-bank"
title: "Bangalore Food Bank"
type: "build"
status: "published"
date: "2022-08"
context: "Code for Good 2022"
hook: "Surplus food and the people who need it exist in the same city and rarely find each other in time."
tools: ["React", "Node.js", "Express"]
href: ""
---

## The problem

Bangalore has surplus food and people who need it, in the same city, but the two
rarely meet before the food is no longer good to give. Anything built to close
that gap also has to survive real hackathon constraints: a fixed 24-hour build
window, and volunteers who mostly access it from low-end Android phones, not
desktops.

Built during Code for Good 2022, JPMC's social-impact hackathon.

## What I built

- Led the frontend build. With 24 hours on the clock, scoped the team to one
  flow — matching surplus food to a nearby volunteer — done properly, rather
  than spreading across four half-built ones.
- Built for low-end phones specifically, which ruled out several frontend
  patterns we'd otherwise have reached for by default.
- Stack: React on the frontend, Node.js and Express on the backend.

## What I'd do differently

The call to scope down to one flow was right for a 24-hour deadline, but a
matching flow with no notification layer doesn't survive past the demo. Given a
second day, I'd add the piece that makes it a running service rather than a
hackathon prototype — some way for a volunteer to be notified when new surplus
appears nearby, instead of only being able to browse it.

This hackathon is also how I ended up at JP Morgan Chase, which I didn't plan
going in.
