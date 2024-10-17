import Header from "../components/Header";
import Meals from "../components/Meals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Meals />
    </>
  );
}

export default App;
