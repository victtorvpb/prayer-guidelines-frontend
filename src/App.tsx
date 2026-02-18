import { Routes, Route } from 'react-router-dom'
import PrayerGuidelines from './pages/PrayerGuidelines'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrayerGuidelines />} />
    </Routes>
  )
}

export default App
