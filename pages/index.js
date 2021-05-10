import Link from 'next/link'

import Layout from '../components/Layout'

export default function Home() {

  const data = [
    {
      link: '/episodes',
      title: 'Episodes'
    },
    {
      link: '/characters',
      title: 'Characters'
    }
  ]

  return (
    <Layout>
      <div >
        <h1 className='flex justify-center mt-12 text-2xl font-semibold text-center'>Welcome to the Rick and Morty Database</h1>
        <div className='justify-evenly flex mt-20'>
        {data.map( (d) => (
          <Link href={d.link} key={d.title}>
                <a className='border border-gray bg-gray-200 p-4 my-2 text-lg rounded flex items-center'>
                    <h3 className='ml-2 font-bold'>{d.title}</h3>
                </a>
            </Link>
        ))}
        </div>
      </div>


    </Layout>
  )
}
