import styles from "./Home.module.css";
import Mapa from "../../components/Mapa/Mapa";

function Home({}) {
    

    return (
        <div className={styles.pageContent}>
            <h1>Home Page</h1>
            <Mapa />
        </div>
    );
} 

export default Home;