import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import useLeituras from '../../utils/useLeituras';
import { classificarBueiro } from '../../utils/classificarNivelBueiro';
import styles from './Overview.module.css';

function Overview({}) {
    const leituras = useLeituras();

    const { limpos, parciais, cheios } = leituras.reduce(
        (acc, leitura) => {
            console.log(leitura);
            const status = classificarBueiro(leitura.distancia);
            if (status === "limpo") acc.limpos++;
            else if (status === "parcial") acc.parciais++;
            else acc.cheios++;
            return acc;
        },
        { limpos: 0, parciais: 0, cheios: 0 }
    );
    return (
        <div className={styles.content}>
            <h1>Visão geral</h1>
            <div className={styles.contentContainer}>
                <div className={styles.limpo}>
                    <CheckCircle size={20} color="#4caf50" />
                    <span>Limpos - {limpos}</span>
                </div>
                <div className={styles.parcial}>
                    <AlertTriangle size={26} color="#ffb300" />
                    <span>Parcialmente cheios - {parciais}</span>
                </div>
                <div className={styles.cheio}>
                    <AlertCircle size={20} color="#e53935" />
                    <span>Cheios - {cheios}</span>
                </div>
            </div>
        </div>
    );
}

export default Overview;