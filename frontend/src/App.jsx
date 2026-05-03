import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AllPasswords from './pages/AllPasswords'
import Passkeys from './pages/Passkeys'
import Codes from './pages/Codes'
import WiFi from './pages/WiFi'
import Security from './pages/Security'
import Deleted from './pages/Deleted'
import AddEditPassword from './pages/AddEditPassword'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all' element={<AllPasswords />} />
        <Route path='/passkeys' element={<Passkeys />} />
        <Route path='/codes' element={<Codes />} />
        <Route path='/wifi' element={<WiFi />} />
        <Route path='/security' element={<Security />} />
        <Route path='/deleted' element={<Deleted />} />
        <Route path='/add' element={<AddEditPassword />} />
      </Routes>
    </div>
  )
}

export default App