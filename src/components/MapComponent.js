import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useSelector } from 'react-redux';

const MapComponent = () => {
    const selectedRoute = useSelector((state) => state.routes.selectedRoute);

    const mapCenter = selectedRoute ? selectedRoute[0] : [59.84660399, 30.29496392];

    return (
        <div className="map">
            <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {selectedRoute ? (
                    <>
                        <Polyline positions={selectedRoute} color="blue" />
                        {selectedRoute.map((point, index) => (
                            <Marker key={index} position={point}>
                                <Popup>Балл {index + 1}</Popup>
                            </Marker>
                        ))}
                    </>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>Маршрут не найден</div>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
