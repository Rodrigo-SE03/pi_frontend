import styles from "./Home.module.css";
import Mapa from "../../components/Mapa/Mapa";
import Overview from "../../components/Overview/Overview";
import { useState } from "react";

function Home({}) {
    const [hoveredStatus, setHoveredStatus] = useState(null);

    const handleHover = (status) => {
        setHoveredStatus(status);
    }

    return (
        <div className={styles.pageContent}>
            <h1>Bueiros Inteligentes</h1>
            <div className={styles.contentContainer}>
                <Overview handleHover={handleHover} />
                <Mapa hovered={hoveredStatus} />
            </div>  
        </div>
    );
} 

export default Home;