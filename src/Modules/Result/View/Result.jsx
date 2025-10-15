import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Result() {
  const elapsed = useSelector(s => s.game.elapsed)   


 
  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className="result-page">
      <h2>Oyunu tamamladın!</h2>
      
      <div className="result-info">
        <p> Keçən vaxt: <b>{formatTime(elapsed)}</b></p>
       
      </div>

      <div className="result-buttons">
        <Link to="/" className="btn"> Ana səhifə</Link>
        <Link to="/game" className="btn"> Yenidən oyna</Link>
      </div>
    </div>
  )
}
