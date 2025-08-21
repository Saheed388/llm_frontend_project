function Logo() {
  return (
    <div className="logo" style={{top: '-10px'}}>
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="rolling-logo">
        <circle cx="50" cy="50" r="45" fill="url(#flagGradient)" stroke="#009933" strokeWidth="5"/>
        <path d="M30 60 C30 50, 70 50, 70 60 C70 70, 50 75, 30 60 Z" fill="#FFFFFF" stroke="#009933" strokeWidth="3"/>
        <path d="M50 30 V50 M40 40 H60" stroke="#FFC107" strokeWidth="5"/>
        <defs>
          <linearGradient id="flagGradient" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#009933"/>
            <stop offset="50%" stopColor="#FFFFFF"/>
            <stop offset="100%" stopColor="#009933"/>
          </linearGradient>
        </defs>
      </svg>
      <span className="logo-text"></span>
    </div>
  );
}

export default Logo;