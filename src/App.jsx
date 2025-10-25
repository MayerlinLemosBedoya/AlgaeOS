import { Routes, Route } from 'react-router-dom'
import { Web3Provider } from './providers/Web3Provider'
import Landing from './components/Landing'
import App from './components/App'

function AppRouter() {
  return (
    <Web3Provider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Web3Provider>
  )
}

export default AppRouter
