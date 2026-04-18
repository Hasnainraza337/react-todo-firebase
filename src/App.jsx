import './App.css'
import ScreenLoader from './components/Misc/ScreenLoader';
import { useAuthContext } from './context/AuthContext'
import Routes from "./pages/Routes"

function App() {
  const { isAppLoading } = useAuthContext();

  return (
    <>
      {isAppLoading
        ? <ScreenLoader />
        : <Routes />
      }
    </>
  )
}

export default App
