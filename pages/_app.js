import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import Head from 'next/head'
import Image from 'next/image'
import { useState} from 'react'

async function fetcher(url){
  const res = await fetch(url);
  return await res.json();
}

function MyApp({ Component, pageProps }) {
  const [searchSentence, setSearchSentence] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const [shouldFetch, setShouldFetch] = useState(false);

  function handleClick() {
    setShouldFetch(true);
  }

  const handleChange = (event) => {
    console.log('handleChange: ', event.target.value)
    setSearchSentence(event.target.value);
    console.log('searchSentence: ', searchSentence)
  };



  //const { data:gPT3data, error:gPT3error, isLoading:gPT3IsLoading } = useSWR([`/api/gpt3`], fetcher);
  const { data:gPT3data, error:gPT3error, isLoading:gPT3IsLoading } = useSWR(shouldFetch?[`/api/gpt3?searchSentence=${searchSentence}`]:null, fetcher);
  
  const { data:autolistData, error:autolistError, isLoading:autolistIsLoading } = useSWR(() => ( 
    `https://www.autolist.com/api/v2/search?page=1&make=${gPT3data.answer.make}&model=${gPT3data.answer.model}&year_max=${gPT3data.answer.year}&year_min=${gPT3data.answer.year}` ), fetcher);

  
  //   if (gPT3error) return <div>Failed to load GPT3 data</div>
  // if (gPT3IsLoading) return <div>Loading GPT3 data...</div>
  // if (!gPT3data) return null  

  

  // if (autolistError) return <div>Failed to load Autolist data</div>
  // if (autolistIsLoading) return <div>Loading Autolist data...</div>
  // if (!autolistData) return null

  return (
   
    <div className={styles.container}>
       <div>GTP make{gPT3data?.answer.make}</div>
       <div>{gPT3data?.answer.model}</div>
       <div>{gPT3data?.answer.year}</div>
       <div>Autolist make:  {autolistData?.records[0].make_name}</div>
    <Head>
      <title>OpenAI aided used car search</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Let's find your perfect car
      </h1>

      <p className={styles.description}>
        Tell us a little about what your are looking for and our personalized assistant will help you find the perfect car for you.
      </p>

      <p className={styles.description}>
        Here are some popular prompts that you can try:  
      </p>
      <p className={styles.description}>
        "Im looking for a 2019 Camry in New Jersey"
      </p>



      <div className={styles.grid}>
        

        {/* <div  className={styles.card}>
          <h2>jos &rarr;</h2>
          <p>LYep</p>
        </div>

        <div  className={styles.card}>
          <h2>jos &rarr;</h2>
          <p>LYep</p>
        </div>
        <div  className={styles.card}>
          <h2>jos &rarr;</h2>
          search sentence
          {searchSentence}
        </div> */}
        
      </div>
    </main>

    <footer className={styles.footer}>
    <div  className={styles.card}>
    
      <div className="input-field">
         <input
         placeholder="Write a message"
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={searchSentence}
      />
      </div>
      <button  onClick={handleClick}>Fetch</button>
     
          
        </div>
    </footer>
    <div>
</div>
  </div>
    

    
  )

//   return (
    
 
// )
}

export default MyApp


//   return (
//     <div>
//       {autolistData.records[0].make_and_model}
//     </div>
//   )
// }

// export default MyApp
