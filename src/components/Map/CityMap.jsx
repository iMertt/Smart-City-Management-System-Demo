import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { Icon } from "leaflet";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";

// Özel marker ikonları
const sensorIcons = {
  traffic: new Icon({
    iconUrl: "/icons/traffic-sensor.png",
    iconSize: [32, 32],
  }),
  air: new Icon({
    iconUrl: "/icons/air-sensor.png",
    iconSize: [32, 32],
  }),
  noise: new Icon({
    iconUrl: "/icons/noise-sensor.png",
    iconSize: [32, 32],
  }),
};

// Örnek sensör verileri
const sensorData = {
  traffic: [
    {
      id: 1,
      position: [41.0082, 28.9784],
      value: "Yoğun Trafik",
      status: "active",
    },
    {
      id: 2,
      position: [41.0122, 28.9764],
      value: "Normal Akış",
      status: "active",
    },
  ],
  air: [
    {
      id: 3,
      position: [41.0092, 28.9744],
      value: "AQI: 65",
      status: "warning",
    },
    { id: 4, position: [41.0062, 28.9804], value: "AQI: 42", status: "good" },
  ],
  noise: [
    { id: 5, position: [41.0102, 28.9724], value: "75 dB", status: "warning" },
    { id: 6, position: [41.0042, 28.9824], value: "45 dB", status: "good" },
  ],
};

const CityMap = ({ onSensorUpdate }) => {
  useEffect(() => {
    // Test data
    const mockSensorData = {
      air: [
        { id: 1, value: "85 AQI", status: "Good", batteryLevel: 90 },
        { id: 2, value: "120 AQI", status: "Moderate", batteryLevel: 75 }
      ],
      traffic: [
        { id: 1, value: "45 km/h", status: "Normal", batteryLevel: 85 },
        { id: 2, value: "20 km/h", status: "Congested", batteryLevel: 60 }
      ],
      noise: [
        { id: 1, value: "65 dB", status: "Normal", batteryLevel: 95 },
        { id: 2, value: "85 dB", status: "High", batteryLevel: 80 }
      ]
    };

    onSensorUpdate(mockSensorData);
  }, []);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [sensorData, setSensorData] = useState({
    traffic: [],
    air: [],
    noise: [],
  });
  // Paris'in koordinatları (Eiffel Kulesi merkez alındı)
  const cityCenter = [48.8584, 2.2945];

  useEffect(() => {
    // WebSocket bağlantısı
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    // Sensör verilerini dinle
    // Add this line inside the sensorUpdate socket listener
    socket.on("sensorUpdate", (data) => {
      setSensorData((prevData) => {
        const newData = {
          ...prevData,
          [data.type]: data.sensors,
        };
        onSensorUpdate?.(newData); // Pass data to parent
        return newData;
      });
    });

    // Simüle edilmiş veri güncellemeleri
    const simulateUpdates = () => {
      const types = ["traffic", "air", "noise"];
      setInterval(() => {
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomValue = Math.floor(Math.random() * 100);

        setSensorData((prevData) => ({
          ...prevData,
          [randomType]: prevData[randomType].map((sensor) => ({
            ...sensor,
            value:
              randomType === "traffic"
                ? randomValue > 70
                  ? "Heavy Traffic"
                  : "Normal Flow"
                : randomType === "air"
                ? `AQI: ${randomValue}`
                : `${randomValue} dB`,
            status: randomValue > 70 ? "warning" : "good",
          })),
        }));
      }, 10000); // Changed from 3000 to 10000 milliseconds
    };

    // Başlangıç verilerini ayarla
    setSensorData({
      traffic: [
        {
          id: 1,
          position: [48.8584, 2.2945],
          value: "Yoğun Trafik",
          status: "active",
        },
        {
          id: 2,
          position: [48.8634, 2.2925],
          value: "Normal Akış",
          status: "active",
        },
      ],
      air: [
        {
          id: 3,
          position: [48.8604, 2.2965],
          value: "AQI: 65",
          status: "warning",
        },
        {
          id: 4,
          position: [48.8564, 2.2925],
          value: "AQI: 42",
          status: "good",
        },
      ],
      noise: [
        {
          id: 5,
          position: [48.8614, 2.2905],
          value: "75 dB",
          status: "warning",
        },
        { id: 6, position: [48.8544, 2.2985], value: "45 dB", status: "good" },
      ],
    });

    // Simülasyonu başlat
    simulateUpdates();

    return () => {
      socket.disconnect();
    };
  }, [onSensorUpdate]);

  const renderSensorMarkers = (sensors, type) => {
    return sensors.map((sensor) => (
      <Marker
        key={sensor.id}
        position={sensor.position}
        icon={sensorIcons[type]}
        eventHandlers={{
          click: () => setSelectedSensor(sensor),
        }}
      >
        <Popup>
          <div>
            <h3>Sensor #{sensor.id}</h3>
            <p>Current : {sensor.value}</p>
            <p>Status: {sensor.status}</p>
            <p>Last Update: {new Date().toLocaleTimeString()}</p>
          </div>
        </Popup>
      </Marker>
    ));
  };

  return (
    <MapContainer
      center={cityCenter}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="Trafic Sensors">
          <LayerGroup>
            {renderSensorMarkers(sensorData.traffic, "traffic")}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Air Quality Sensors">
          <LayerGroup>{renderSensorMarkers(sensorData.air, "air")}</LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Noise Sensors">
          <LayerGroup>
            {renderSensorMarkers(sensorData.noise, "noise")}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

export default CityMap;
