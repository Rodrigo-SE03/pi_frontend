import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function RoutingControl({ rota }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!map || !rota || rota.length === 0) return;

    // Remove rota anterior
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    const control = L.Routing.control({
      waypoints: rota.map((p) => L.latLng(p.latitude, p.longitude)),
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.7, weight: 5 }],
      },
      createMarker: () => null,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      show: false,
    });

    control.on("routesfound", (e) => {
      console.log("✅ Rota encontrada! Distância:", e.routes[0].summary.totalDistance / 1000, "km");
    });

    control.on("routingerror", (err) => {
      console.error("❌ Erro na rota:", err);
    });

    control.addTo(map);
    routingRef.current = control;

    return () => {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
  }, [map, rota]);

  return null;
}

export default RoutingControl;
