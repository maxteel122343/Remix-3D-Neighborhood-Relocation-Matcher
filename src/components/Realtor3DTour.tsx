import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Compass,
  Play,
  Pause,
  RotateCw,
  Home,
  GraduationCap,
  Sparkles,
  Footprints,
  Train,
  TreePine,
  Coffee,
  X,
  MapPin,
  Clock,
  Layers,
  Volume2,
  VolumeX,
  ArrowLeft,
  Maximize2,
  Minimize2,
  PanelRightClose,
  PanelRightOpen,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Navigation,
  CheckCircle2,
  Building2,
  Utensils,
  Loader2,
  ExternalLink,
  MessageSquare,
  Star,
  Bot,
  AlertCircle
} from 'lucide-react';
import { CandidateHome, RealtorTourStop, WalkabilityPoi, BuyerPreferences } from '../types';
import { generateWalkabilityCircle, getCategoryStyle, formatWalkTime } from '../utils/geoUtils';
import { loadGoogleMapsScript } from '../utils';
import { enrichCandidateWithRealPlaces, fetchPlaceReviewSummary, GooglePlaceReviewSummary } from '../services/googlePlacesService';

interface Realtor3DTourProps {
  home: CandidateHome;
  onBackToSwipe: () => void;
  apiKey: string;
  preferences?: BuyerPreferences;
  isActive?: boolean;
}

export interface UnifiedTourLocation {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  category: 'Home Base' | 'Top School' | 'Transit Link' | 'Artisan Hub' | 'Nature & Park' | 'Dining & Vibe';
  categoryType: 'home' | 'school' | 'transit' | 'cafe' | 'park' | 'grocery' | 'dining' | 'gym';
  lat: number;
  lng: number;
  altitude: number;
  camRange: number;
  camTilt: number;
  camHeading: number;
  walkMinutesFromHome: number;
  distanceMeters: number;
  realtorPitch: string;
  highlights: string[];
  altitudeMode?: string;
  rating?: number;
  placeId?: string;
  icon: string;
}

