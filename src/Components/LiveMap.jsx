import React from "react";

/**
 * LiveMap — zero-config Google Maps embed
 * Use either:
 *  - query="Axceria, Colombo"
 *  - or lat={6.9271} lng={79.8612}
 *
 * No API key needed for basic embeds.
 */
export default function LiveMap({
  query,
  lat,
  lng,
  zoom = 14,
  className = "h-56 md:h-64 w-full",
}) {
  const src = lat && lng
    ? `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&hl=en&z=${zoom}&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(query || "Colombo, Sri Lanka")}&hl=en&z=${zoom}&output=embed`;

  return (
    <div className={`relative ${className}`}>
      <iframe
        title="Axceria Location"
        src={src}
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
