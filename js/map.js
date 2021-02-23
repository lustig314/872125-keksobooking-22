/* global L:readonly */
import { activeState } from './page-state.js'


const map = L.map('map-canvas')
  .on('load', () => {
    activeState();
  })
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

