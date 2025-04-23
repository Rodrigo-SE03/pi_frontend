import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TabelaLeituras from '../../components/TabelaLeituras/TabelaLeituras';
import NivelBueiro from '../../components/NivelBueiro/NivelBueiro';
import styles from './Dispositivo.module.css';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dispositivo({}) {
    const [mostrarTabela, setMostrarTabela] = useState(true);

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
        <div className={styles.conteudo}>
            <div className={styles.tabelaContainer}>
                <button
                    className={styles.botaoToggle}
                    onClick={() => setMostrarTabela((prev) => !prev)}
                >
                    {mostrarTabela ? 'Esconder Leituras' : 'Mostrar Leituras'}
                </button>
                {mostrarTabela && <TabelaLeituras leituras={leituras} />}
            </div>
            <div className={styles.nivelContainer}>
                {leituras.length > 0 ? (
                    <NivelBueiro leituraAtual={leituras[leituras.length - 1].distancia} distanciaMax={100} />
                ) : (
                    <p className={styles.aviso}>Nenhuma leitura disponível.</p>
                )}
            </div>
        </div>
    </div>
    );
}

export default Dispositivo;