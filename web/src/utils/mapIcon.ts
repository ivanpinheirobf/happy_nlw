import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [170, 2]
  })

  export default mapIcon;