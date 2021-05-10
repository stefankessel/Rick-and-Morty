import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'

export default function Characters({characters}){
    const profiles = (characters.map( (character) => (
        <Link key={character.id} href={`/character?name=${character.name}`}>
            <a className='border border-gray bg-gray-200 p-4 my-2 text-lg rounded flex items-center'>
                <Image src={character.image} width={300} height={300} alt={character.name}/>
                <h3 className='ml-2 font-bold'>{character.name}</h3>
            </a>
        </Link>
        
    )))

    return(
        <Layout>
            <h1 className='font-bold p-2 text-xl'>Characters</h1>
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
                characters{
                  info{
                    count,
                    pages
                  }
                  results{
                      image,
                      id,
                      name
                    }
                }
              }
            `,
          });

          return {
            props: {
                characters: data.characters.results
            }
        }

}
    

