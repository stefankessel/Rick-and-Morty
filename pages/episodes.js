import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function Episodes({episodes}){
    const profiles = (episodes.map( (episode) => (
        <Link key={episode.id} href={`/episode?name=${episode.name}`}>
            <a className='border border-gray bg-gray-200 p-4 my-2 text-lg rounded flex items-center'>
                <h3 className='ml-2 font-bold'>{episode.name}</h3>
            </a>
        </Link>
        
    )))

    return(
        <Layout>
            <h1 className='font-bold p-2 text-xl'>Episodes</h1>
            <div className='grid'>
                {profiles}
            </div>
        </Layout>

    )
}

export async function getStaticProps() {

        const client = new ApolloClient({
            uri: "https://rickandmortyapi.com/graphql/",
            cache: new InMemoryCache(),
          });
          const { data } = await client.query({
            query: gql`
            query{
                episodes{
                  results{name, id}
                }
              }
            `,
          });

          return {
            props: {
                episodes: data.episodes.results
            }
        }

}
    

