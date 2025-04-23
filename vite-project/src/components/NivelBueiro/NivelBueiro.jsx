import styles from './NivelBueiro.module.css';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

function NivelBueiro({ leituraAtual }) {
    const distanciaMax = 150
    const percentual = Math.max(0, Math.min(100, ((distanciaMax - leituraAtual) / distanciaMax) * 100));

    let Icone;
    let cor;

    if (percentual <= 30) {
        Icone = CheckCircle;
        cor = "#4caf50";
    } else if (percentual <= 60) {
        Icone = AlertTriangle;
        cor = "#ffb300";
    } else {
        Icone = AlertCircle;
        cor = "#e53935";
    }

    return (
        <div className={styles.container}>
        <div className={styles.titulo}>Nível do Bueiro</div>
        <div className={styles.bueiro}>
            <div className={styles.agua} style={{ height: `${percentual}%` }}>
            <div className={styles.onda}></div>
            </div>
        </div>
        <div className={styles.status}>
            <Icone size={20} color={cor} />
            <span>{percentual.toFixed(0)}% cheio</span>
        </div>
        <p className={styles.valor}>Leitura: {leituraAtual} cm</p>
        </div>
    );
}

export default NivelBueiro;
