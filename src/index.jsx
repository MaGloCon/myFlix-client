import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import 'bootstrap/scss/bootstrap.scss'; // "~" for node-modules is not recognized by Parcel
import "./index.scss";
import Container from 'react-bootstrap/Container';

const CinephileApplication = () => {
  
  return (
    <Container>
      < MainView />
    </Container>
  );
};

const container = document.querySelector("#root"); 
const root = createRoot(container); 

root.render(<CinephileApplication />);