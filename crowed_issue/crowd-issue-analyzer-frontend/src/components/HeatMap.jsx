import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import api from "../services/api";
import { MapPin, AlertTriangle } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

export default function HeatMap() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default to NYC

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await api.get("/issues");
        setIssues(response.data);

        // Calculate center based on issues
        if (response.data.length > 0) {
          const avgLat = response.data.reduce((sum, issue) => sum + issue.lat, 0) / response.data.length;
          const avgLng = response.data.reduce((sum, issue) => sum + issue.lng, 0) / response.data.length;
          setMapCenter([avgLat, avgLng]);
        }
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Failed to load map data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FFCE56";
      case "In Progress":
        return "#36A2EB";
      case "Resolved":
        return "#4BC0C0";
      default:
        return "#FF6384";
    }
  };

  const createCustomIcon = (status) => {
    return L.divIcon({
      html: `<div style="background-color: ${getStatusColor(status)}; border-radius: 50%; width: 20px; height: 20px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
      className: "custom-marker",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">City Issue Heatmap</h2>
        <div className="h-96 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">City Issue Heatmap</h2>
        <div className="h-96 bg-red-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">City Issue Heatmap</h2>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController center={mapCenter} />
          {issues.map((issue) => (
            <Marker
              key={issue.id}
              position={[issue.lat, issue.lng]}
              icon={createCustomIcon(issue.status)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900 mb-1">{issue.type}</h3>
                  <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <MapPin size={12} className="mr-1" />
                    {issue.location}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <AlertTriangle size={12} className="mr-1" />
                    Status: <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                      issue.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : issue.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Reported: {new Date(issue.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
          <span>Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
          <span>In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
          <span>Resolved</span>
        </div>
      </div>
    </div>
  );
}
