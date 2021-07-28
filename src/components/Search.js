import React from 'react'

export function Search({isGroup, isLoading, setIsGroup, search, setImg, setSearch, query, setQuery, setMessage}) {
    function englishHandler(e) {
        let value = e.target.value

        value = value.replace(/[^A-Za-z ,]/ig, '').trim()

            setSearch(value)


    }
    function loadHandler() {
        if (!search) {
            setMessage("заполните поле 'тег'")
            return
        }
        setMessage(false)
        setQuery(search.split(','))
        console.log(query)
    }
    function clearHandler() {
        setImg('')
        setSearch('')
    }


    return (
        <div className="search-main">
            <input pattern = "[A-Za-z]" type="text" placeholder='Введите тэг' value={search} onChange={englishHandler}/>
            {
                isLoading ? <div className="load-btn-off btn" >
                        <p>Загрузка...</p>
                    </div> :
                    <div className="load-btn btn" onClick={loadHandler}>
                        <p>Загрузить</p>
                    </div>
            }

            <div className="clear-btn btn" onClick={clearHandler}>
                <p>Очистить</p>
            </div>
            <div className="group-btn btn" onClick={()=> setIsGroup(!isGroup)}>
                {
                    isGroup ? <p>Разгруппировать</p> : <p>Группировать</p>
                }

            </div>
        </div>
    )
}