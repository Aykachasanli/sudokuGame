
import { Routes, Route } from 'react-router-dom'
import Home from './Modules/Home/View/Home'
import Easy from './components/Easy'
import Medium from './components/Medium'
import Hard from './components/Hard'
import Result from './Modules/Result/View/Result'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/easy" element={<Easy/>} />
      <Route path="/medium" element={<Medium/>} />
      <Route path="/hard" element={<Hard/>} />
       <Route path="/result" element={<Result />} />
    </Routes>
  )
}
