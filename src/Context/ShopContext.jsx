import React, { createContext, useEffect, useState } from "react";
import { baseUrl } from "../../Urls";


export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItem, setCartItem] = useState(getDefaultCart());

    useEffect(() => {
        fetch(`${baseUrl}/allproducts`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => setAll_Product(data))
        .catch((error) => console.error('Error fetching data:', error));

        if(localStorage.getItem('auth-token')){
            fetch(`${baseUrl}/getcart`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItem(data))
        }
    }, []);

    const addTocart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        const authToken = localStorage.getItem('auth-token');
        if (authToken) {
            fetch(`${baseUrl}/addtocart`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': authToken,
                },
                body: JSON.stringify({ itemId: itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error adding to cart:', error));
        }
    };
    
    
    // Client-Side Function to Remove Item from Cart
const removeFromcart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    
    // Retrieve auth-token from localStorage
    const authToken = localStorage.getItem('auth-token');
    
    if (authToken) {
        fetch(`${baseUrl}/removefromcart`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': authToken, // Pass auth-token in the request header
            },
            body: JSON.stringify({ itemId: itemId }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error('Error removing item from cart:', error));
    } else {
        console.error('Auth token not found');
    }
}

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItem[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItem)
        {
            if(cartItem[item] > 0)
            {
                totalItem += cartItem[item]
            }
        }
        return totalItem;
    }
    

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItem, addTocart, removeFromcart };
    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider