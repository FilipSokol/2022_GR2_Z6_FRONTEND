import axios from "axios";
import styles from "./App.module.scss";
import Layout from "./views/Layout";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Layout />
      </div>
    </div>
  );
}

export default App;
