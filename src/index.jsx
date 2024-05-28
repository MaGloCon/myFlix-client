import { createRoot } from 'react-dom/client';
import { MainView } from "./components/MainView/MainView";
import 'bootstrap/scss/bootstrap.scss'; 
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