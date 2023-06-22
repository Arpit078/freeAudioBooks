import axios from "axios"
import cheerio from "cheerio"

const head = {Headers :{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}}



export async function fetch(url,name){
    const data = axios.get(url,head)
    .then(res=>{
        const data = res.data
        const $ = cheerio.load(data)  
        const title = $('h1.title-page').text()
        const link =  $('audio.wp-audio-shortcode').find('a').attr('href')
        const img = $('figure.wp-caption.aligncenter img').attr('data-lazy-src')
        let count =0
        const number =  $('audio.wp-audio-shortcode').each((el,i)=>{count = el})
        const a = `{
            "title":"${title}",
            "img":"${img}",
            "audio_book_url":"${link}",
            "number":"${count+1}"
        }`
        return a    
    }
    )
    return data
}


export async function fetchFullLengthAudiobooksWebsite(url,name){
    const data = axios.get(url,head)
    .then(res=>{
        const data = res.data
        const $ = cheerio.load(data)  
        const title = $('h1.entry-title').text()
        const link =  $('audio.wp-audio-shortcode').find('a').attr('href')
        const img = $('img').attr('src')
        let count =0
        const number =  $('audio.wp-audio-shortcode').each((el,i)=>{count = el})
        const a = `{
            "title":"${title}",
            "img":"${img}",
            "audio_book_url":"${link}",
            "number":"${count+1}"
        }`
        return a    
    }
    )
    return data
}   
// const data = await fetchFullLengthAudiobooksWebsite("https://fulllengthaudiobook.com/robert-bly-iron-john-audiobook/")
// const data2 = await fetch("https://goldenaudiobook.com/lucy-foley-the-guest-list-audiobook/")

// console.log(data,data2)
