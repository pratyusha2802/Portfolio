---
slug: "network-intrusion-detection"
title: "Network Intrusion Detection"
type: "build"
status: "published"
date: "2024-04"
context: "Final-year project, MANIT Bhopal"
hook: "Intrusion detection models drown in correlated features and overfit to the benchmark rather than the attack."
tools: ["Python", "scikit-learn"]
href: ""
---

## The problem

Most published intrusion-detection models are trained and evaluated on the same
benchmark, which rewards fitting that benchmark's specific quirks rather than
catching real attacks. Two problems compound: correlated, redundant features let
a model look accurate while it's actually learning noise, and a single classifier
tends to be brittle across attack types that don't resemble each other.

This project builds a detection pipeline aimed at that failure mode directly,
rather than chasing a leaderboard number on one dataset.

## What I built

- Reduced the feature set with correlation-based feature selection *before*
  training, rather than after, so the model never saw redundant signals in the
  first place.
- Used a stacked ensemble instead of a single classifier, trading a little
  interpretability for more stable performance across different attack types.
- Evaluated on both KDD Cup 99 and NSL-KDD rather than KDD Cup 99 alone —
  NSL-KDD exists specifically because KDD Cup 99 results are known to overstate
  real-world performance.

Built in Python with scikit-learn.

## What I'd do differently

Both benchmarks are dated — KDD Cup 99 and its NSL-KDD successor reflect attack
traffic from the late 1990s and early 2000s. Next time I'd validate the ensemble
against a more recent capture before trusting that its accuracy holds up on
current traffic patterns.
