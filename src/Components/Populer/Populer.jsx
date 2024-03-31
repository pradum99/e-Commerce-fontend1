import React, { useEffect, useState } from 'react'
import './Populer.css'
import Item from '../Item/Item'
import { baseUrl } from '../../../Urls'

const Populer = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    
    useEffect(()=>{
        fetch(`${baseUrl}/popularinwomen`)
        .then((response)=>response.json())
        .then((data)=>setPopularProducts(data));
    },[])
    return (
        <div className='populer'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="populer-items">
                {popularProducts.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>
        </div>
    )
}

export default Populer
