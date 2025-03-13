const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Random coordinate generation for the Paris region
function getRandomParisLocation() {
  return [
    48.8584 + (Math.random() - 0.5) * 0.01,
    2.2945 + (Math.random() - 0.5) * 0.01,
  ];
}


function updateSensorData() {
  const types = ["traffic", "air", "noise"];
  const type = types[Math.floor(Math.random() * types.length)];
  const value = Math.floor(Math.random() * 100);

  const sensors = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    position: getRandomParisLocation(),
    value:
      type === "traffic"
        ? value > 70
          ? "Heavy Traffic"
          : "Normal Flow"
        : type === "air"
        ? `AQI: ${value}`
        : `${value} dB`,
    status: value > 70 ? "warning" : "good",
  }));

  return { type, sensors };
}

io.on("connection", (socket) => {
  console.log("Client connected");

 
  const interval = setInterval(() => {
    const data = updateSensorData();
    socket.emit("sensorUpdate", data);
  }, 10000);

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
