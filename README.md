# 3D Neighborhood Relocation Matcher

## Overview
The 3D Neighborhood Relocation Matcher is an interactive home discovery application that pairs relocating buyers with candidate neighborhoods and properties through dual-commute optimization, neighborhood vibe profiling, 15-minute walkability radii, and cinematic 3D realtor tours. The demo showcases Google AI Studio integration with Google Maps Platform by pairing Photorealistic 3D cityscapes, interactive 3D markers, and live Places API queries with Gemini 3.8 and Gemini TTS to generate personalized realtor summaries and voice pitches for each prospective home.

## Google Maps Platform Products & Features
- Maps JavaScript API
- Photorealistic 3D Maps
- 3D Interactive Markers
- 3D Camera Controls and Animations
- Places API
- Places Library, Maps JavaScript API
- Place Autocomplete
- Places Nearby Search
- Place Review Summaries
- Geocoding API

## Map-First & Collapsible UI Architecture
- **Persistent Map Viewport**: Google Maps Photorealistic 3D element and 2D Satellite fallback are prioritized as the dominant visual canvas across Mobile, Tablet, and Desktop.
- **Collapsible Panes & Sheets**:
  - **Desktop/Tablet**: Collapsible right sidebar with slide handle that smoothly transitions to a 56px slim icon rail or 100% full-bleed map.
  - **Mobile Portrait**: Full-bleed map (`inset-0`) paired with a lightweight bottom sheet (64px peek state, 55vh expanded, or hidden).
  - **Mobile Landscape**: Landscape-aware compact drawer that preserves vertical map aspect ratios.
  - **Mobile Discovery Density**: Swipe discovery cards adaptively collapse detailed criteria breakdowns on mobile into clean, concise summaries with one-tap expandable details.
- **One-Click Zen Mode**: Master toggle to declutter all floating cards and HUD overlays with a discreet floating restore button.
- **Dynamic Resize Resilience**: `ResizeObserver` listener automatically triggers Google Maps canvas reflow and re-centering during container transitions.
- **Orientation & Viewport Safety**: Dialogs ([MatchedModal.tsx](file:///Users/moreirac/Downloads/relocation-matcher/src/components/MatchedModal.tsx), [ApiKeyModal.tsx](file:///Users/moreirac/Downloads/relocation-matcher/src/components/ApiKeyModal.tsx)) feature dynamic viewport bounds (`max-h-[90dvh] overflow-y-auto`) ensuring all interactive CTAs remain accessible in horizontal mode.

## Terms of Service
This demo uses Google Maps Platform APIs and is subject to the [Google Maps Platform Terms of Service](https://cloud.google.com/maps-platform/terms/).

## Disclaimer & Support
*This applet is a demonstration to showcase what can be built using Google Maps Platform and Google AI Studio. It is provided as-is for educational and demonstration purposes only and does not come with a Service Level Agreement (SLA) or official support.*
