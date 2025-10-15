
export default function Loading({text='Yüklənir...'}) {
  return (
    <div className="loading-screen">
      <div className="loader"></div>
      <div className="loading-text">{text}</div>
    </div>
  )
}
