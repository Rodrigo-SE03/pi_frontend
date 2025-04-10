import axios from "axios";
import styles from "./Card.module.css";
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Card() {
    const [leitura, setLeitura] = useState(null);
    
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:81/leituras/ws");

        ws.onopen = () => {
            console.log("Conectado ao WebSocket");
        };

        ws.onmessage = (event) => {
            console.log("Mensagem recebida:", event.data);
            const newLeitura = JSON.parse(JSON.parse(event.data));
            console.log(newLeitura);
            setLeitura(newLeitura);
        };

        ws.onerror = (err) => {
            console.error("Erro no WebSocket:", err);
        };

        return () => ws.close();
    }, []);
    
    return (
        <div className={styles.card}>
            {leitura ? `${leitura.distancia} cm` : "Aguardando leitura..."}
        </div>
    );
}

export default Card;
