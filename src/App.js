import logo from './logo.svg';
import './App.css';

//Importar o bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Importar o gerenciador de rotas
import { BrowserRouter , Route, Routes } from "react-router-dom"

//Importar as páginas
import Login from './pages/Login';
import Produtos from './pages/Produtos';
import CadProdutos from './pages/CadProdutos';

//Importar a NavBar
import NaveBar from './components/NaveBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <NaveBar /> */}
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/produtos' element={<Produtos/>} />
          <Route path='/cadprodutos' element={<CadProdutos/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
