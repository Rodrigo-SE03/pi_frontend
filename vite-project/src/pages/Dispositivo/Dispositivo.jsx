import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Dispositivo.module.css';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dispositivo() {
    const [searchParams] = useSearchParams();
    const dispositivoId = searchParams.get('id');

    const [leituras, setLeituras] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const carregarLeituras = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}leituras`);
            setLeituras(res.data.filter(leitura => leitura.mac === dispositivoId));
        } catch (error) {
            console.error('Erro ao buscar leituras:', error);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        if (dispositivoId) carregarLeituras();
        const intervalo = setInterval(carregarLeituras, 15000);
        return () => clearInterval(intervalo);
    }, []);

    if (!dispositivoId) {
    return <p className={styles.aviso}>ID do dispositivo não especificado.</p>;
    }

    if (carregando) {
    return <p className={styles.aviso}>Carregando leituras...</p>;
    }

    return (
    <div className={styles.container}>
        <h1 className={styles.titulo}>Dispositivo {dispositivoId}</h1>
        <p className={styles.subtitulo}>Total de leituras: {leituras.length}</p>

        <div className={styles.tabelaContainer}>
        <table className={styles.tabela}>
            <thead>
            <tr>
                <th>Distância</th>
                <th>Horário</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>MAC</th>
            </tr>
            </thead>
            <tbody>
            {leituras.map((leitura, index) => (
                <tr key={index}>
                <td>{leitura.distancia} cm</td>
                <td>{new Date(leitura.timestamp).toLocaleString()}</td>
                <td>{leitura.latitude.toFixed(6)}</td>
                <td>{leitura.longitude.toFixed(6)}</td>
                <td>{leitura.mac}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
}

export default Dispositivo;