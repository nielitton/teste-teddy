import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import Routers from './routes'
import GlobalStyle from './styles/globalStyle'

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Routers />
    </>
  )
}

export default App
