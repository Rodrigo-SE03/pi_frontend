import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useLeituras from '../../utils/useLeituras';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Mapa.module.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Mapa ({}) {
    const navigate = useNavigate();
    const pontos = useLeituras();

    useEffect(() => {
        const buscarLocalizacoes = async () => {
          try {
            const resposta = await axios.get(`${BACKEND_URL}leituras`);	
            const dados = resposta.data;
            const porMacMaisRecente = Object.values(
              dados.reduce((acc, leitura) => {
                const existente = acc[leitura.mac];
                if (!existente || new Date(leitura.timestamp) > new Date(existente.timestamp)) {
                  acc[leitura.mac] = leitura;
                }
                return acc;
              }, {})
            );
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
        center={[-16.6869, -49.2648]}
        zoom={12}
        // scrollWheelZoom={false}
        zoomControl={true}
        // dragging={false}
        // doubleClickZoom={false}
        // touchZoom={false}
        className={styles.mapa}
        minZoom={4}
        maxZoom={16}
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pontos.map((ponto, i) => (
        <Marker key={i} position={[ponto.latitude, ponto.longitude]}>
            <Popup>
            <button
                onClick={() => navigate(`/dispositivo?id=${ponto.mac}`)}
                style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline' }}
            >
                Ver dispositivo
            </button>
            </Popup>
        </Marker>
        ))}
    </MapContainer>
    );
};

export default Mapa;
