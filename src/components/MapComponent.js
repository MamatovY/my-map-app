import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoute } from '../redux/routesSlice';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = () => {
    const dispatch = useDispatch();
    const selectedRoute = useSelector((state) => state.routes.selectedRoute);
    const mapRef = useRef(null); // Добавляем useRef для получения ссылки на компонент карты

    const mapCenter = selectedRoute ? selectedRoute[0] : [59.84660399, 30.29496392];

    useEffect(() => {
        // Обновляем центр и масштаб карты после выбора маршрута
        if (selectedRoute && mapRef.current) {
            const bounds = selectedRoute.reduce((acc, point) => acc.extend(L.latLng(point)), L.latLngBounds(L.latLng(selectedRoute[0])));
            mapRef.current.leafletElement.fitBounds(bounds);
        }
    }, [selectedRoute]);

    const handleRouteClick = (route) => {
        dispatch(selectRoute(route));
    };

    return (
        <div className="map">
            {/* Помещаем MapContainer внутрь ref */}
            <MapContainer center={mapCenter} zoom={13} style={{ height: '500px', width: '100%' }} ref={mapRef}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {selectedRoute && (
                    <>
                        <Polyline positions={selectedRoute} color="blue" />
                        {selectedRoute.map((point, index) => (
                            <Marker key={index} position={point} eventHandlers={{ click: () => handleRouteClick(point) }}>
                                <Popup>Point {index + 1}</Popup>
                            </Marker>
                        ))}
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
