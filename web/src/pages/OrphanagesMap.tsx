import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet'; 

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanageMap.css';

import mapMarkerImg from '../images/map-marker.svg';
import mapImgLigth from '../images/map-light.png';
import mapImgSatellite from '../images/map-satellite.png';

export default class OrphanagesMap extends Component {
    state = {
        mapType: "light-v10",
        mapTypeImg: mapImgSatellite,
        mapName: "Satélite"
    }

    changeMap() {
        const mapType = this.state.mapType === "light-v10" ? "satellite-v9" : "light-v10";
        const mapTypeImg = this.state.mapTypeImg === mapImgSatellite ? mapImgLigth : mapImgSatellite;
        const mapName = this.state.mapName === "Satélite" ? "Mapa" : "Satélite";
        
        this.setState({ mapType, mapTypeImg, mapName })
    }

    render() {
        const changeMap = () => this.changeMap();

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
                    zoom={15}
                    style={{ width: '100%', height: '100%'}}
                >
                    {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                    <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/${this.state.mapType}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                </Map>

                <div className="map-type" onClick={changeMap}>
                    <span>{this.state.mapName}</span>
                    <img src={this.state.mapTypeImg} alt="Map-Type" />
                </div>
                
                <Link to="/" className='create-orphanage'>
                    <FiPlus size={32} color="#fff" />
                </Link>
            </div>
        )
    }
}