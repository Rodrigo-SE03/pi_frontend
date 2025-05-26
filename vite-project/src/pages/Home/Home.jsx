import styles from "./Home.module.css";
import Mapa from "../../components/Mapa/Mapa";
import Overview from "../../components/Overview/Overview";
import { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Home({}) {
    const [hoveredStatus, setHoveredStatus] = useState(null);
    const [hoveredMac, setHoveredMac] = useState(null);
    const [rotaIdeal, setRotaIdeal] = useState([]);

    const calcularRota = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}rotas`); // Ajuste a URL se necessário
        const rota = response.data[0]; // A lista de pontos
        console.log("Rota recebida:", rota);
        setRotaIdeal(rota);
    } catch (erro) {
        console.error("Erro ao calcular rota:", erro);
    }
    };

    return (
        <div className={styles.pageContent}>
            <h1>Bueiros Inteligentes</h1>
            <div className={styles.contentContainer}>
                <Overview handleHover={setHoveredStatus} handleMacHover={setHoveredMac} calcularRota={calcularRota} />
                <Mapa hovered={hoveredStatus} hoveredMac={hoveredMac} rotaIdeal={rotaIdeal} />
            </div>
        </div>
    );
} 

export default Home;