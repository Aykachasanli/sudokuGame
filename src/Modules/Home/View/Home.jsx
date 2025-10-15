import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../../components/Loading'


export default function Home(){
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const t = setTimeout(()=> setLoading(false), 1000)
    return ()=> clearTimeout(t)
  },[])

  return (
    <div className="page-home">
      {loading ? <Loading text="Sudoku"/> : (
        <div className="home-inner">
          <h1>Sudoku</h1>
          <p>Səviyyə seçin</p>
          <div className="buttons">
            <Link className="btn" to="/easy">Asan</Link>
            <Link className="btn" to="/medium">Orta</Link>
            <Link className="btn" to="/hard">Çətin</Link>
          </div>
        </div>
      )}
    </div>
  )
}
