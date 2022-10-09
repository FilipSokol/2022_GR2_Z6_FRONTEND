import styles from "./App.module.scss";
import Layout from './views/Layout'

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
