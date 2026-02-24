import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Meta SEO */}
        <meta
          name="description"
          content="Ahli Duplikat Kunci Mobil, Immobilizer, Brankas & Rumah #1 di Jabodetabek. Layanan Panggilan 24 Jam Cepat & Bergaransi. Hubungi 0858-9428-3295."
        />
        <meta
          name="keywords"
          content="duplikat kunci, ahli kunci bekasi, tukang kunci jabodetabek, immobilizer mobil, kunci brankas, duplikat remote, service kunci 24 jam, jatiasih"
        />
        <meta name="author" content="DUKUN DUPLIKAT KUNCI" />
        <meta property="og:title" content="DUKUN DUPLIKAT KUNCI - Ahli Kunci #1 Jabodetabek" />
        <meta
          property="og:description"
          content="Layanan duplikat kunci mobil, motor, rumah & brankas profesional 24 jam. Area Bekasi, Jakarta, Bogor, Depok, Tangerang."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
