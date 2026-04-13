---
title: "Observability for the skeptic"
description: "Metrics and logs are not the goal—faster, safer debugging is."
pubDate: 2026-03-18
---

Observability is easy to over-buy: another dashboard, another vendor pitch, another “single pane of glass” that becomes a junk drawer.

Start from incidents. Pick the last three outages or near-misses and ask what evidence you wished you had in the first five minutes. Usually it is not more charts—it is clearer golden signals, tighter correlation IDs, and logs you can filter without regex archaeology.

Then instrument in layers: can you tell which dependency is slow? Which user cohort is affected? Which deploy introduced the change? If you cannot answer those questions with a straight line from symptom to hypothesis, your observability is still a project—not a capability.

Finally, keep it humane: on-call should be able to navigate without memorizing tribal knowledge. If only one person can read the graph, it is not done yet.