export const Realtor3DTour: React.FC<Realtor3DTourProps> = ({
  home,
  onBackToSwipe,
  apiKey,
  preferences,
  isActive = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map3DElementRef = useRef<any>(null);
  const map2DInstanceRef = useRef<any>(null);
  const map2DMarkersRef = useRef<any[]>([]);
  const map2DCircleRef = useRef<any>(null);

  // Map display mode: '3d' photorealistic or '2d' satellite/hybrid
  const [mapViewMode, setMapViewMode] = useState<'3d' | '2d'>('3d');
  const [is3DMapLoaded, setIs3DMapLoaded] = useState<boolean>(false);
  const [map3DError, setMap3DError] = useState<string | null>(null);
  const [ttsError, setTtsError] = useState<string | null>(null);

  // Auto-dismiss TTS error notice after 7 seconds
  useEffect(() => {
    if (!ttsError) return;
    const timer = setTimeout(() => setTtsError(null), 7000);
    return () => clearTimeout(timer);
  }, [ttsError]);

  // Local state for dynamically enriched home with Google Places
  const [activeHome, setActiveHome] = useState<CandidateHome>(home);
  const [activeLocationIndex, setActiveLocationIndex] = useState<number>(0);
  const [isPlayingAutoTour, setIsPlayingAutoTour] = useState<boolean>(false);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(false);
  const [showWalkabilityRing, setShowWalkabilityRing] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isTtsLoading, setIsTtsLoading] = useState<boolean>(false);
  const [isEnrichingPlaces, setIsEnrichingPlaces] = useState<boolean>(false);

  // AI-generated realtor personalized summary pitch state (Gemini 3.8 Flash + Gemini TTS)
  const [realtorSummaryScript, setRealtorSummaryScript] = useState<string | null>(null);

  // Review Summaries state & Gemini TTS reader for hotspots
  const [activeReviewSummary, setActiveReviewSummary] = useState<GooglePlaceReviewSummary | null>(null);
  const [isLoadingReviewSummary, setIsLoadingReviewSummary] = useState<boolean>(false);
  const [isSpeakingReview, setIsSpeakingReview] = useState<boolean>(false);
  const [isReviewTtsLoading, setIsReviewTtsLoading] = useState<boolean>(false);
  const [isReviewCardDismissed, setIsReviewCardDismissed] = useState<boolean>(false);

  // Audio elements & cache for Gemini TTS
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioAbortControllerRef = useRef<AbortController | null>(null);
  const ttsAudioCacheRef = useRef<Map<string, string>>(new Map());

  // Collapsible UI States (Map-First Architecture across Mobile, Tablet, Desktop)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const [mobileSheetState, setMobileSheetState] = useState<'peek' | 'expanded' | 'hidden'>('peek');
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [isHudMinimized, setIsHudMinimized] = useState<boolean>(false);
  const [isMobileLandscapeDrawerOpen, setIsMobileLandscapeDrawerOpen] = useState<boolean>(false);

  // Container ResizeObserver to notify Google Maps 3D & 2D instances on collapse/expand
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'));
      if (map2DInstanceRef.current && (window as any).google?.maps?.event) {
        (window as any).google.maps.event.trigger(map2DInstanceRef.current, 'resize');
      }
    });
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard shortcut: Escape exits Zen Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZenMode]);

  // Sync with prop home and query Google Places Nearby Search
  useEffect(() => {
    let isMounted = true;
    setActiveHome(home);
    setActiveLocationIndex(0);
    setRealtorSummaryScript(null);

    // Enrich with live Google Places API nearby search
    setIsEnrichingPlaces(true);
    enrichCandidateWithRealPlaces(home, apiKey)
      .then((enriched) => {
        if (isMounted && enriched) {
          setActiveHome(enriched);
        }
      })
      .catch((err) => {
        console.warn('Places enrichment notice:', err);
      })
      .finally(() => {
        if (isMounted) setIsEnrichingPlaces(false);
      });

    return () => {
      isMounted = false;
    };
  }, [home.id, apiKey]);

  // Build unified, indexed tour locations list strictly aligned with 3D markers and right pane
  const allLocations = useMemo<UnifiedTourLocation[]>(() => {
    const list: UnifiedTourLocation[] = [];

    // 1. Index 0: Home Base
    list.push({
      id: `loc-home-${activeHome.id}`,
      index: 0,
      title: activeHome.title,
      subtitle: `${activeHome.address}, ${activeHome.neighborhood}`,
      category: 'Home Base',
      categoryType: 'home',
      lat: activeHome.lat,
      lng: activeHome.lng,
      altitude: activeHome.altitude || 40,
      camRange: activeHome.camRange || 260,
      camTilt: activeHome.camTilt || 58,
      camHeading: activeHome.camHeading || 310,
      walkMinutesFromHome: 0,
      distanceMeters: 0,
      realtorPitch: activeHome.vibeDescription,
      highlights: activeHome.walkabilityHighlights || activeHome.vibeTags || ['Imóvel Selecionado', 'Localização Privilegiada'],
      rating: 5.0,
      icon: 'home'
    });

    // 2. Add tour stops defined on the realtor profile if any (e.g. School & Transit)
    const predefinedStops = activeHome.realtor?.tourStops || [];
    predefinedStops.forEach((stop, sIdx) => {
      if (sIdx === 0) return; // Home already added
      const catType =
        stop.category === 'Top School'
          ? 'school'
          : stop.category === 'Transit Link'
          ? 'transit'
          : stop.category === 'Nature & Park'
          ? 'park'
          : stop.category === 'Dining & Vibe'
          ? 'cafe'
          : 'cafe';

      list.push({
        id: stop.id || `loc-stop-${sIdx}`,
        index: list.length,
        title: stop.title,
        subtitle: stop.subtitle || `${formatWalkTime(stop.walkMinutesFromHome || 4)} from home`,
        category: stop.category,
        categoryType: catType,
        lat: stop.lat,
        lng: stop.lng,
        altitude: stop.altitude || 45,
        camRange: stop.camRange || 330,
        camTilt: stop.camTilt || 56,
        camHeading: stop.camHeading || (sIdx * 60) % 360,
        walkMinutesFromHome: stop.walkMinutesFromHome || 4,
        distanceMeters: Math.round((stop.walkMinutesFromHome || 4) * 75),
        realtorPitch: stop.realtorPitch,
        highlights: stop.highlights || [],
        rating: 4.8,
        placeId: stop.placeId,
        icon: stop.icon || 'map-pin'
      });
    });

    // 3. Add Walkability POIs from Google Places that are not yet in list
    (activeHome.walkabilityPois || []).forEach((poi, pIdx) => {
      // Check if location with very close coordinates or same title is already present
      const alreadyExists = list.some(
        (existing) =>
          existing.title.toLowerCase() === poi.name.toLowerCase() ||
          (Math.abs(existing.lat - poi.lat) < 0.0003 && Math.abs(existing.lng - poi.lng) < 0.0003)
      );

      if (!alreadyExists) {
        const catLabel =
          poi.category === 'school'
            ? 'Top School'
            : poi.category === 'transit'
            ? 'Transit Link'
            : poi.category === 'park'
            ? 'Nature & Park'
            : poi.category === 'cafe'
            ? 'Dining & Vibe'
            : 'Artisan Hub';

        list.push({
          id: poi.id || `loc-poi-${pIdx}`,
          index: list.length,
          title: poi.name,
          subtitle: poi.description || `${formatWalkTime(poi.walkMinutes)} (${poi.distanceMeters}m)`,
          category: catLabel,
          categoryType: poi.category as any,
          lat: poi.lat,
          lng: poi.lng,
          altitude: poi.altitude || 30,
          camRange: 320,
          camTilt: 60,
          camHeading: (list.length * 55) % 360,
          walkMinutesFromHome: poi.walkMinutes || 3,
          distanceMeters: poi.distanceMeters || 220,
          realtorPitch: poi.description || `Certified point of interest located ${formatWalkTime(poi.walkMinutes)} away.`,
          highlights: [`${formatWalkTime(poi.walkMinutes)}`, `${poi.distanceMeters}m distance`, `Google Rating ${poi.rating || 4.8}★`],
          rating: poi.rating || 4.8,
          placeId: poi.placeId,
          icon: poi.category
        });
      }
    });

    return list;
  }, [activeHome]);

  // Current active location item
  const currentLocation: UnifiedTourLocation = allLocations[activeLocationIndex] || allLocations[0];

  // Synchronized refs to avoid re-triggering map lifecycle
  const allLocationsRef = useRef<UnifiedTourLocation[]>([]);
  allLocationsRef.current = allLocations;

  // Smooth camera flight helper ensuring coordinates strictly match
  const flyCameraToLocation = useCallback((loc: UnifiedTourLocation, durationMs: number = 2600) => {
    if (!loc) return;

    // Handle 2D satellite map panning
    if (map2DInstanceRef.current) {
      try {
        const targetLat = typeof loc.lat === 'number' ? loc.lat : parseFloat(loc.lat as any);
        const targetLng = typeof loc.lng === 'number' ? loc.lng : parseFloat(loc.lng as any);
        map2DInstanceRef.current.panTo({ lat: targetLat, lng: targetLng });
        map2DInstanceRef.current.setZoom(18);
      } catch (e) {}
    }

    const map3DEl = map3DElementRef.current;
    if (!map3DEl) return;

    try {
      // Stop any ongoing orbit or previous flight before starting the new camera animation
      if (typeof map3DEl.stopCameraAnimation === 'function') {
        try {
          map3DEl.stopCameraAnimation();
        } catch (e) {}
      }

      const targetLat = typeof loc.lat === 'number' ? loc.lat : parseFloat(loc.lat as any);
      const targetLng = typeof loc.lng === 'number' ? loc.lng : parseFloat(loc.lng as any);
      // Ensure the camera center is safely elevated above ground level (preventing subterranean clipping)
      const targetAlt = Math.max(loc.altitude || 50, 60);
      // Ensure range is comfortable for neighborhood aerial context without grazing ground elements
      const targetRange = Math.max(loc.camRange || 450, 400);
      // Moderate the tilt to prevent extreme low-angle ground collision
      const targetTilt = Math.min(loc.camTilt || 52, 55);
      const targetHeading = loc.camHeading || 0;

      if (typeof map3DEl.flyCameraTo === 'function') {
        map3DEl.flyCameraTo({
          endCamera: {
            center: {
              lat: targetLat,
              lng: targetLng,
              altitude: targetAlt
            },
            range: targetRange,
            tilt: targetTilt,
            heading: targetHeading
          },
          durationMillis: durationMs
        });
      } else {
        // Fallback imperative attribute assignment
        map3DEl.center = { lat: targetLat, lng: targetLng, altitude: targetAlt };
        map3DEl.range = targetRange;
        map3DEl.tilt = targetTilt;
        map3DEl.heading = targetHeading;
      }
    } catch (err) {
      console.warn('Camera flight notice:', err);
    }
  }, []);

  // Universal selection handler: triggers camera, updates active index, and updates narration
  const handleSelectLocation = useCallback(
    (index: number) => {
      const locations = allLocationsRef.current;
      if (!locations || locations.length === 0) return;

      const clampedIndex = Math.max(0, Math.min(index, locations.length - 1));
      setActiveLocationIndex(clampedIndex);
      setIsReviewCardDismissed(false);

      const targetLoc = locations[clampedIndex];
      if (targetLoc) {
        flyCameraToLocation(targetLoc, 2400);
      }
    },
    [flyCameraToLocation]
  );

  const handleNextLocation = useCallback(() => {
    const locations = allLocationsRef.current;
    if (!locations || locations.length === 0) return;

    setActiveLocationIndex((prevIdx) => {
      const nextIdx = (prevIdx + 1) % locations.length;
      const nextLoc = locations[nextIdx];
      if (nextLoc) {
        flyCameraToLocation(nextLoc, 2400);
      }
      return nextIdx;
    });
    setIsReviewCardDismissed(false);
  }, [flyCameraToLocation]);

  const handlePrevLocation = useCallback(() => {
    const locations = allLocationsRef.current;
    if (!locations || locations.length === 0) return;

    setActiveLocationIndex((prevIdx) => {
      const prev = (prevIdx - 1 + locations.length) % locations.length;
      const prevLoc = locations[prev];
      if (prevLoc) {
        flyCameraToLocation(prevLoc, 2400);
      }
      return prev;
    });
    setIsReviewCardDismissed(false);
  }, [flyCameraToLocation]);

  // Helper to build and attach 3D markers to the Google 3D Map
  const attachMarkersTo3DMap = useCallback(
    async (map3DEl: any, locations: UnifiedTourLocation[], activeIdx: number) => {
      if (!map3DEl || !locations || locations.length === 0) return;

      // Clear existing children markers safely without destroying the map instance
      const existingMarkers = map3DEl.querySelectorAll('gmp-marker-3d, gmp-marker-3d-interactive');
      existingMarkers.forEach((m: any) => {
        try {
          m.remove();
        } catch (e) {}
      });

      try {
        const google = (window as any).google;
        let Marker3DInteractive = null;
        let Marker3D = null;
        let Pin = null;

        if (google?.maps?.importLibrary) {
          try {
            const maps3dLib = await google.maps.importLibrary('maps3d');
            Marker3DInteractive = maps3dLib.Marker3DInteractiveElement;
            Marker3D = maps3dLib.Marker3DElement;
          } catch (e) {}

          try {
            const markerLib = await google.maps.importLibrary('marker');
            Pin = markerLib.PinElement;
          } catch (e) {}
        }

        const MarkerConstructor = Marker3DInteractive || Marker3D;

        // Loop over each item in locations with guaranteed 1:1 index matching
        locations.forEach((loc, idx) => {
          const isActive = activeIdx === idx;

          let glyphChar = '📍';
          let pinBg = '#64748b';

          if (loc.categoryType === 'home') {
            glyphChar = '🏠';
            pinBg = isActive ? '#f59e0b' : '#0f172a';
          } else if (loc.categoryType === 'school') {
            glyphChar = '🎓';
            pinBg = isActive ? '#f59e0b' : '#3b82f6';
          } else if (loc.categoryType === 'transit') {
            glyphChar = '🚆';
            pinBg = isActive ? '#f59e0b' : '#10b981';
          } else if (loc.categoryType === 'cafe' || loc.categoryType === 'dining') {
            glyphChar = '☕';
            pinBg = isActive ? '#f59e0b' : '#f97316';
          } else if (loc.categoryType === 'park') {
            glyphChar = '🌳';
            pinBg = isActive ? '#f59e0b' : '#22c55e';
          } else if (loc.categoryType === 'grocery') {
            glyphChar = '🛒';
            pinBg = isActive ? '#f59e0b' : '#a855f7';
          }

          if (MarkerConstructor && Pin) {
            const pin = new Pin({
              background: pinBg,
              borderColor: isActive ? '#ffffff' : '#e2e8f0',
              glyphColor: isActive ? '#020617' : '#ffffff',
              glyphText: glyphChar,
              scale: isActive ? 1.8 : loc.categoryType === 'home' ? 1.4 : 1.2
            });

            const marker = new MarkerConstructor({
              position: { lat: loc.lat, lng: loc.lng, altitude: (loc.altitude || 20) + (isActive ? 12 : 8) },
              altitudeMode: loc.altitudeMode || 'RELATIVE_TO_MESH',
              extruded: true,
              label: loc.title,
              title: `${loc.title} (${loc.subtitle})`
            });

            marker.appendChild(pin);
            marker.addEventListener('gmp-click', () => handleSelectLocation(idx));
            map3DEl.appendChild(marker);
          } else {
            // Fallback custom element declaration with interactive tag
            const marker = document.createElement('gmp-marker-3d-interactive') as any;
            marker.setAttribute('position', `${loc.lat},${loc.lng},${(loc.altitude || 20) + 8}`);
            marker.setAttribute('altitude-mode', 'RELATIVE_TO_MESH');
            marker.setAttribute('extruded', 'true');
            marker.setAttribute('label', loc.title);
            marker.addEventListener('gmp-click', () => handleSelectLocation(idx));
            map3DEl.appendChild(marker);
          }
        });
      } catch (e) {
        console.warn('3D Marker generation note:', e);
      }
    },
    [handleSelectLocation]
  );

  // Initialize and mount Google Maps 3D Web Component
  useEffect(() => {
    if (mapViewMode !== '3d' || !mapContainerRef.current || !isActive) return;

    let isCancelled = false;
    let initialCameraTimer: any = null;
    let steadyTimeout: any = null;
    setIs3DMapLoaded(false);
    setMap3DError(null);

    const init3D = async () => {
      try {
        // Load Google Maps JavaScript API with maps3d library using VITE_GOOGLE_MAPS_API_KEY
        await loadGoogleMapsScript(apiKey);
        const google = (window as any).google;
        if (!google?.maps) {
          throw new Error('Google Maps JavaScript API could not be loaded.');
        }

        // Guarantee maps3d library and custom element registration
        if (google.maps.importLibrary) {
          try {
            await google.maps.importLibrary('maps3d');
            await google.maps.importLibrary('marker');
          } catch (e) {}
        }
        if (typeof customElements !== 'undefined' && customElements.whenDefined) {
          try {
            await customElements.whenDefined('gmp-map-3d');
          } catch (e) {}
        }

        if (isCancelled || !mapContainerRef.current) return;

        // Clear previous map instance if any
        mapContainerRef.current.innerHTML = '';

        const map3DEl = document.createElement('gmp-map-3d') as any;
        // REQUIRED: mode="hybrid" is mandatory for <gmp-map-3d> to load tiles
        map3DEl.setAttribute('mode', 'hybrid');
        map3DEl.setAttribute('internal-usage-attribution-ids', 'gmp_mcp_codeassist_v1_aistudio');
        map3DEl.setAttribute('gesture-handling', 'greedy');
        map3DEl.setAttribute('center', `${activeHome.lat},${activeHome.lng},${Math.max(activeHome.altitude || 50, 60)}`);
        map3DEl.setAttribute('range', `${Math.max(activeHome.camRange || 450, 420)}`);
        map3DEl.setAttribute('tilt', `${Math.min(activeHome.camTilt || 52, 55)}`);
        map3DEl.setAttribute('heading', `${activeHome.camHeading || 315}`);
        map3DEl.style.width = '100%';
        map3DEl.style.height = '100%';
        map3DEl.style.display = 'block';

        // Assign imperative properties
        try {
          map3DEl.mode = 'HYBRID';
          map3DEl.internalUsageAttributionIds = ['gmp_mcp_codeassist_v1_aistudio'];
          map3DEl.center = { lat: activeHome.lat, lng: activeHome.lng, altitude: Math.max(activeHome.altitude || 50, 60) };
          map3DEl.range = Math.max(activeHome.camRange || 450, 420);
          map3DEl.tilt = Math.min(activeHome.camTilt || 52, 55);
          map3DEl.heading = activeHome.camHeading || 315;
        } catch (e) {}

        map3DElementRef.current = map3DEl;
        mapContainerRef.current.appendChild(map3DEl);

        // Initial camera alignment to ensure 3D photorealistic map starts with ground-relative altitude & angle
        let hasFlownInitial = false;
        const triggerInitialCamera = (durationMs: number = 1400) => {
          if (hasFlownInitial || isCancelled) return;
          const mapEl = map3DElementRef.current;
          if (!mapEl || typeof mapEl.flyCameraTo !== 'function') return;

          const locations = allLocationsRef.current;
          const initialLoc = locations[activeLocationIndex] || locations[0] || {
            lat: activeHome.lat,
            lng: activeHome.lng,
            altitude: activeHome.altitude || 50,
            camRange: activeHome.camRange || 450,
            camTilt: activeHome.camTilt || 52,
            camHeading: activeHome.camHeading || 315
          };

          try {
            flyCameraToLocation(initialLoc as any, durationMs);
            hasFlownInitial = true;
          } catch (err) {
            console.warn('Initial camera alignment scheduled retry:', err);
          }
        };

        const handleReady = () => {
          if (!isCancelled) {
            setIs3DMapLoaded(true);
            triggerInitialCamera(1200);
          }
        };

        const handleError = (e: any) => {
          console.warn('Google 3D Map event notice:', e);
        };

        map3DEl.addEventListener('gmp-load', handleReady);
        map3DEl.addEventListener('gmp-steadystate', handleReady);
        map3DEl.addEventListener('gmp-error', handleError);

        // Initial trigger timer so camera immediately glides into proper ground perspective upon start
        initialCameraTimer = setTimeout(() => {
          triggerInitialCamera(1400);
        }, 450);

        // Fallback steady state mark
        steadyTimeout = setTimeout(() => {
          if (!isCancelled && !map3DError) {
            setIs3DMapLoaded(true);
            triggerInitialCamera(1000);
          }
        }, 2200);
      } catch (err: any) {
        console.warn('3D Map initialization notice:', err);
        if (!isCancelled) {
          setMap3DError(err?.message || 'Error initializing 3D Map');
        }
      }
    };

    init3D();

    return () => {
      isCancelled = true;
      clearTimeout(initialCameraTimer);
      clearTimeout(steadyTimeout);
      if (map3DElementRef.current && typeof map3DElementRef.current.stopCameraAnimation === 'function') {
        try {
          map3DElementRef.current.stopCameraAnimation();
        } catch (e) {}
      }
      map3DElementRef.current = null;
    };
  }, [activeHome.id, mapViewMode, apiKey, isActive, flyCameraToLocation]);

  // Initialize and mount Google Maps 2D Satellite/Hybrid View (Robust Fallback & Alternative)
  useEffect(() => {
    if (mapViewMode !== '2d' || !mapContainerRef.current || !isActive) return;

    let isCancelled = false;
    const init2D = async () => {
      try {
        let google = (window as any).google;
        if (!google?.maps) {
          await loadGoogleMapsScript(apiKey);
          google = (window as any).google;
        }
        if (!google?.maps) return;

        // Ensure libraries are imported
        if (google.maps.importLibrary) {
          try {
            await google.maps.importLibrary('maps');
            await google.maps.importLibrary('marker');
          } catch (e) {}
        }

        if (isCancelled || !mapContainerRef.current) return;

        // Clear previous map instance
        mapContainerRef.current.innerHTML = '';

        const mapDiv = document.createElement('div');
        mapDiv.style.width = '100%';
        mapDiv.style.height = '100%';
        mapContainerRef.current.appendChild(mapDiv);

        const map2D = new google.maps.Map(mapDiv, {
          center: { lat: activeHome.lat, lng: activeHome.lng },
          zoom: 17,
          mapTypeId: 'hybrid',
          tilt: 45,
          heading: activeHome.camHeading || 0,
          mapId: 'DEMO_MAP_ID',
          internalUsageAttributionIds: ['gmp_aistudio_relocationmatcher_v1.0.0'],
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          rotateControl: true,
        } as any);

        map2DInstanceRef.current = map2D;

        // Render 15-minute walkability circle if enabled
        if (showWalkabilityRing) {
          map2DCircleRef.current = new google.maps.Circle({
            map: map2D,
            center: { lat: activeHome.lat, lng: activeHome.lng },
            radius: 1200,
            fillColor: '#f59e0b',
            fillOpacity: 0.12,
            strokeColor: '#f59e0b',
            strokeOpacity: 0.65,
            strokeWeight: 2,
          });
        }

        // Render 2D Markers
        const MarkerLibrary = google.maps.marker;
        const AdvancedMarker = MarkerLibrary?.AdvancedMarkerElement;
        const Pin = MarkerLibrary?.PinElement;

        const markers: any[] = [];
        allLocations.forEach((loc, idx) => {
          const isActive = idx === activeLocationIndex;
          let pinBg = '#64748b';
          let glyph = '📍';
          if (loc.categoryType === 'home') {
            glyph = '🏠';
            pinBg = isActive ? '#f59e0b' : '#0f172a';
          } else if (loc.categoryType === 'school') {
            glyph = '🎓';
            pinBg = isActive ? '#f59e0b' : '#3b82f6';
          } else if (loc.categoryType === 'transit') {
            glyph = '🚆';
            pinBg = isActive ? '#f59e0b' : '#10b981';
          } else if (loc.categoryType === 'cafe' || loc.categoryType === 'dining') {
            glyph = '☕';
            pinBg = isActive ? '#f59e0b' : '#f97316';
          } else if (loc.categoryType === 'park') {
            glyph = '🌳';
            pinBg = isActive ? '#f59e0b' : '#22c55e';
          }

          if (AdvancedMarker && Pin) {
            const pin = new Pin({
              background: pinBg,
              borderColor: isActive ? '#ffffff' : '#e2e8f0',
              glyphColor: isActive ? '#020617' : '#ffffff',
              glyphText: glyph,
              scale: isActive ? 1.4 : 1.1,
            });

            const marker = new AdvancedMarker({
              map: map2D,
              position: { lat: loc.lat, lng: loc.lng },
              title: loc.title,
              content: pin,
              gmpClickable: true,
            });

            marker.addListener('gmp-click', () => handleSelectLocation(idx));
            markers.push(marker);
          }
        });

        map2DMarkersRef.current = markers;
      } catch (e) {
        console.warn('2D Map init notice:', e);
      }
    };

    init2D();

    return () => {
      isCancelled = true;
      if (map2DCircleRef.current) {
        try { map2DCircleRef.current.setMap(null); } catch (e) {}
        map2DCircleRef.current = null;
      }
      if (map2DMarkersRef.current) {
        map2DMarkersRef.current.forEach((m) => {
          try { m.map = null; m.setMap?.(null); } catch (e) {}
        });
        map2DMarkersRef.current = [];
      }
      map2DInstanceRef.current = null;
    };
  }, [mapViewMode, activeHome.id, allLocations, activeLocationIndex, handleSelectLocation, showWalkabilityRing, isActive]);

  // Update 3D markers whenever location list or active location index changes without destroying the map
  useEffect(() => {
    if (map3DElementRef.current) {
      attachMarkersTo3DMap(map3DElementRef.current, allLocations, activeLocationIndex);
    }
  }, [allLocations, activeLocationIndex, attachMarkersTo3DMap]);

  // 360-Degree Orbit Around Current Stop
  const handleToggleOrbit = () => {
    const map3DEl = map3DElementRef.current;
    if (!map3DEl) return;

    if (isOrbiting) {
      if (typeof map3DEl.stopCameraAnimation === 'function') {
        try {
          map3DEl.stopCameraAnimation();
        } catch (e) {}
      }
      setIsOrbiting(false);
    } else {
      if (typeof map3DEl.flyCameraAround === 'function') {
        map3DEl.flyCameraAround({
          camera: {
            center: {
              lat: currentLocation.lat,
              lng: currentLocation.lng,
              altitude: Math.max(currentLocation.altitude || 50, 60)
            },
            range: Math.max(currentLocation.camRange || 450, 420),
            tilt: Math.min(currentLocation.camTilt || 52, 55)
          },
          durationMillis: 24000,
          rounds: 1
        });
      }
      setIsOrbiting(true);
    }
  };

  // Auto-tour progression timer
  useEffect(() => {
    let interval: any = null;
    if (isPlayingAutoTour && allLocations.length > 0) {
      interval = setInterval(() => {
        setActiveLocationIndex((prev) => {
          const next = (prev + 1) % allLocations.length;
          flyCameraToLocation(allLocations[next], 3200);
          return next;
        });
      }, 7500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAutoTour, allLocations, flyCameraToLocation]);

  // Stop any active Gemini TTS playback
  const stopAudioNarration = useCallback(() => {
    if (audioAbortControllerRef.current) {
      audioAbortControllerRef.current.abort();
      audioAbortControllerRef.current = null;
    }
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      } catch (e) {}
      currentAudioRef.current = null;
    }
    setIsSpeaking(false);
    setIsTtsLoading(false);
    setIsSpeakingReview(false);
    setIsReviewTtsLoading(false);
  }, []);

  // Cleanup audio when unmounting or switching candidate home
  useEffect(() => {
    return () => {
      stopAudioNarration();
    };
  }, [stopAudioNarration, home.id]);

  // Natural Voice Narration using Gemini TTS (gemini-3.1-flash-tts-preview)
  const playGeminiTtsNarration = useCallback(async (textToNarrate: string, voiceName?: string) => {
    stopAudioNarration();
    if (!textToNarrate) return;

    setIsSpeaking(true);

    const preferredVoice = voiceName || (activeHome.realtor.name.toLowerCase().includes('mariana') ? 'Kore' : 'Puck');
    const cacheKey = `${preferredVoice}_${textToNarrate.trim()}`;
    const cachedAudioUrl = ttsAudioCacheRef.current.get(cacheKey);

    // If pre-cached, play instantaneously
    if (cachedAudioUrl) {
      const audio = new Audio(cachedAudioUrl);
      currentAudioRef.current = audio;
      audio.onended = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
      try {
        await audio.play();
        return;
      } catch (e) {
        console.warn('Audio playback error:', e);
      }
    }

    // Call server endpoint running Gemini TTS model
    setIsTtsLoading(true);
    const controller = new AbortController();
    audioAbortControllerRef.current = controller;

    try {
      const response = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToNarrate,
          voiceName: preferredVoice,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `TTS server status: ${response.status}`);
      }

      const data = await response.json();
      if (controller.signal.aborted) return;

      if (data.audio) {
        ttsAudioCacheRef.current.set(cacheKey, data.audio);
        const audio = new Audio(data.audio);
        currentAudioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
        };
        await audio.play();
      } else {
        throw new Error(data.error || 'Gemini TTS audio data unavailable');
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      console.warn('Gemini TTS service notice:', err?.message || err);
      setTtsError(err?.message || 'Gemini TTS synthesis failed');
      setIsSpeaking(false);
    } finally {
      if (audioAbortControllerRef.current === controller) {
        audioAbortControllerRef.current = null;
      }
      setIsTtsLoading(false);
    }
  }, [activeHome.realtor.name, stopAudioNarration]);

  // Spoken Realtor Pitch: Gemini Flash personalized summary + Gemini TTS Voice Pitch
  const playRealtorSummaryTts = useCallback(async () => {
    stopAudioNarration();
    setIsSpeaking(true);
    setIsTtsLoading(true);

    const voice = activeHome.realtor.name.toLowerCase().includes('mariana') ? 'Kore' : 'Puck';
    const cacheKey = `summary_realtor_${activeHome.id}_${voice}`;
    const cachedAudioUrl = ttsAudioCacheRef.current.get(cacheKey);

    if (cachedAudioUrl) {
      setIsTtsLoading(false);
      const audio = new Audio(cachedAudioUrl);
      currentAudioRef.current = audio;
      audio.onended = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
      try {
        await audio.play();
        return;
      } catch (e) {
        console.warn('Cached summary audio play error:', e);
      }
    }

    const controller = new AbortController();
    audioAbortControllerRef.current = controller;

    try {
      const p1 = activeHome.dualCommute?.partner1;
      const p2 = activeHome.dualCommute?.partner2;

      const candidatePayload = {
        title: activeHome.title,
        address: activeHome.address,
        neighborhood: activeHome.neighborhood,
        price: activeHome.price,
        propertyType: activeHome.propertyType || (activeHome as any).type || 'Home',
        beds: activeHome.beds,
        baths: activeHome.baths,
        sqft: activeHome.sqft,
        vibeLabel: activeHome.vibeLabel,
        vibeNarrative: activeHome.vibeDescription || activeHome.vibeLabel,
        vibeTags: activeHome.vibeTags,
        realtorName: activeHome.realtor.name,
        realtorAgency: activeHome.realtor.agency,
        dualCommute: {
          partner1: p1 ? {
            workplaceLabel: p1.workplaceLabel || preferences?.partner1Work?.name || 'Partner 1 Workplace',
            destinationName: p1.destinationName,
            driveMinutes: p1.durationMins,
            transitMinutes: p1.rushHourEstimateMins,
            deltaMinutesVsCurrent: activeHome.dualCommute?.comparisonVsCurrentMins,
          } : undefined,
          partner2: p2 ? {
            workplaceLabel: p2.workplaceLabel || preferences?.partner2Work?.name || 'Partner 2 Workplace',
            destinationName: p2.destinationName,
            driveMinutes: p2.durationMins,
            transitMinutes: p2.rushHourEstimateMins,
            deltaMinutesVsCurrent: activeHome.dualCommute?.comparisonVsCurrentMins,
          } : undefined,
          totalDailySavingsMinutes: activeHome.dualCommute?.comparisonVsCurrentMins
            ? Math.abs(activeHome.dualCommute.comparisonVsCurrentMins)
            : 18,
          summaryText: activeHome.dualCommute?.savingsSummary ||
            (activeHome.dualCommute?.comparisonVsCurrentMins
              ? `${Math.abs(activeHome.dualCommute.comparisonVsCurrentMins)} minutes commute advantage`
              : 'Well-balanced dual commute for both workplaces'),
        },
        hotspots: allLocations
          .filter(loc => loc.categoryType !== 'home')
          .slice(0, 4)
          .map(loc => ({
            title: loc.title,
            category: loc.category,
            walkMinutes: loc.walkMinutesFromHome,
            subtitle: loc.subtitle,
          })),
      };

      const buyerContextPayload = {
        relocatingFrom: preferences?.currentHome?.neighborhood || 'your current area',
        partner1Workplace: preferences?.partner1Work?.name || p1?.destinationName || 'Partner 1 Office',
        partner2Workplace: preferences?.partner2Work?.name || p2?.destinationName || 'Partner 2 Office',
      };

      const response = await fetch('/api/gemini/realtor-summary-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate: candidatePayload,
          buyerContext: buyerContextPayload,
          voiceName: voice,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Realtor summary server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.summaryScript) {
        setRealtorSummaryScript(data.summaryScript);
      }

      if (data.audio) {
        ttsAudioCacheRef.current.set(cacheKey, data.audio);
        const audio = new Audio(data.audio);
        currentAudioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
        };
        await audio.play();
      } else {
        throw new Error(data.error || 'Gemini TTS did not return audio');
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      console.warn('Gemini TTS realtor summary notice:', err?.message || err);
      setTtsError(err?.message || 'Gemini TTS request failed');
      setIsSpeaking(false);
    } finally {
      if (audioAbortControllerRef.current === controller) {
        audioAbortControllerRef.current = null;
      }
      setIsTtsLoading(false);
    }
  }, [activeHome, allLocations, preferences, stopAudioNarration]);

  // Handle user toggling narration button
  const handleToggleSpeech = () => {
    if (isSpeaking || isTtsLoading) {
      stopAudioNarration();
    } else {
      playRealtorSummaryTts();
    }
  };

  // Automatically load Google Places Review Summary when visiting a hotspot
  useEffect(() => {
    let isCancelled = false;
    if (currentLocation && currentLocation.categoryType !== 'home') {
      setIsReviewCardDismissed(false);
      setIsLoadingReviewSummary(true);
      fetchPlaceReviewSummary(
        currentLocation.placeId,
        currentLocation.title,
        currentLocation.category,
        currentLocation.lat,
        currentLocation.lng,
        apiKey
      )
        .then((summary) => {
          if (!isCancelled) {
            setActiveReviewSummary(summary);
            setIsLoadingReviewSummary(false);
          }
        })
        .catch((err) => {
          console.warn('Place review summary loading note:', err);
          if (!isCancelled) {
            setIsLoadingReviewSummary(false);
          }
        });
    } else {
      setActiveReviewSummary(null);
      setIsLoadingReviewSummary(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [currentLocation.id, currentLocation.title, currentLocation.placeId, currentLocation.categoryType, apiKey]);

  // Read the Review Summary card aloud using Gemini TTS
  const handleToggleReviewTts = useCallback(async () => {
    if (isSpeakingReview || isReviewTtsLoading) {
      stopAudioNarration();
      return;
    }

    if (!activeReviewSummary?.text) return;

    // Stop previous audio playback
    stopAudioNarration();
    setIsSpeakingReview(true);
    setIsReviewTtsLoading(true);

    const voice = activeHome.realtor.name.toLowerCase().includes('mariana') ? 'Kore' : 'Puck';
    const textToNarrate = `Google Review Summary for ${currentLocation.title}. ${activeReviewSummary.text}`;
    const cacheKey = `review_${voice}_${textToNarrate.trim()}`;
    const cachedAudioUrl = ttsAudioCacheRef.current.get(cacheKey);

    if (cachedAudioUrl) {
      setIsReviewTtsLoading(false);
      const audio = new Audio(cachedAudioUrl);
      currentAudioRef.current = audio;
      audio.onended = () => {
        setIsSpeakingReview(false);
        currentAudioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeakingReview(false);
        currentAudioRef.current = null;
      };
      try {
        await audio.play();
        return;
      } catch (e) {
        console.warn('Review audio play error:', e);
      }
    }

    try {
      const response = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToNarrate,
          voiceName: voice,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `TTS server response error: ${response.status}`);
      }

      const data = await response.json();
      if (data.audio) {
        ttsAudioCacheRef.current.set(cacheKey, data.audio);
        const audio = new Audio(data.audio);
        currentAudioRef.current = audio;
        audio.onended = () => {
          setIsSpeakingReview(false);
          currentAudioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeakingReview(false);
          currentAudioRef.current = null;
        };
        await audio.play();
      } else {
        throw new Error(data.error || 'Gemini TTS audio content unavailable');
      }
    } catch (err: any) {
      console.warn('Gemini TTS for review summary notice:', err?.message || err);
      setTtsError(err?.message || 'Gemini TTS synthesis failed');
      setIsSpeakingReview(false);
    } finally {
      setIsReviewTtsLoading(false);
    }
  }, [activeReviewSummary, currentLocation.title, activeHome.realtor.name, isSpeakingReview, isReviewTtsLoading, stopAudioNarration]);

  // Category Icon helper
  const getCategoryIcon = (categoryType: string) => {
    switch (categoryType) {
      case 'home':
        return <Home className="w-4 h-4 text-amber-400" />;
      case 'school':
        return <GraduationCap className="w-4 h-4 text-blue-400" />;
      case 'transit':
        return <Train className="w-4 h-4 text-emerald-400" />;
      case 'park':
        return <TreePine className="w-4 h-4 text-green-400" />;
      case 'cafe':
      case 'dining':
        return <Coffee className="w-4 h-4 text-orange-400" />;
      default:
        return <MapPin className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="relative w-full h-full min-h-0 bg-slate-950 overflow-hidden flex flex-col md:flex-row">
      {/* Left Area: Map Viewport (Primary Visual Canvas across Mobile, Tablet, Desktop) */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-950 transition-all duration-300 ease-in-out">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* 3D Map Error Fallback Card */}
        {map3DError && (
          <div className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 mb-3 border border-amber-500/30">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black mb-1">3D Map Acceleration Unavailable</h3>
            <p className="text-sm text-slate-300 max-w-md mb-5 leading-relaxed">
              Photorealistic 3D rendering could not be initialized in this browser context. Switch to high-resolution 2D Satellite view with full POI pins and walkability zones.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setMap3DError(null);
                  setMapViewMode('2d');
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl transition flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Switch to 2D Satellite Map</span>
              </button>
              <button
                onClick={() => {
                  setMap3DError(null);
                  setMapViewMode('3d');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition"
              >
                Retry 3D Map
              </button>
            </div>
          </div>
        )}

        {/* Gemini TTS Error Notice Toast */}
        {ttsError && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md border border-rose-500/50 px-4 py-2.5 rounded-2xl text-white shadow-2xl flex items-center gap-3 animate-fade-in max-w-[90%] pointer-events-auto">
            <div className="flex items-center gap-2 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>Gemini TTS: {ttsError}</span>
            </div>
            <button
              onClick={() => setTtsError(null)}
              className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold ml-2 transition"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Floating Restore Pill for Zen Mode ("Clean Map") */}
        {isZenMode && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in duration-200 pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsZenMode(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-amber-300 border border-amber-500/50 shadow-2xl backdrop-blur-md text-xs font-bold transition transform hover:scale-105 active:scale-95"
              title="Exit full clean map view (or press Escape)"
            >
              <Minimize2 className="w-4 h-4 text-amber-400" />
              <span>Exit Clean Map</span>
              <span className="text-[10px] text-slate-400 font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">Esc</span>
            </button>
          </div>
        )}

        {/* Floating Reopen Sidebar Tab on Desktop/Tablet when Sidebar is Collapsed */}
        {!isZenMode && isSidebarCollapsed && (
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(false)}
            aria-label="Expand Realtor Guide & Hotspots Panel"
            title="Expand Realtor Guide & Hotspots Panel"
            className="hidden md:flex absolute top-20 right-4 z-30 items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/95 hover:bg-slate-800 text-amber-300 border border-amber-500/40 shadow-2xl backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 text-xs font-bold pointer-events-auto"
          >
            <PanelRightOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Show Realtor Guide</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-400/20 text-[10px] text-amber-200 font-mono">
              {allLocations.length} Stops
            </span>
          </button>
        )}

        {/* Floating Overlays Container (Walkability Zone, Mobile Stop HUD & Google Review Summary Card) - Placed below top control bar to prevent any overlap */}
        {!isZenMode && (
          <div className="absolute top-[48px] sm:top-[56px] left-2 sm:left-4 z-20 flex flex-col gap-2 max-w-[calc(100vw-1rem)] sm:max-w-[340px] pointer-events-none">
            {/* 1. 15-Minute Walkability Circle Indicator Overlay */}
            {showWalkabilityRing && (
              <div className="pointer-events-auto flex items-center justify-between gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border border-amber-500/35 text-slate-900 dark:text-white shadow-xl max-w-fit">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-ping shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-[11px] font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1 truncate">
                      <Footprints className="w-3 h-3 shrink-0" />
                      <span>15-Min Walk Zone</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      ~1.2km walk radius around home
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWalkabilityRing(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-400 hover:text-slate-900 dark:hover:text-white transition shrink-0 ml-1"
                  title="Dismiss walk zone indicator"
                  aria-label="Dismiss walk zone indicator"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* 2. Mobile Stop HUD (Peek or Hidden) - Positioned directly below 15-min walk zone indicator, completely clear of bottom map controls */}
            {!isMobileLandscapeDrawerOpen && (
              <div className="md:hidden pointer-events-auto">
                {/* Hidden State: Minimal Floating Restore Pill */}
                {mobileSheetState === 'hidden' && (
                  <button
                    type="button"
                    onClick={() => setMobileSheetState('peek')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-500/40 text-amber-600 dark:text-amber-300 text-xs font-bold shadow-2xl transition active:scale-95 max-w-[calc(100vw-1.5rem)] xs:max-w-[280px]"
                    aria-label={`Expand stop information: Stop ${activeLocationIndex + 1} of ${allLocations.length}`}
                  >
                    <Compass className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span className="truncate">Stop {activeLocationIndex + 1}/{allLocations.length}: {currentLocation.title}</span>
                    <ChevronUp className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                  </button>
                )}

                {/* Peek State (~64px): Positioned directly below 15-Min Walk Zone */}
                {mobileSheetState === 'peek' && (
                  <div className="rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-500/40 text-slate-900 dark:text-white shadow-2xl p-2 sm:p-2.5 flex items-center justify-between gap-1.5 sm:gap-2 transition-all w-full max-w-[340px]">
                    <div
                      className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                      onClick={() => setMobileSheetState('expanded')}
                      role="button"
                      tabIndex={0}
                      aria-label="Expand tour details"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-600 dark:text-amber-300 shrink-0 text-sm sm:text-base font-bold">
                        {getCategoryIcon(currentLocation.categoryType)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[125px] xs:max-w-[170px]">{currentLocation.title}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-700 dark:text-amber-300 font-mono shrink-0">
                            {activeLocationIndex + 1}/{allLocations.length}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                          <span>{currentLocation.category}</span>
                          {currentLocation.walkMinutesFromHome > 0 && (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">• {formatWalkTime(currentLocation.walkMinutesFromHome)}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Listen button */}
                      <button
                        type="button"
                        onClick={handleToggleSpeech}
                        disabled={isTtsLoading}
                        className="h-8 min-h-[36px] px-2 py-1 rounded-xl bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1 active:scale-95 transition shrink-0"
                        title={isSpeaking ? 'Stop voice playback' : 'Listen to summary pitch'}
                      >
                        {isTtsLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500 dark:text-amber-400" />
                        ) : (
                          <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-amber-600 dark:text-amber-200' : ''}`} />
                        )}
                        <span className="hidden xs:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
                      </button>

                      {/* Expand button */}
                      <button
                        type="button"
                        onClick={() => setMobileSheetState('expanded')}
                        aria-label="Expand tour details"
                        className="w-8 h-8 min-h-[36px] rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center justify-center border border-slate-200 dark:border-slate-700 active:scale-95 transition shrink-0"
                      >
                        <ChevronUp className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                      </button>

                      {/* Hide button */}
                      <button
                        type="button"
                        onClick={() => setMobileSheetState('hidden')}
                        aria-label="Hide sheet for full map view"
                        className="w-8 h-8 min-h-[36px] rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center border border-slate-200 dark:border-slate-700 active:scale-95 transition shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dismissed Reopen Pill on Map */}
            {currentLocation.categoryType !== 'home' && isReviewCardDismissed && (
              <button
                onClick={() => setIsReviewCardDismissed(false)}
                className="pointer-events-auto self-start flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-950/75 hover:bg-slate-100 dark:hover:bg-slate-900/90 backdrop-blur-md border border-amber-500/40 text-amber-700 dark:text-amber-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold shadow-2xl transition"
                title="Show Google Review Summary card on map"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Show Review Summary</span>
                {activeReviewSummary?.rating && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-300 font-normal">★ {activeReviewSummary.rating}</span>
                )}
              </button>
            )}

            {/* Google Places Review Summary Floating Card on Top of Map */}
            {currentLocation.categoryType !== 'home' && !isReviewCardDismissed && (
              <div className="pointer-events-auto p-3 sm:p-3.5 rounded-2xl bg-white/95 dark:bg-slate-950/85 backdrop-blur-md border border-amber-500/35 shadow-2xl shadow-black/20 dark:shadow-black/50 space-y-2 text-slate-900 dark:text-white max-w-[calc(100vw-1rem)] sm:max-w-[340px] landscape:max-w-[280px] max-h-[35vh] md:max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin transition-all duration-300">
                {/* Header with Title, Gemini Attribution Badge, and Dismiss Button */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/40 pb-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="p-1 rounded-lg bg-amber-400/20 text-amber-600 dark:text-amber-300 shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black text-slate-900 dark:text-white tracking-wide block truncate">
                        Review Summary
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-300 block truncate max-w-[170px] sm:max-w-[220px]">
                        {currentLocation.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {activeReviewSummary?.disclosureText && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                        <Bot className="w-2.5 h-2.5 text-amber-300" />
                        <span className="hidden xs:inline">{activeReviewSummary.disclosureText}</span>
                      </span>
                    )}
                    {/* Dismiss Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (isSpeakingReview) {
                          stopAudioNarration();
                        }
                        setIsReviewCardDismissed(true);
                      }}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 flex items-center justify-center transition border border-slate-700/60"
                      title="Dismiss review summary card"
                      aria-label="Dismiss review summary card"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body: Loading State or Loaded Content */}
                {isLoadingReviewSummary ? (
                  <div className="py-3 flex items-center justify-center gap-2 text-xs text-amber-300/90 font-medium">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Loading summary with Gemini...</span>
                  </div>
                ) : activeReviewSummary ? (
                  <>
                    <p className="text-xs text-slate-100 leading-relaxed font-normal bg-black/40 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 shadow-inner">
                      "{activeReviewSummary.text}"
                    </p>

                    {/* Top Attributes / Reviewer Sentiment Badges */}
                    {activeReviewSummary.topAttributes && activeReviewSummary.topAttributes.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1">
                        {activeReviewSummary.topAttributes.map((attr, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-slate-900/60 text-slate-200 border border-slate-700/60 backdrop-blur-xs flex items-center gap-1"
                          >
                            <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                            {attr}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Rating & Attribution Link */}
                    <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px]">
                      {activeReviewSummary.rating ? (
                        <div className="flex items-center gap-1 text-slate-300">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-white text-xs">{activeReviewSummary.rating}</span>
                          {activeReviewSummary.userRatingsTotal && (
                            <span className="text-slate-400 text-[10px]">({activeReviewSummary.userRatingsTotal}+)</span>
                          )}
                        </div>
                      ) : (
                        <div className="text-slate-400 text-[10px]">Google Maps</div>
                      )}
                      {activeReviewSummary.reviewsUri && (
                        <a
                          href={typeof activeReviewSummary.reviewsUri === 'string' && /^https?:\/\//i.test(activeReviewSummary.reviewsUri.trim()) ? activeReviewSummary.reviewsUri.trim() : '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition underline decoration-amber-500/40 text-[10px]"
                        >
                          <span>Reviews</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    {/* Gemini TTS Audio Playback Button */}
                    <button
                      onClick={handleToggleReviewTts}
                      disabled={isReviewTtsLoading}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 mt-1 ${
                        isSpeakingReview
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/25'
                          : isReviewTtsLoading
                          ? 'bg-slate-800/80 text-amber-300 border-amber-400/30 cursor-wait'
                          : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 hover:border-amber-400 shadow-sm backdrop-blur-xs'
                      }`}
                      title="Read this Google Review Summary using Gemini TTS natural voice narration"
                    >
                      {isReviewTtsLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      ) : isSpeakingReview ? (
                        <Volume2 className="w-3.5 h-3.5 animate-pulse text-slate-950" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span className="truncate">
                        {isReviewTtsLoading
                          ? 'Synthesizing Voice...'
                          : isSpeakingReview
                          ? 'Pause Voice'
                          : 'Read Summary (Gemini TTS)'}
                      </span>
                    </button>
                  </>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* Top Navigation & Control Bar (Single Coordinated Row, Collision-Free, Fully Responsive) */}
        {!isZenMode && (
          <div className="absolute top-2 sm:top-3 inset-x-2 sm:inset-x-4 z-30 flex items-center justify-between gap-1 sm:gap-2 pointer-events-none">
            {/* Left: Return to Discovery / Swipe Deck */}
            <div className="pointer-events-auto flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={onBackToSwipe}
                aria-label="Return to match discovery deck"
                title="Return to match discovery deck"
                className="w-8 h-8 sm:w-auto sm:min-h-[38px] sm:px-3 sm:py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 text-xs font-bold backdrop-blur-md shadow-xl transition flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>

            {/* Right: Map Actions & Mode Controls (Compact & Scaled for Mobile) */}
            <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Map Mode Switcher (3D Photorealistic / 2D Satellite) */}
              <div className="flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl p-0.5 sm:p-1 border border-slate-200 dark:border-slate-700/80 shadow-xl shrink-0" role="group" aria-label="Map view mode">
                <button
                  type="button"
                  onClick={() => setMapViewMode('3d')}
                  aria-pressed={mapViewMode === '3d'}
                  className={`h-8 sm:min-h-[34px] px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0 ${
                    mapViewMode === '3d'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Cinematic 3D Photorealistic Map"
                  aria-label="Cinematic 3D Photorealistic Map"
                >
                  <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="hidden sm:inline">3D Tour</span>
                  <span className="sm:hidden text-[11px]">3D</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapViewMode('2d')}
                  aria-pressed={mapViewMode === '2d'}
                  className={`h-8 sm:min-h-[34px] px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0 ${
                    mapViewMode === '2d'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="High-Resolution 2D Satellite & Hybrid Map"
                  aria-label="High-Resolution 2D Satellite and Hybrid Map"
                >
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="hidden sm:inline">2D Satellite</span>
                  <span className="sm:hidden text-[11px]">2D</span>
                </button>
              </div>

              {/* Toggle Walkability Ring */}
              <button
                type="button"
                onClick={() => setShowWalkabilityRing(!showWalkabilityRing)}
                aria-pressed={showWalkabilityRing}
                aria-label="Toggle 15-minute walkability ring"
                title="Toggle 15-Minute Walkability Circle"
                className={`w-8 h-8 sm:w-auto sm:min-h-[38px] sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition flex items-center justify-center gap-1.5 shadow-xl shrink-0 active:scale-95 ${
                  showWalkabilityRing
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-amber-400/20'
                    : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Footprints className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden lg:inline">15-Min Ring</span>
              </button>

              {/* 360 Orbit Toggle (for 3D mode) */}
              {mapViewMode === '3d' && (
                <button
                  type="button"
                  onClick={handleToggleOrbit}
                  aria-pressed={isOrbiting}
                  aria-label="Orbit 360 degrees around stop"
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-semibold backdrop-blur-md border transition flex items-center justify-center shadow-xl shrink-0 active:scale-95 ${
                    isOrbiting
                      ? 'bg-cyan-400 text-slate-950 border-cyan-400 animate-spin'
                      : 'bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Orbit 360° around stop"
                >
                  <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </button>
              )}

              {/* Master Zen Mode ("Clean Map" / "Full Map") Toggle */}
              <button
                type="button"
                onClick={() => setIsZenMode(!isZenMode)}
                aria-pressed={isZenMode}
                aria-label={isZenMode ? "Exit clean map mode" : "Clean map mode (Zen view)"}
                title={isZenMode ? "Exit Clean Map Mode" : "Clean Map Mode (Hide All Overlays)"}
                className="w-8 h-8 sm:w-auto sm:min-h-[38px] sm:px-2.5 sm:py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 text-xs font-bold backdrop-blur-md shadow-xl transition flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                <span className="hidden lg:inline">Clean Map</span>
              </button>

              {/* Desktop / Tablet Sidebar Toggle Button */}
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                aria-pressed={!isSidebarCollapsed}
                aria-label={isSidebarCollapsed ? "Show details sidebar" : "Hide details sidebar for full map"}
                title={isSidebarCollapsed ? "Show details sidebar" : "Maximize map (hide sidebar)"}
                className="hidden md:flex items-center gap-1.5 min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 text-xs font-bold backdrop-blur-md shadow-xl transition shrink-0"
              >
                {isSidebarCollapsed ? (
                  <>
                    <PanelRightOpen className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span className="hidden lg:inline">Show Panel</span>
                  </>
                ) : (
                  <>
                    <PanelRightClose className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span className="hidden lg:inline">Full Map</span>
                  </>
                )}
              </button>

              {/* Mobile Stops Drawer Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileLandscapeDrawerOpen(!isMobileLandscapeDrawerOpen)}
                aria-pressed={isMobileLandscapeDrawerOpen}
                aria-label={isMobileLandscapeDrawerOpen ? "Close stops list" : "Show all stops"}
                title="Toggle neighborhood stops list"
                className="md:hidden flex items-center justify-center gap-1 w-8 h-8 sm:w-auto sm:min-h-[38px] sm:px-3 sm:py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 text-xs font-bold backdrop-blur-md shadow-xl transition shrink-0 active:scale-95"
              >
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Stops</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Map Active Stop HUD Card (Desktop / Tablet) */}
        {!isZenMode && (
          <div className="hidden md:flex absolute bottom-4 left-4 z-20 items-end pointer-events-none">
            {isHudMinimized ? (
              <button
                type="button"
                onClick={() => setIsHudMinimized(false)}
                className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-500/40 text-slate-900 dark:text-white shadow-2xl text-xs font-bold transition hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Expand stop information"
              >
                <div className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-600 dark:text-amber-300 flex items-center justify-center">
                  {getCategoryIcon(currentLocation.categoryType)}
                </div>
                <span className="truncate max-w-[180px]">{currentLocation.title}</span>
                <ChevronUp className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              </button>
            ) : (
              <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-500/40 text-slate-900 dark:text-white shadow-2xl max-w-[380px]">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-600 dark:text-amber-300 shrink-0 text-base font-bold">
                  {getCategoryIcon(currentLocation.categoryType)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                      {currentLocation.title}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-amber-200/90 truncate flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span className="truncate">{currentLocation.subtitle}</span>
                  </div>
                  {currentLocation.walkMinutesFromHome > 0 && (
                    <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-sans font-bold mt-0.5 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{formatWalkTime(currentLocation.walkMinutesFromHome)}</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsHudMinimized(true)}
                  className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition shrink-0 ml-1 border border-slate-200 dark:border-slate-700/60"
                  title="Minimize stop HUD"
                  aria-label="Minimize stop HUD"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Expanded Sheet Drawer (56vh slide-up) - Opens only when explicitly requested */}
        {!isZenMode && !isMobileLandscapeDrawerOpen && mobileSheetState === 'expanded' && (
          <div className="md:hidden pointer-events-auto absolute inset-x-0 bottom-0 z-40 h-[56vh] bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border-t border-amber-500/40 rounded-t-3xl shadow-2xl flex flex-col p-4 overflow-hidden animate-in slide-in-from-bottom duration-200 text-slate-900 dark:text-white">
                {/* Drag Handle & Collapse Bar */}
                <div
                  className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 cursor-pointer shrink-0"
                  onClick={() => setMobileSheetState('peek')}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={activeHome.realtor.avatar}
                      alt={activeHome.realtor.name}
                      className="w-8 h-8 rounded-full object-cover border border-amber-400/80"
                    />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">{activeHome.realtor.name}</div>
                      <div className="text-[10px] text-slate-400">{activeHome.realtor.agency}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Tap to collapse</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileSheetState('peek');
                      }}
                      className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center"
                      aria-label="Collapse sheet"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                  {/* Current Active Location Summary */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center justify-between text-[10px] text-amber-300 font-bold mb-1">
                      <span>Stop {activeLocationIndex + 1} of {allLocations.length}: {currentLocation.category}</span>
                      {currentLocation.walkMinutesFromHome > 0 && (
                        <span className="text-emerald-400 font-medium">• {formatWalkTime(currentLocation.walkMinutesFromHome)}</span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white">{currentLocation.title}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentLocation.realtorPitch}</p>
                  </div>

                  {/* Hotspot List */}
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center justify-between">
                      <span>Hotspots in 15-Min Walk ({allLocations.length})</span>
                      <span className="text-amber-400 font-semibold text-[10px]">Tap to Fly Camera</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {allLocations.map((loc, idx) => {
                        const isItemActive = activeLocationIndex === idx;
                        return (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => {
                              handleSelectLocation(idx);
                              setMobileSheetState('peek');
                            }}
                            className={`w-full text-left p-2.5 rounded-xl border transition flex items-center gap-2.5 ${
                              isItemActive
                                ? 'bg-amber-400/20 border-amber-400 text-white shadow-sm'
                                : 'bg-slate-800/60 border-slate-700/60 text-slate-200'
                            }`}
                          >
                            <div className={`p-1 rounded-lg shrink-0 ${isItemActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-700 text-amber-300'}`}>
                              {getCategoryIcon(loc.categoryType)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-xs font-bold truncate ${isItemActive ? 'text-amber-300' : ''}`}>
                                {loc.title}
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <span>{loc.category}</span>
                                {loc.walkMinutesFromHome > 0 && <span>• {formatWalkTime(loc.walkMinutesFromHome)}</span>}
                              </div>
                            </div>
                            {isItemActive && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                                Active
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

        {/* Mobile Landscape Slide-Over Right Drawer (md:hidden) */}
        {!isZenMode && isMobileLandscapeDrawerOpen && (
          <div className="md:hidden absolute top-0 right-0 bottom-0 w-80 max-w-[55vw] bg-slate-900/98 backdrop-blur-2xl border-l border-slate-800 z-40 flex flex-col p-3.5 shadow-2xl text-white animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold truncate">Tour Stops ({allLocations.length})</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileLandscapeDrawerOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700"
                aria-label="Close stops drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {allLocations.map((loc, idx) => {
                const isItemActive = activeLocationIndex === idx;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      handleSelectLocation(idx);
                      setIsMobileLandscapeDrawerOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl border transition flex items-center gap-2 ${
                      isItemActive
                        ? 'bg-amber-400/20 border-amber-400 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <div className={`p-1 rounded-md shrink-0 ${isItemActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-700 text-amber-300'}`}>
                      {getCategoryIcon(loc.categoryType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold truncate ${isItemActive ? 'text-amber-300' : ''}`}>
                        {loc.title}
                      </div>
                      <div className="text-[9px] text-slate-400 truncate">
                        {loc.category} {loc.walkMinutesFromHome > 0 ? `• ${formatWalkTime(loc.walkMinutesFromHome)}` : ''}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right Side Pane: Desktop & Tablet Collapsible Realtor Presentation & Guided Tour Details */}
      <aside
        className={`hidden md:flex transition-all duration-300 ease-in-out flex-col bg-slate-900/95 border-l border-slate-800 shrink-0 z-20 overflow-hidden ${
          isZenMode || isSidebarCollapsed
            ? 'w-0 opacity-0 pointer-events-none border-none'
            : 'w-[360px] lg:w-[410px] xl:w-[440px] h-full opacity-100'
        }`}
      >
        <div className="p-4 sm:p-5 flex-1 flex flex-col h-full min-h-0 text-white w-[360px] lg:w-[410px] xl:w-[440px]">
          <div className="flex-1 flex flex-col min-h-0 h-full">
            {/* Header: Realtor Guide Info & Audio Controls & Collapse Button */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0 mr-1">
                <img
                  src={activeHome.realtor.avatar}
                  alt={activeHome.realtor.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400/80 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-black text-white truncate">
                    {activeHome.realtor.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium truncate">
                    {activeHome.realtor.agency}
                  </div>
                </div>
              </div>

              {/* Collapse Sidebar Button & Speech Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  id="realtor-summary-tts-btn"
                  onClick={handleToggleSpeech}
                  disabled={isTtsLoading}
                  className={`w-[90px] min-h-[40px] rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 group ${
                    isSpeaking
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 border-amber-200 shadow-xl shadow-amber-400/40 ring-2 ring-amber-300/70 scale-[1.02]'
                      : isTtsLoading
                      ? 'bg-slate-900/90 text-amber-300 border-amber-400/60 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/30 cursor-wait animate-pulse'
                      : 'bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-yellow-500/20 text-amber-200 border-amber-400/50 hover:border-amber-300 hover:text-white hover:bg-amber-500/25 active:scale-95'
                  }`}
                  title={
                    isTtsLoading
                      ? 'Gemini 3.8 summarizing candidate home & synthesizing voice with Gemini TTS...'
                      : isSpeaking
                      ? 'Click to stop voice playback'
                      : 'Listen to summary pitch'
                  }
                  aria-label="Listen to summary pitch"
                >
                  {isTtsLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
                  ) : isSpeaking ? (
                    <Volume2 className="w-4 h-4 text-slate-950 animate-pulse shrink-0" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                  )}
                  <span className="text-xs font-bold tracking-tight">
                    {isTtsLoading ? '...' : isSpeaking ? 'Stop' : 'Listen'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlayingAutoTour(!isPlayingAutoTour)}
                  aria-pressed={isPlayingAutoTour}
                  className={`w-[88px] min-h-[40px] rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 ${
                    isPlayingAutoTour
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/20 active:scale-95'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-600 active:scale-95'
                  }`}
                  title={isPlayingAutoTour ? 'Pause automated 3D tour' : 'Start automated 3D tour'}
                  aria-label={isPlayingAutoTour ? 'Pause automated 3D tour' : 'Start automated 3D tour'}
                >
                  {isPlayingAutoTour ? (
                    <>
                      <Pause className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-xs font-bold tracking-tight">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-xs font-bold tracking-tight">Tour</span>
                    </>
                  )}
                </button>

                {/* Minimize Sidebar Button */}
                <button
                  type="button"
                  onClick={() => setIsSidebarCollapsed(true)}
                  aria-label="Collapse sidebar to maximize map view"
                  title="Collapse sidebar to maximize map view"
                  className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition"
                >
                  <PanelRightClose className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>

            {/* Realtor's AI Generated Spoken Pitch Card (Gemini 3.8 + Gemini TTS) */}
            {realtorSummaryScript && (
              <div className="mt-2.5 mb-1 p-3 rounded-xl bg-gradient-to-br from-amber-500/15 via-slate-900/95 to-slate-950 border border-amber-400/35 text-xs shadow-md shrink-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>Realtor Pitch • {activeHome.realtor.name}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/30 font-semibold tracking-wider uppercase">
                    Gemini 3.8 + TTS
                  </span>
                </div>
                <p className="text-slate-200 italic leading-relaxed text-[11px]">
                  "{realtorSummaryScript}"
                </p>
                <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-amber-400/15 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 text-amber-300/80">
                    <Volume2 className="w-3 h-3" /> Voice: {activeHome.realtor.name.toLowerCase().includes('mariana') ? 'Kore' : 'Puck'}
                  </span>
                  <button
                    onClick={handleToggleSpeech}
                    className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 flex items-center gap-1"
                  >
                    {isSpeaking ? 'Stop Voice' : 'Replay Pitch'}
                  </button>
                </div>
              </div>
            )}

            {/* Current Active Location Narrative, Pitch & Hotspot Review Summaries Card */}
            <div className="pt-3 pb-2 shrink-0 max-h-[46%] overflow-y-auto pr-1 scrollbar-thin">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Stop {activeLocationIndex + 1} of {allLocations.length}: {currentLocation.category}
                  </span>
                  {currentLocation.walkMinutesFromHome > 0 && (
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatWalkTime(currentLocation.walkMinutesFromHome)}</span>
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-medium text-slate-400 flex items-center gap-1 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                  <MapPin className="w-2.5 h-2.5 text-amber-400" />
                  <span>{currentLocation.category}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentLocation.title}
              </h3>
              {currentLocation.subtitle && (
                <p className="text-xs text-amber-300/90 font-medium mt-0.5 flex items-center gap-1">
                  <span>{currentLocation.subtitle}</span>
                </p>
              )}
              <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                {currentLocation.realtorPitch}
              </p>

              {/* Highlights Pill List & Google Rating */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                {currentLocation.rating && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <span>★ {currentLocation.rating}</span>
                    <span className="text-[9px] text-slate-400">Google Places</span>
                  </span>
                )}
                {currentLocation.highlights &&
                  currentLocation.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/90 text-amber-200 border border-slate-700"
                    >
                      ✓ {h}
                    </span>
                  ))}
              </div>

              {/* Review summary toggle badge in right pane */}
              {currentLocation.categoryType !== 'home' && (
                <button
                  onClick={() => setIsReviewCardDismissed(false)}
                  className="mt-2.5 w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-950/60 hover:bg-slate-950 border border-amber-500/30 hover:border-amber-400 text-amber-300 flex items-center justify-between transition group shadow-sm"
                  title="Show Google Review Summary on map"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Google Review Summary</span>
                    {activeReviewSummary?.rating && (
                      <span className="text-[10px] text-slate-300 font-normal">★ {activeReviewSummary.rating}</span>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-amber-300 font-medium shrink-0 ml-2">
                    {isReviewCardDismissed ? 'Show on Map →' : 'Showing on Map'}
                  </span>
                </button>
              )}
            </div>

            {/* Complete Indexed List of All Tour Hotspots in the Neighborhood */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex-1 flex flex-col min-h-0">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center justify-between shrink-0">
                <span>15-Minute Walk Hotspots ({allLocations.length})</span>
                <span className="text-amber-400 font-medium text-[10px]">Click to Fly In</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5 flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-thin">
                {allLocations.map((loc, idx) => {
                  const isItemActive = activeLocationIndex === idx;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handleSelectLocation(idx)}
                      aria-pressed={isItemActive}
                      aria-label={`Fly tour to stop ${idx + 1}: ${loc.title} (${loc.category})`}
                      className={`w-full min-h-[48px] text-left p-2.5 rounded-xl border transition flex items-center gap-2.5 group ${
                        isItemActive
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                          : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-amber-400/50 text-slate-200'
                      }`}
                    >
                      <div className={`p-1 rounded-lg shrink-0 ${isItemActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-700/70 text-amber-300'}`}>
                        {getCategoryIcon(loc.categoryType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold truncate ${isItemActive ? 'text-amber-300' : 'group-hover:text-amber-300'}`}>
                          {loc.title}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2">
                          <span>{loc.category}</span>
                          {loc.walkMinutesFromHome > 0 ? (
                            <span className="text-emerald-400 font-medium">
                              • {formatWalkTime(loc.walkMinutesFromHome)}
                            </span>
                          ) : (
                            <span className="text-amber-400 font-medium">• Base Home</span>
                          )}
                        </div>
                      </div>
                      {isItemActive && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                          Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
