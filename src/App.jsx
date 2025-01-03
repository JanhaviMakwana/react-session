import ToDoApp from './components/Todo'
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css'

function App() {

  return<Provider store={store}>
    <ToDoApp/>
  </Provider>
}

export default App
