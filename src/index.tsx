import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { Store } from './store';
import './styles/global.scss';

// import {ModalProductFormProvider} from './contexts/ModalProductContext'


ReactDOM.render(
  <Provider store={Store}>
    {/* <ModalProductFormProvider> */}
      <App />
    {/* </ModalProductFormProvider> */}
  </Provider>,
  document.getElementById('root')
);
