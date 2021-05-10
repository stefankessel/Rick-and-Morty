import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout({ children}){
    return(
      <div className='bg-gray-300'>
        <Head>
          <title>Rick and Morty</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main className='container mx-auto pt-8 max-w-xl min-h-screen'>
          {children}
        </main>
      </div>

    )
}