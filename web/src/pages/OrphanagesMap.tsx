import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'; 
import api from '../services/api';

import '../styles/pages/orphanageMap.css';

import mapMarkerImg from '../images/map-marker.svg';
import mapImgLigth from '../images/map-light.png';
import mapImgSatellite from '../images/map-satellite.png';
import mapIcon from '../utils/mapIcon';
import Orphanage from './Orphanage';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function OrphanagesMap() {    
    const [mapType, setMapType] = useState("light-v10");
    const [mapTypeImg, setMapTypeImg] = useState(mapImgSatellite);
    const [mapName, setMapName] = useState("Satélite");
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    function changeMap() {
        setMapType(mapType === "light-v10" ? "satellite-v9" : "light-v10");
        setMapTypeImg(mapTypeImg === mapImgSatellite ? mapImgLigth : mapImgSatellite);
        setMapName(mapName === "Satélite" ? "Mapa" : "Satélite");
    }

    return (
        <div id="map-page">
            <aside>
                <header>
                    <Link to="/">
                        <img src={mapMarkerImg} alt="Happy"/>
                    </Link>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Natal</strong>
                    <span>Rio Grande do Norte</span>
                </footer>
            </aside>

            <Map 
                center= {[-5.814313, -35.2038551]}
                zoom={13}
                style={{ width: '100%', height: '100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/${mapType}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}    
                            icon= {mapIcon}
                            position= {[orphanage.latitude, orphanage.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color='#fff' />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <div className="map-type" onClick={changeMap}>
                <span>{mapName}</span>
                <img src={mapTypeImg} alt="Map-Type" />
            </div>
            
            <Link to="/orphanages/create" className='create-orphanage'>
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;