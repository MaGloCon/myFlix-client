import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { MainView } from "./components/MainView/MainView";
import 'bootstrap/scss/bootstrap.scss'; 

const CinephileApplication = () => {
  
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
};

const container = document.querySelector("#root"); 
const root = createRoot(container); 

root.render(<CinephileApplication />);