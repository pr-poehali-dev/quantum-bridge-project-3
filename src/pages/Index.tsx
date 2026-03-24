import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedLines({ lines }: { lines: string[] }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref}>
      {lines.map((line, i) => (
        <div
          key={i}
          className="poem-line"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <div className="logo">ЕВТУШЕНКО</div>
        <nav>
          <a href="#">Биография</a>
          <a href="#">Стихи</a>
          <a href="#">Эпоха</a>
          <a href="#">Цитаты</a>
        </nav>
        <button className="btn-cta">1932 — 2017</button>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div
              className="eyebrow-label"
              style={{
                opacity: 1,
                animation: "fadeInDown 1s ease 0.2s both",
              }}
            >
              Поэт. Бунтарь. Голос эпохи.
            </div>
            <h1
              className="hero-title"
              style={{ animation: "fadeInUp 1s ease 0.4s both" }}
            >
              ЕВГЕНИЙ
              <br />
              <span>ЕВТУ-</span>
              <br />
              ШЕНКО
            </h1>
            <p
              className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed"
              style={{
                color: "#888",
                animation: "fadeInUp 1s ease 0.7s both",
              }}
            >
              «Поэт в России — больше, чем поэт». Голос целого поколения,
              совесть эпохи, человек, который говорил то, что думал.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-5"
              style={{ animation: "fadeInUp 1s ease 0.9s both" }}
            >
              <button className="btn-cta" style={{ background: "var(--primary)", color: "white" }}>
                Читать стихи
              </button>
              <button className="btn-cta" style={{ background: "transparent", color: "var(--bg)", borderColor: "var(--bg)" }}>
                Смотреть биографию
              </button>
            </div>
          </div>
          <div
            className="hero-img"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
              transition: "transform 0.1s linear",
            }}
          >
            <div className="sticker">
              1932
              <br />
              ЗИМА
              <br />
              СИБИРЬ
            </div>
            <div className="floating-tag hidden md:block" style={{ top: "20%", left: "10%" }}>
              #ОТТЕПЕЛЬ
            </div>
            <div className="floating-tag hidden md:block" style={{ bottom: "30%", right: "20%" }}>
              БАБИЙ ЯР
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee">
          <div className="marquee-content">
            &nbsp; * ПОЭТ В России БОЛЬШЕ ЧЕМ ПОЭТ * БАБИЙ ЯР * БРАТСКАЯ ГЭС * НАСЛЕДНИКИ СТАЛИНА * СТИХИ 60-Х *
            ПОЭТ В РОССИИ БОЛЬШЕ ЧЕМ ПОЭТ * БАБИЙ ЯР * БРАТСКАЯ ГЭС * НАСЛЕДНИКИ СТАЛИНА * СТИХИ 60-Х
          </div>
        </div>

        {/* СТИХИ */}
        <section className="section-padding">
          <div className="section-header">
            <h2 className="section-title">ВЕЛИКИЕ СТИХИ</h2>
            <a
              href="#"
              className="text-sm md:text-base"
              style={{ color: "var(--bg)", fontWeight: 800, textTransform: "uppercase" }}
            >
              Все произведения
            </a>
          </div>

          <div className="menu-grid">
            <div className="menu-card">
              <span className="menu-tag">1961</span>
              <div className="poem-cover" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #4a1060 100%)" }}>
                <div className="poem-cover-text">БАБИЙ<br />ЯР</div>
              </div>
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>Бабий Яр</h3>
                  <span className="price" style={{ fontSize: "12px" }}>Антифашизм</span>
                </div>
                <p style={{ fontSize: "14px", color: "#aaa" }}>
                  «Над Бабьим Яром памятников нет...» — одно из самых смелых стихотворений советской эпохи.
                </p>
              </div>
            </div>

            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--secondary)" }}>1953</span>
              <div className="poem-cover" style={{ background: "linear-gradient(135deg, #0a1a2e 0%, #103060 100%)" }}>
                <div className="poem-cover-text">СО МНОЙ<br />СЛУЧИЛОСЬ</div>
              </div>
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>Со мной вот что происходит</h3>
                  <span className="price" style={{ fontSize: "12px" }}>Лирика</span>
                </div>
                <p style={{ fontSize: "14px", color: "#aaa" }}>
                  Исповедальная лирика, сделавшая Евтушенко голосом целого поколения молодых.
                </p>
              </div>
            </div>

            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--primary)" }}>1962</span>
              <div className="poem-cover" style={{ background: "linear-gradient(135deg, #2e1a0a 0%, #603010 100%)" }}>
                <div className="poem-cover-text">НАСЛЕД-<br />НИКИ</div>
              </div>
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h3>Наследники Сталина</h3>
                  <span className="price" style={{ fontSize: "12px" }}>Гражданская</span>
                </div>
                <p style={{ fontSize: "14px", color: "#aaa" }}>
                  Опубликовано в «Правде» с разрешения Хрущёва. Смелость, которая изменила историю.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ЦИТАТА - БОЛЬШАЯ */}
        <section className="retro-vibe">
          <div>
            <FadeIn>
              <h2 className="vibe-title">ГЛАВНАЯ СТРОФА</h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <AnimatedLines lines={[
                "«Поэт в России —",
                "больше, чем поэт.",
                "В ней суждено поэтами рождаться",
                "лишь тем, в ком бродит гордый дух гражданства,",
                "кому уюта нет, покоя нет...»",
              ]} />
            </FadeIn>
            <FadeIn delay={0.6}>
              <button className="btn-cta" style={{ background: "var(--bg)", color: "var(--dark)", borderColor: "var(--bg)", marginTop: "30px" }}>
                Братская ГЭС, 1965
              </button>
            </FadeIn>
          </div>
          <div className="vibe-img"></div>
        </section>

        {/* БИОГРАФИЯ - ГАЛЕРЕЯ */}
        <section className="section-padding">
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: "20px", textAlign: "center" }}>
              ВЕХИ ЖИЗНИ
            </h2>
            <p style={{ textAlign: "center", color: "#888", marginBottom: "50px", fontSize: "16px" }}>
              От Сибири до Нью-Йорка — судьба поэта целой эпохи
            </p>
          </FadeIn>
          <div className="timeline">
            {[
              { year: "1932", event: "Рождение в Зиме, Иркутская область, Сибирь" },
              { year: "1949", event: "Первые публикации. Начало литературного пути в Москве" },
              { year: "1961", event: "«Бабий Яр» — поэма, потрясшая советское общество" },
              { year: "1962", event: "«Наследники Сталина» опубликованы в «Правде» по решению Хрущёва" },
              { year: "1965", event: "«Братская ГЭС» — эпос о советской эпохе и её противоречиях" },
              { year: "2017", event: "Ушёл из жизни в Талсе, Оклахома, США. Похоронен в Переделкино" },
            ].map(({ year, event }, i) => (
              <FadeIn key={year} delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-year">{year}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-text">{event}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div>
          <div className="footer-logo">ЕВТУШЕНКО</div>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            Евгений Александрович Евтушенко (1932–2017) — русский советский поэт,
            прозаик, режиссёр и публицист. Один из крупнейших поэтов эпохи «оттепели».
          </p>
        </div>
        <div className="footer-links">
          <h4>Разделы</h4>
          <ul>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Биография</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Стихи</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Эпоха</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Цитаты</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Годы жизни</h4>
          <ul>
            <li>Родился: 18 июля 1932</li>
            <li>Ушёл: 1 апреля 2017</li>
            <li>Зима — Москва — Нью-Йорк</li>
            <li>«Таланту надо помогать»</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
