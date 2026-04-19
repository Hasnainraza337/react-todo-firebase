import { ConfigProvider } from 'antd';
import './App.css'
import ScreenLoader from './components/Misc/ScreenLoader';
import { useAuthContext } from './context/AuthContext'
import Routes from "./pages/Routes"

function App() {
  const { isAppLoading } = useAuthContext();

  return (
    <>
      <ConfigProvider theme={{
        token: { colorPrimary: '#1D263B' },
        components: {
          Layout: {
            siderBg: '#1D263B',
          },
          Menu: {
            darkItemBg: '#1D263B',         // Menu items ka background
            darkItemSelectedBg: '#3E4A61', // Selected item ka color (thoda light shade behtar lagta hai)
            darkItemHoverBg: '#2A344A',    // Hover karne par jo color aaye
            darkItemColor: '#fff',      // Text ka color
            darkItemSelectedColor: '#fe9a00', // Selected text ka color
          },
          Button: { controlOutlineWidth: 0 }
        }
      }}>

        {isAppLoading
          ? <ScreenLoader />
          : <Routes />
        }
      </ConfigProvider>
    </>
  )
}

export default App
