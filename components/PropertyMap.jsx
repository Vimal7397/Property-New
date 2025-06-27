"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Dynamically import react-leaflet components
import "leaflet/dist/leaflet.css";

// Dynamically import react-leaflet components with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [geocodeError, setGeocodeError] = useState(null);
  const [L, setL] = useState(null); // State to store the leaflet library

  useEffect(() => {
    import("leaflet").then((module) => {
      setL(module); // Dynamically load the leaflet library
    });

    const fetchCoords = async () => {
      if (!property?.location) {
        setGeocodeError("Property location is missing.");
        return;
      }

      const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
      const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.results.length === 0) {
          setGeocodeError("No location found.");
          return;
        }

        const { lat, lng } = data.results[0].geometry;
        setLat(lat);
        setLng(lng);
      } catch (error) {
        console.error("Geocoding failed:", error.message);
        setGeocodeError("Geocoding failed.");
      }
    };

    fetchCoords();
  }, [property]);

  const customIcon = L
    ? new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    : null;

  return (
    <div>
      {lat && lng ? (
        <div className="map-container">
          <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]} icon={customIcon}>
              <Popup>
                {property.location.street}, {property.location.city}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : geocodeError ? (
        <p>{geocodeError}</p>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default PropertyMap;
