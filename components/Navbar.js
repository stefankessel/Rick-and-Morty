import Link from 'next/link';

export default function Navbar(){
  return (
    <nav className='flex justify-between'>
      <div className='ml-4'>
        <h1>Rick and Morty</h1>
      </div> 
      <div className='mr-2'>       
      <Link className='mr-2' href="/"><a className='mr-4'>Home</a></Link>
      <Link className='mr-2' href="/characters"><a className='mr-4'>Characters</a></Link>
      <Link className='mr-2' href="/episodes"><a className='mr-4'>Episodes</a></Link>         
      </div>
    </nav>
);
}