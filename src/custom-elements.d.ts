import 'react';

declare module 'react' {
  interface JSX {
    IntrinsicElements: {
      'gmp-map-3d': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        center?: string | { lat: number; lng: number; altitude?: number };
        range?: string | number;
        heading?: string | number;
        tilt?: string | number;
        roll?: string | number;
        'default-labels-disabled'?: boolean | string;
        'solution-channel'?: string;
        'internal-usage-attribution-ids'?: string;
        style?: React.CSSProperties;
      };
      'gmp-marker-3d': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: string | { lat: number; lng: number; altitude?: number };
        altitude?: string | number;
        'altitude-mode'?: 'RELATIVE_TO_GROUND' | 'RELATIVE_TO_MESH' | 'ABSOLUTE' | string;
        'draws-when-occluded'?: boolean | string;
        'extruded'?: boolean | string;
        title?: string;
        label?: string;
        style?: React.CSSProperties;
      };
      'gmp-polygon-3d': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'altitude-mode'?: 'RELATIVE_TO_GROUND' | 'RELATIVE_TO_MESH' | 'ABSOLUTE' | string;
        'draws-when-occluded'?: boolean | string;
        'extruded'?: boolean | string;
        'stroke-color'?: string;
        'stroke-width'?: string | number;
        'fill-color'?: string;
        style?: React.CSSProperties;
      };
      'gmp-polyline-3d': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'altitude-mode'?: 'RELATIVE_TO_GROUND' | 'RELATIVE_TO_MESH' | 'ABSOLUTE' | string;
        'draws-when-occluded'?: boolean | string;
        'stroke-color'?: string;
        'stroke-width'?: string | number;
        style?: React.CSSProperties;
      };
      'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        zoom?: string | number;
        'map-id'?: string;
        'internal-usage-attribution-ids'?: string;
        center?: any;
      };
      'gmp-advanced-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: any;
        'collision-behavior'?: string;
      };
      'gmp-place-details-compact': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        orientation?: 'horizontal' | 'vertical' | 'HORIZONTAL' | 'VERTICAL';
        'truncation-preferred'?: boolean | string;
        style?: React.CSSProperties;
      };
      'gmp-place-place-request': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        place?: string | null;
      };
      'gmp-place-details-place-request': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        place?: string | null;
      };
      'gmp-place-content-config': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'gmp-place-media': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'lightbox-preferred'?: boolean | string;
      };
      'gmp-place-rating': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'gmp-place-type': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'gmp-place-price': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'gmp-place-accessible-entrance-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'gmp-place-open-now-status': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'gmp-place-attribution': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'light-scheme-color'?: string;
        'dark-scheme-color'?: string;
      };
      'gmp-place-autocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'included-primary-types'?: string;
        'location-restriction'?: any;
        'requested-fields'?: string;
      };
    };
  }
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY?: string;
    readonly [key: string]: any;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
