import React, { useEffect } from "react";
import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext=createContext()

const ShopContextProvider=(props)=>{

    const currency='₹'
    const deliveryFee=10;
    const backendUrl = "http://localhost:4000"
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products,setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate=useNavigate();


    const addToCart=async (itemId,size) => {

        if(!size){
            toast.error('Select product size')
            return 
        }
        let cartData=structuredClone(cartItems)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }

        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount=()=>{
        let totalCount=0;
        for (const items in cartItems) {
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }

        return totalCount
    }
    
    const updateQuantity=async (itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems)
        cartData[itemId][size]=quantity;
        setCartItems(cartData)

        if(token){
            try{
                await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    
    const getProductsData = async ()=>{
        try {
            const res = await axios.get(backendUrl + '/api/product/list')
            if(res.data.success){
                setProducts(res.data.products)
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const getCartAmount= ()=>{
        if(products.length === 0){
            return
        }
        let totalAmount=0;
        
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id === items)
            
            if(!itemInfo){
                console.log(`Product with id ${items} not found in product list`)
                continue;
            }
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price * cartItems[items][item]
                    }
                    
                } catch (error) {
                    console.log(error.message)
                }
            }
        }

        return totalAmount;
    }
    const getUserCart = async (token)=>{
        try {
            const res =await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if(res.data.success){
                setCartItems(res.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    
    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])
    
    useEffect(() => {
      getProductsData()
    }, [])
    const value={
        products,currency,deliveryFee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,
        backendUrl,token,setToken,setCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider