import Head from 'next/head'

const Layout = ({ children, title = "CRYPTO SPY - by gabrielantonio" }) => {
  return (
    <div className="layout">
      <Head>
        <title>:: Crypto Spy :: by gabrielantonio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <h1 className="coin_title"> { title }</h1>
      </header>
      <main>{ children }</main>
    </div>
 )
};

export default Layout;