import { createRoot } from 'react-dom/client';
import { MainView } from "./components/MainView/MainView";
import 'bootstrap/scss/bootstrap.scss'; 
import "./index.scss";

const CinephileApplication = () => {
  
  return (
      < MainView />
  );
};

const container = document.querySelector("#root"); 
const root = createRoot(container); 

root.render(<CinephileApplication />);