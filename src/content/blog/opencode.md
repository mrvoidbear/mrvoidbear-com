---
title: "Opencode on the go"
description: "Running opencode on the go from anywhere without dedicated mobile app"
pubDate: 2025-01-03
---

[Opencode](https://opencode.ai/) is an open source AI coding agent that works
with variety of models and runs as a [tui](https://en.wikipedia.org/wiki/Text-based_user_interface) and web server. 

Over the last few years, I've been relying less on my laptops and more on my minipcs,
vms, [tailscale](https://tailscale.com/), and vscode to enable remote coding.

This set up lets me be outdoors or remote with decent compute performance and the bandwidth of 
my wired home connection of 2.5 Gbps.  

Opencode enables an evolution of this setup where I can use my phone, tablet or laptop with 
tailscale to configure the next prompt and then switch my attention
to something else without being glued to the chair all day. 

To setup opencode to run the webserver in a way that binds to localhost and tailscale, you would
need to run something like the following command:

```bash
opencode web --port 6767 --hostname 0.0.0.0 &
```


