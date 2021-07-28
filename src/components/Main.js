import Reeact from 'react'

export function Main({img,message, isGroup, setSearch}) {

    if (isGroup && img) {
       const group =  [... new Set(img.map(e=>e.type))]
        console.log(group)
        return (
            group.map(e=> (
                <div className={e + ' grouped'}>
                    <p>{e}</p>
                    <div className="photo-group">
                        {
                            img.map(el=> el.type === e ? (
                                <div className='border' onClick={()=> setSearch(e)}>
                                    <img src={el.photo}  alt=""/>
                                </div>

                            ): null)
                        }
                    </div>

                </div>
            ))
        )
    }
    return (
        <div className="main-block">
            {
               img && img.map(e=> (
                   <div className="photo-cart">
                       <img onClick={()=> setSearch(e.type)} src={e.photo} alt=""/>
                   </div>

               ))
            }
        </div>
    )
}