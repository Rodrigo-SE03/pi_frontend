import styles from "./Home.module.css";
import Mapa from "../../components/Mapa/Mapa";

function Home({}) {
    

    return (
        <div className={styles.pageContent}>
            <Mapa />
        </div>
    );
} 

export default Home;