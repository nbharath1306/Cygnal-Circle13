"use client";

/**
 * SVG filters for Liquid Glass refraction effect.
 *
 * Uses feDisplacementMap with an inline radial gradient displacement map
 * to bend content at the edges of glass elements — like looking through
 * a real curved lens.
 *
 * Two filter sizes: one for cards (300x80), one for the hero panel (420x400).
 */
export function LiquidGlassFilter() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
      <defs>
        {/* Displacement map — radial gradient that bends edges */}
        <radialGradient id="lens-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(128,128,128)" />
          <stop offset="65%" stopColor="rgb(128,128,128)" />
          <stop offset="85%" stopColor="rgb(148,148,128)" />
          <stop offset="100%" stopColor="rgb(168,168,128)" />
        </radialGradient>

        {/* Card-sized glass filter */}
        <filter id="liquid-glass-card" x="-5%" y="-5%" width="110%" height="110%">
          {/* Slight blur on source */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blurred" />

          {/* Displacement map for edge refraction */}
          <feFlood floodColor="rgb(128,128,128)" result="base" />
          <feComposite in="base" in2="SourceGraphic" operator="in" result="base_shape" />

          {/* Edge detection for refraction zone */}
          <feMorphology in="SourceGraphic" operator="erode" radius="3" result="eroded" />
          <feComposite in="base_shape" in2="eroded" operator="out" result="edge_zone" />
          <feGaussianBlur in="edge_zone" stdDeviation="4" result="edge_blurred" />

          {/* Apply displacement at edges */}
          <feDisplacementMap
            in="blurred"
            in2="edge_blurred"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />

          {/* Saturate displaced content slightly */}
          <feColorMatrix in="displaced" type="saturate" values="1.3" result="final" />

          {/* Specular lighting — top-down light source */}
          <feSpecularLighting
            in="edge_blurred"
            surfaceScale="3"
            specularConstant="0.6"
            specularExponent="25"
            result="specular"
          >
            <fePointLight x="200" y="-100" z="200" />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceGraphic" operator="in" result="spec_clipped" />
          <feComponentTransfer in="spec_clipped" result="spec_faded">
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>

          {/* Combine */}
          <feBlend in="spec_faded" in2="final" mode="screen" />
        </filter>

        {/* Hero panel glass filter — similar but softer */}
        <filter id="liquid-glass-panel" x="-3%" y="-3%" width="106%" height="106%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="blurred" />
          <feFlood floodColor="rgb(128,128,128)" result="base" />
          <feComposite in="base" in2="SourceGraphic" operator="in" result="base_shape" />
          <feMorphology in="SourceGraphic" operator="erode" radius="4" result="eroded" />
          <feComposite in="base_shape" in2="eroded" operator="out" result="edge_zone" />
          <feGaussianBlur in="edge_zone" stdDeviation="5" result="edge_blurred" />
          <feDisplacementMap in="blurred" in2="edge_blurred" scale="6" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feColorMatrix in="displaced" type="saturate" values="1.2" result="final" />
          <feSpecularLighting in="edge_blurred" surfaceScale="2" specularConstant="0.4" specularExponent="20" result="specular">
            <fePointLight x="250" y="-150" z="250" />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceGraphic" operator="in" result="spec_clipped" />
          <feComponentTransfer in="spec_clipped" result="spec_faded">
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feBlend in="spec_faded" in2="final" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}
