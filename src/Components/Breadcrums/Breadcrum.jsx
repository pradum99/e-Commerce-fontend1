import React from 'react';
import './Breadcrum.css';

const Breadcrum = (props) => {
    const { product } = props;
    return (
        <div className='breadcrum'>
            HOME &gt; SHOP &gt; {product.category} &gt; {product.name}
        </div>
    );
}

export default Breadcrum;
