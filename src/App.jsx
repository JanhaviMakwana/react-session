import UsersApp from "./components/Users";
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css'

function App() {

  return<Provider store={store}>
    <UsersApp/>
  </Provider>
}

export default App
