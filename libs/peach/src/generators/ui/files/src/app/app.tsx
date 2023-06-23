import styles from './app.module.css';
import {environment} from "../environments/environment";
export function App() {
  return (
    <div>
      Ciaone {environment.test_variable}
    </div>
  );
}

export default App;
