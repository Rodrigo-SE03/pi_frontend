// src/components/Mapa.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './Mapa.module.css'; // módulo css opcional

function Mapa ({}) {
    const navigate = useNavigate();
    const [pontos, setPontos] = useState([]);

    useEffect(() => {
    const buscarLocalizacoes = async () => {
        try {
        const resposta = await axios.get('http://localhost:81/coordenadas');
        console.log(resposta.data);
        setPontos(resposta.data);
        } catch (erro) {
        console.error('Erro ao buscar localizações:', erro);
        }
    };

    buscarLocalizacoes();

    const intervalo = setInterval(buscarLocalizacoes, 10000); // atualiza a cada 10 segundos
    return () => clearInterval(intervalo);
    }, []);

    return (
    <MapContainer
        center={[-16.6869, -49.2648]} // centro de Goiânia
        zoom={13}
        scrollWheelZoom={true}
        className={styles.mapa}
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pontos.map((ponto, i) => (
        <Marker key={i} position={[ponto.lat, ponto.long]}>
            <Popup>
            <button
                onClick={() => navigate(`/dispositivo?id=${ponto.id}`)}
                style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline' }}
            >
                Ver dispositivo {ponto.id}
            </button>
            </Popup>
        </Marker>
        ))}
    </MapContainer>
    );
};

export default Mapa;
