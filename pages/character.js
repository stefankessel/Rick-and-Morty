import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import * as localForage from 'localforage'
 

export default function Character({characters}){


    const [fav, setFav] = useState(null)

    localForage.getItem(characters.name).then( res => {
        setFav(res)      
    })
    

    const likeHandler = async() => {
        if(fav){
            await localForage.removeItem(characters.name)
            setFav(null)
        }
        else{
            await localForage.setItem(characters.name, characters.name)
            setFav(characters.name)
        }
    }
    
    const getFavImg = fav ? '/img/heart_red.svg' : '/img/heart.svg'

    return(

        <Layout>
            <Link href='/characters'>
                <a className='font-bold p-2 bg-gray-200'>
                 Go to Characters
                </a>
            </Link>
                
            {characters &&(
                        <>
                        <div className='flex justify-between my-4 pt-4'>
                            <div className='mr-4'>
                                <h1 className='font-bold text-xl font-semibold'>{characters.name}</h1>
                                <Image src={characters.image} width={300} height={300} alt={characters.name}/>
                                <Image src={getFavImg} width={50} height={50} alt='like' onClick={likeHandler}/>
                            </div>
                            <div>
                                <ul>
                                    {characters.episode.map( (e,i) => (
                                        <li key={i} className='pt-2'>
                                        <Link href={`/episode?name=${e.name}`}>
                                            <a>{e.name}</a>
                                        </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                            </>
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
                characters(page: 1, filter:{name: "${name}"}){
                  info{
                    count,
                    pages
                  }
                  results{id, name, image, episode{name}} 
                }
              }
            `,
          });
          return {
            props: {
                characters: data.characters.results[0]
            }
        }

    }
    catch(err){
         console.log(err)
         return {
            props: {
                characters: null
            }
        }
    }

}