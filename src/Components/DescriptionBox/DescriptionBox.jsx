import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>An e-commerce website is an online platform that facilitates the buying and selling products of services over the internet. It serves as a virtual marketplace where businesses ans individuals can showcase their products, interact with customers and conduct transoction without the ness for a physical presence. E-commerce website have goined immense popularity due to their convenience accesibility, and the global reach they offer.</p>
        <p>E-coomerce website typical display products or services along with detailed description, images, price and any available variation (e.g. size colors). Each product usually has its own dedicated page with relevant information</p>
      </div>
    </div>
  )
}

export default DescriptionBox
