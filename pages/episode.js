import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect} from 'react'
import { useRouter } from 'next/router'


export default function Character({episode}){
    
    const router = useRouter()
    useEffect( () => {
        if(!episode) return router.push('/episodes')
    })
    
    return(
        <Layout>
            <Link href='/episodes'>
                <a className='font-bold p-2 bg-gray-200'>
                 Go to Episode
                </a>
            </Link>
                
            {episode &&(
                            <><h1 className='my-4 font-bold'>{episode.name}</h1>
                            <div>
                                <ul>
                                    {episode.characters.map( (c,i) => (
                                        <li key={i} className='pt-2'>
                                        <Link href={`/character?name=${c.name}`}>
                                            <a>{c.name}</a>
                                        </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div></>
            )}
        </Layout>

    )
}

export async function getServerSideProps({query}){
    try{
        const name = query.name
        const client = new ApolloClient({
            uri: "https://rickandmortyapi.com/graphql/",
            cache: new InMemoryCache(),
          });
          const { data } = await client.query({
            query: gql`
            query{
                episodes(filter:{name: "${name}"}){
                  results{name, id, characters{name}}
                }
              }
            `,
          });
          return {
            props: {
                episode: data.episodes.results[0]
            }
        }

    }
    catch(err){
         console.log(err)
         return {
            props: {
                episode: null
            }
        }
    }
}