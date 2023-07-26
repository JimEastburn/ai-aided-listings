import '../styles/globals.css'

import useSWR from 'swr'

async function fetcher(url){
  const res = await fetch(url);
  return await res.json();
}

function MyApp({ Component, pageProps }) {
  
  const { data:gPT3data, error:gPT3error, isLoading:gPT3IsLoading } = useSWR(['/api/gpt3'], fetcher);
  const { data:autolistData, error:autolistError, isLoading:autolistIsLoading } = useSWR(() => (gPT3data ? 
    `https://www.autolist.com/api/v2/search?page=1&make=${gPT3data.answer.make}&model=${gPT3data.answer.model}&year_max=${gPT3data.answer.year}&year_min=${gPT3data.answer.year}` : null), fetcher);

  if (gPT3error) return <div>Failed to load GPT3 data</div>
  if (gPT3IsLoading) return <div>Loading GPT3 data...</div>
  if (!gPT3data) return null  

  

  if (autolistError) return <div>Failed to load Autolist data</div>
  if (autolistIsLoading) return <div>Loading Autolist data...</div>
  if (!autolistData) return null

  return (
    <div>
      {autolistData.records[0].make_and_model}
    </div>
  )
}

export default MyApp
