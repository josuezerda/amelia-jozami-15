import React, { useState, useEffect, useRef } from 'react';
import './index.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isReady, setIsReady] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef(null);

  const sparkles = React.useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      animationDuration: `${Math.random() * 8 + 8}s`,
      animationDelay: `${Math.random() * -20}s`,
      opacity: Math.random() * 0.15 + 0.05
    }));
  }, []);

  const eventDate = new Date('2026-05-09T21:30:00-03:00');

  // Asistente WhatsApp
  const whatsappNumber = "5493856110056";
  const wMessage = "¡Hola! Quiero confirmar mi asistencia al cumple de Amelia.";
  const wLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wMessage)}`;

  // Cover photo and slider photos
  const coverPhoto = 'portada.jpg'; // Elegida como portada
  const allPhotos = [
    'DSC08609.jpg', 'DSC08618.jpg', 'DSC08628.jpg', 'DSC08672.jpg', 
    'DSC08706.jpg', 'DSC08871.jpg', 'DSC08906.jpg', 'DSC08936.jpg', 
    'DSC09065.jpg', 'DSC09076.jpg', 'DSC09101.jpg', 'DSC09166.jpg', 'DSC09180.jpg'
  ];
  const sliderPhotos = allPhotos.filter(p => p !== coverPhoto);

  useEffect(() => {
    setIsReady(true);
    
    const calculateTimeLeft = () => {
      const difference = eventDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio playback was prevented:", e));
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music.m4a" type="audio/mp4" />
      </audio>

      {/* Sparkles de fondo (Global) */}
      <div className="sparkles-container">
        {sparkles.map((style, i) => (
          <div key={i} className="sparkle" style={style}></div>
        ))}
      </div>

      {/* Pantalla de Inicio / Sobre Clara */}
      <div className={`intro-overlay ${isOpened ? 'opened' : ''}`}>
        <div className="envelope-wrapper animate-fade-up" onClick={!isOpened ? handleOpenInvitation : undefined}>
          <div className="envelope-container animate-fade-up">
             <div className="text-center" style={{ marginBottom: '2rem' }}>
                <div className="hero-subtitle script-font text-gold" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', marginBottom: '0.2rem' }}>Mis 15</div>
                <h1 className="hero-title script-font" style={{ fontSize: 'clamp(4rem, 16vw, 7rem)', lineHeight: '1', margin: '0', color: '#cd9f81', textShadow: '0 4px 15px rgba(205,159,129,0.3)' }}>Amelia</h1>
                <div style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.3em', fontSize: 'clamp(0.6rem, 2.5vw, 1rem)', textTransform: 'uppercase', color: '#cd9f81', marginTop: '0.5rem' }}>Sarquiz Jozami</div>
             </div>
             
             {!isOpened && (
               <button className="btn btn-outline" style={{marginTop: '2rem', animation: 'fadeInUp 1s ease 1.5s forwards', opacity: 0}} onClick={(e) => { e.stopPropagation(); handleOpenInvitation(); }}>
                 ABRIR INVITACIÓN
               </button>
             )}
          </div>
        </div>
      </div>

      <div className="app-container" style={{ visibility: isOpened ? 'visible' : 'hidden', opacity: isOpened ? 1 : 0, transition: 'opacity 1s ease 1s' }}>
        
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-bg" style={{ backgroundImage: `linear-gradient(rgba(18,18,18,0.3), rgba(18,18,18,0.8)), url('/photos/${coverPhoto}')` }}></div>
          <div className={`hero-content animate-fade-up ${isReady ? '' : 'hidden'}`}>
            <div className="hero-subtitle script-font text-gold">Mis 15</div>
            <h1 className="hero-title script-font" style={{ marginBottom: '0.2rem' }}>Amelia</h1>
            <h2 className="mt-2 text-gold" style={{ letterSpacing: '0.3em', fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', textTransform: 'uppercase' }}>Sarquiz Jozami</h2>
            <p className="mt-6 text-gold hero-date" style={{ letterSpacing: '0.2em', marginTop: '1.5rem', fontSize: 'clamp(0.9rem, 4vw, 1.2rem)' }}>TE ESPERO PARA CELEBRAR</p>
            <div style={{ marginTop: '2rem' }}>
              <p className="date-text" style={{ fontSize: '1.2rem'}}>9 de Mayo, 2026</p>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="section bg-dark">
          <div className="section-divider"></div>
          <h2 className="section-title script-font">Falta Cada Vez Menos</h2>
          <div className="countdown-container">
            <div className="countdown-box">
              <div className="countdown-number">{timeLeft.days}</div>
              <div className="countdown-label">Días</div>
            </div>
            <div className="countdown-box">
              <div className="countdown-number">{timeLeft.hours}</div>
              <div className="countdown-label">Hs</div>
            </div>
            <div className="countdown-box">
              <div className="countdown-number">{timeLeft.minutes}</div>
              <div className="countdown-label">Min</div>
            </div>
            <div className="countdown-box">
              <div className="countdown-number">{timeLeft.seconds}</div>
              <div className="countdown-label">Seg</div>
            </div>
          </div>
        </section>

        {/* Info Gallery (Grilla Estática de 6 Fotos) */}
        <section className="section">
          <div className="section-divider"></div>
          <h2 className="section-title script-font">Un Vistazo</h2>
          <div className="gallery-container">
            {sliderPhotos.slice(0, 6).map((photo, index) => (
              <div key={index} className="gallery-item">
                <img src={`/photos/${photo}`} alt={`Amelia photo ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
          <p style={{marginTop: '2rem', fontStyle: 'italic', color: 'var(--color-primary)'}}>Preparate para una noche inolvidable</p>
        </section>

        {/* Detalles del Evento */}
        <section className="section">
          <div className="section-divider"></div>
          <h2 className="section-title script-font">Detalles del Evento</h2>
          
          <div className="details-vertical">
            {/* Fiesta */}
            <div className="detail-block">
              <div className="detail-icon-wrapper">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"/><path d="M12 15v6"/><path d="M7 8.5C7 5.5 9.5 3 12 3s5 2.5 5 5.5c0 1.5-.5 3-1.5 4.5l-3.5 5.5-3.5-5.5C7.5 11.5 7 10 7 8.5z"/><circle cx="12" cy="8" r="2"/></svg>
              </div>
              <h3 className="detail-title">Fiesta</h3>
              <p className="detail-text">
                <strong className="text-gold">Barrio Privado El Bosque</strong><br/>
                Ruta 51 y canal Fernández<br/>
                9 de Mayo - 21:30 Hs
              </p>
              <a href="https://maps.google.com/?q=Barrio+Privado+El+Bosque,+Ruta+51+y+canal+Fernandez" target="_blank" rel="noreferrer" className="btn btn-outline detail-btn">CÓMO LLEGAR</a>
            </div>
            <div className="detail-line"></div>
            {/* Dress code */}
            <div className="detail-block">
              <div className="detail-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8 22 8 16 12 18 19 12 15 6 19 8 12 2 8 9 8 12 2"/></svg>
              </div>
              <h3 className="detail-title">Dress Code</h3>
              <p className="detail-text">
                <strong className="text-gold">Formal</strong><br/>
                <span style={{fontSize: '0.85rem'}}>(Por favor reserva el blanco para la cumpleañera)</span>
              </p>
            </div>
            <div className="detail-line"></div>
            {/* Asistencia */}
            <div className="detail-block">
              <div className="detail-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h3 className="detail-title">Asistencia</h3>
              <p className="detail-text">
                Por favor, confirmá tu asistencia antes del 1 de Mayo para la organización.
              </p>
              <a href={wLink} target="_blank" rel="noreferrer" className="btn btn-solid detail-btn">CONFIRMAR</a>
            </div>
          </div>
        </section>

        {/* Música */}
        <section className="section bg-dark">
          <div className="section-divider"></div>
          <h2 className="section-title script-font">Música</h2>
          <div className="info-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '1.5rem'}}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><path d="M9 18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z"/><path d="M21 16v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z"/></svg>
              </div>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                ¿Qué canción no puede faltar en la fiesta?<br/>
                ¡Ayudame a armar la playlist ideal!
              </p>
              <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("¡Hola! Quiero recomendar este temazo para la fiesta: ")}`} target="_blank" rel="noreferrer" className="btn btn-outline detail-btn" style={{ marginTop: '0' }}>SUGERIR CANCIÓN</a>
          </div>
        </section>

        {/* Regalos */}
        <section className="section my-5">
          <div className="section-divider"></div>
          <h2 className="section-title script-font">Regalos</h2>
          <div className="info-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '1.5rem'}}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="14" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="22"/><line x1="3" y1="13" x2="21" y2="13"/><path d="M12 8V4.5a2.5 2.5 0 0 0-5 0c0 3.5 5 3.5 5 3.5s5 0 5-3.5a2.5 2.5 0 0 0-5 0V8"/></svg>
              </div>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                El mejor regalo es que compartas este día conmigo.<br/><br/>
                Pero si deseás hacerme un presente, te dejo mi cuenta:<br/><br/>
                💳 <strong>Alias:</strong> ameliasarquiz<br/>
                🏦 <strong>CVU:</strong> 0000003100000852387841<br/><br/>
                ¡Muchísimas gracias de todo corazón! 💕
              </p>
          </div>
        </section>



        {/* Floating WhatsApp RSVP */}
        <a href={wLink} target="_blank" rel="noreferrer" className="whatsapp-fab">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2026 - Amelia Mis 15 Años.</p>
          <p style={{ marginTop: '0.8rem', fontSize: '0.85rem' }}>
            Copyright : <a href="https://fusionia.com.ar" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold' }}>Fusion IA</a>
          </p>
        </footer>

      </div>
    </>
  );
}

export default App;
