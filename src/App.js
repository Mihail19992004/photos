
import './App.css';
import React, {useEffect, useRef, useState} from "react";
import {Search} from "./components/Search";
import {Main} from "./components/Main";

function App() {
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState([])
    const [img, setImg] = useState([])
    const [isGroup, setIsGroup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const refContainer = useRef(null)
    // refContainer.current.addEventListener('click', ()=> {
    //     setMessage(false)
    // })
    async function getFetch() {

        setIsLoading(true)
        let arr = []
        console.log(refContainer.current)
        if (query[0]==='delay') {

            console.log('delay')
            for (let i = 0; i < 5; i++) {
                    const response = await fetch('https://api.giphy.com/v1/gifs/random?api_key=W3af1n8HdTxy4KrXCvIHfPMjNeP9VFV6&tag=&rating=g')
                    const data = await response.json()
                    arr.push({
                        type: 'delay',
                        photo: data.data.image_url,
                        time: new Date()
                    })
                let stop = 0
               const int = setInterval(()=> {
                    console.log(stop)
                },5000)
                if (stop === 5) {
                    clearInterval(int)
                }
            }



            setIsLoading(false)
            return
        }

            for (let i = 0; i < query.length; i++) {
                const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=W3af1n8HdTxy4KrXCvIHfPMjNeP9VFV6&tag=${query[i]}`)
                const data = await response.json()
                if (data?.data?.length === 0) {
                    setMessage('По тегу ничего не найдено')
                    console.log(refContainer.current)
                    setIsLoading(false)
                    return
                }
                if(response.status !== 200) {
                    setMessage(`Произошла ${response.status} ошибка`)
                    setIsLoading(false)
                    return
                }
                arr.push({
                    type: query[i],
                    photo: data.data.image_url
                })
            }


            setImg([...img, ...arr])

        setMessage(true)
        setIsLoading(false)
    }
    useEffect(()=> {
        getFetch()
    }, [query])
  return (
    <div className="App" onClick={(e)=> {
        if(e.target !== refContainer.current && message) {
            setMessage(false)
        }
    }}>
        {
         message.length ? <div className="message" ref={refContainer} onClick={()=> console.log(refContainer.current)}>
                <p>{message}</p>
            </div> : null
        }

            <Search message={message} setMessage={setMessage} isLoading={isLoading} isGroup={isGroup} setIsGroup={setIsGroup} img={img} setImg={setImg} search={search} setSearch={setSearch} query={query} setQuery={setQuery} />
            <Main message={message} setMessage={setMessage} setSearch={setSearch} isGroup={isGroup} img={img} />
        </div>


  );
}

export default App;
