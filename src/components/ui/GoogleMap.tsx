interface GoogleMapProps {
  address: string;
  embedUrl?: string | null;
  className?: string;
}

export default function GoogleMap({ address, embedUrl, className = '' }: GoogleMapProps) {
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = embedUrl || `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-slate-200 shadow-sm ${className}`}
      id="google-map-embed"
    >
      <iframe
        src={mapSrc}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing location of ${address}`}
        className="w-full"
      />
    </div>
  );
}
