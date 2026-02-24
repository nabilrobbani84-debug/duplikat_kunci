import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// Navbar Component
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
          <i className="fas fa-key"></i>
          <span>DUKUN DUPLIKAT KUNCI</span>
        </a>
        <ul className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
          <li>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Beranda
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Layanan
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              Tentang
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="btn-contact"
              onClick={() => setMenuOpen(false)}
            >
              Hubungi Kami
            </a>
          </li>
        </ul>
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </nav>
  );
}

// Three.js 3D Key Canvas Component
function ThreeJSCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;

    const init = async () => {
      const container = containerRef.current;
      if (!container) return;

      // Dynamically import Three.js (client-side only)
      const THREE = await import('three');

      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xf1c40f, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
      pointLight2.position.set(-5, -5, 5);
      scene.add(pointLight2);

      // Key Group
      const keyGroup = new THREE.Group();

      // Material - Metallic Gold
      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        roughness: 0.3,
        metalness: 0.8,
        emissive: new THREE.Color(0x222222),
      });

      // 1. Key Head (Bow) - A torus
      const headGeometry = new THREE.TorusGeometry(0.8, 0.2, 16, 100);
      const head = new THREE.Mesh(headGeometry, material);
      head.position.x = -2;
      keyGroup.add(head);

      // 2. Shaft
      const shaftGeometry = new THREE.CylinderGeometry(0.15, 0.15, 3, 32);
      const shaft = new THREE.Mesh(shaftGeometry, material);
      shaft.rotation.z = Math.PI / 2;
      shaft.position.x = 0;
      keyGroup.add(shaft);

      // 3. Teeth / Bitting
      const teethGroup = new THREE.Group();
      const toothGeo = new THREE.BoxGeometry(0.4, 0.4, 0.1);

      for (let i = 0; i < 3; i++) {
        const tooth = new THREE.Mesh(toothGeo, material);
        tooth.position.x = 1.0 + i * 0.3;
        tooth.position.y = -0.3 + Math.random() * -0.2;
        tooth.scale.y = 0.5 + Math.random();
        teethGroup.add(tooth);
      }
      keyGroup.add(teethGroup);

      scene.add(keyGroup);

      // Animation Loop
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        keyGroup.rotation.y += 0.005;
        keyGroup.rotation.x += 0.002;
        renderer.render(scene, camera);
      };
      animate();

      // Handle Resize
      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // Scroll Effect
      const handleScroll = () => {
        keyGroup.rotation.y += 0.05;
      };
      window.addEventListener('scroll', handleScroll);

      // Cleanup
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      if (cleanup) cleanup();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <div ref={containerRef} id="canvas-container" style={{ width: '100%', height: '100%' }} />;
}

// AOS Hook
function useAOS() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// Main Home Page
export default function Home() {
  useAOS();

  return (
    <>
      <Head>
        <title>DUKUN DUPLIKAT KUNCI - Ahli Kunci #1 Jabodetabek</title>
      </Head>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content" data-aos="fade-right">
          <h1>
            Solusi Kunci <br />
            <span className="highlight">Profesional &amp; Cepat</span>
          </h1>
          <p>
            Ahli duplikat kunci segala jenis kendaraan, rumah, dan brankas.
            Layanan panggil 24 jam.
          </p>
          <div className="cta-buttons">
            <a
              href="https://wa.me/6285894283295"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i> Hubungi Sekarang
            </a>
            <a href="#services" className="btn btn-secondary">
              Lihat Layanan
            </a>
          </div>
        </div>
        <div className="hero-3d">
          <ThreeJSCanvas />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Layanan Unggulan
          </h2>
          <div className="services-grid">
            <div className="service-card" data-aos="flip-left">
              <div className="icon-box">
                <i className="fas fa-car"></i>
              </div>
              <h3>Duplikat Kunci Mobil</h3>
              <p>Ahli duplikat kunci mobil segala merek, immobilizer &amp; smart key.</p>
            </div>
            <div className="service-card" data-aos="flip-left" data-aos-delay="100">
              <div className="icon-box">
                <i className="fas fa-lock"></i>
              </div>
              <h3>Kunci Brankas</h3>
              <p>Buka dan perbaikan kunci brankas macet atau lupa kombinasi.</p>
            </div>
            <div className="service-card" data-aos="flip-left" data-aos-delay="200">
              <div className="icon-box">
                <i className="fas fa-wifi"></i>
              </div>
              <h3>Duplikat Remote</h3>
              <p>Duplikat remote mobil, garasi, dan pagar otomatis.</p>
            </div>
            <div className="service-card" data-aos="flip-left" data-aos-delay="300">
              <div className="icon-box">
                <i className="fas fa-home"></i>
              </div>
              <h3>Kunci Rumah &amp; Pintu</h3>
              <p>Solusi kunci pintu rumah macet, hilang, atau patah.</p>
            </div>
            <div className="service-card" data-aos="flip-left" data-aos-delay="400">
              <div className="icon-box">
                <i className="fas fa-microchip"></i>
              </div>
              <h3>Immobilizer</h3>
              <p>Spesialis pemrograman ulang chip immobilizer jika hilang.</p>
            </div>
            <div className="service-card" data-aos="flip-left" data-aos-delay="500">
              <div className="icon-box">
                <i className="fas fa-phone-volume"></i>
              </div>
              <h3>Layanan Panggilan</h3>
              <p>Siap datang ke lokasi Anda 24 jam untuk keadaan darurat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section id="about" className="features">
        <div className="container">
          <div className="feature-item" data-aos="fade-right">
            <div className="feature-text">
              <h3>Teknologi Canggih</h3>
              <p>
                Menggunakan mesin duplikat komputerisasi untuk presisi tinggi
                dan hasil sempurna.
              </p>
            </div>
            <div className="feature-icon">
              <i className="fas fa-microchip"></i>
            </div>
          </div>
          <div className="feature-item reverse" data-aos="fade-left">
            <div className="feature-text">
              <h3>Layanan Panggilan</h3>
              <p>
                Siap datang ke lokasi Anda kapan saja kunci Anda bermasalah.
                Hemat waktu dan tenaga.
              </p>
            </div>
            <div className="feature-icon">
              <i className="fas fa-shipping-fast"></i>
            </div>
          </div>
          <div className="feature-item" data-aos="fade-right">
            <div className="feature-text">
              <h3>Bergaransi</h3>
              <p>
                Setiap pembuatan kunci kami bergaransi. Tidak cocok? Kami ganti
                baru atau uang kembali.
              </p>
            </div>
            <div className="feature-icon">
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title" data-aos="zoom-in">
            Lokasi &amp; Kontak
          </h2>
          <div className="contact-wrapper">
            <div className="contact-info" data-aos="fade-up">
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Alamat</h4>
                  <p>
                    Jl. Wibawa Mukti II Kp. Pedurenan, RT.001/RW.006,
                    Jatiluhur, Jatiasih, Bekasi
                  </p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h4>Telepon / WA</h4>
                  <p>+62 858-9428-3295</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h4>Jam Operasional</h4>
                  <p>Buka 24 Jam (Setiap Hari)</p>
                </div>
              </div>
              <a
                href="https://wa.me/6285894283295"
                className="btn btn-primary full-width"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i> Kirim Pesan WhatsApp
              </a>
            </div>
            <div
              className="map-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <iframe
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=DUKUN%20DUPLIKAT%20KUNCI%20Jl.%20Wibawa%20Mukti%20II%20Kp.%20Pedurenan,%20Jatiluhur,%20Jatiasih,%20Bekasi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>
            &copy; 2024 <span>DUKUN DUPLIKAT KUNCI</span>. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
