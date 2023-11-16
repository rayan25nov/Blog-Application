import { useSelector } from "react-redux";
import { selectDarkMode } from "./Features/ToggleModeSlice";
import Styles from "./App.module.css";
import Navbar from "./Navbar/Navbar.jsx";

const App = () => {
  const darkMode = useSelector(selectDarkMode);
  return (
    <div
      className={`${Styles.container} ${darkMode ? Styles.dark : Styles.light}`}
    >
      <Navbar />
    </div>
  );
};

export default App;
