import styles from "./Home.module.css";
import Mapa from "../../components/Mapa/Mapa";
import Overview from "../../components/Overview/Overview";

function Home({}) {
    

    return (
        <div className={styles.pageContent}>
            <h1>Bueiros Inteligentes</h1>
            <div className={styles.contentContainer}>
                <Overview />
                <Mapa />
            </div>  
        </div>
    );
} 

export default Home;