---
slug: "pen-in-the-air"
title: "Pen in the Air"
type: "build"
status: "published"
date: "2023-03"
hook: "Drawing input assumes a surface. Not everyone has one, and not every context allows touching it."
tools: ["Python", "OpenCV"]
href: ""
---

## The problem

Most drawing input assumes a surface — a tablet, a touchscreen, at minimum a
mouse. That assumption breaks down when someone doesn't have one of those, or
when touching a shared surface isn't practical in the moment. A plain webcam is
the one input device that's already there.

## What I built

- Tracked fingertip position through a standard webcam feed rather than
  requiring depth-sensing hardware, keeping the hardware bar at "has a laptop
  camera."
- Prioritized low latency over tracking precision — a laggy pen is unusable in
  a way a slightly imprecise one isn't, so the pipeline was tuned for
  responsiveness first.
- Built in Python with OpenCV for the computer-vision pipeline.

## What I'd do differently

A plain webcam has no depth information, so tracking degrades in low light or
against a cluttered background — the tradeoff for not requiring extra hardware.
If I revisited this, I'd add an explicit calibration step so it adapts to the
room instead of assuming ideal lighting.
