/* global L:readonly */
const map = L.map('map-canvas')
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 15);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

