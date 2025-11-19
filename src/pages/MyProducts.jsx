// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Card from "../comps/products/Card";
import useAxios from "../hooks/useAxios";

export default function MyProducts() {
    const [myProducts, setMyProducts] = useState([]);
    console.log(myProducts)
    // const { currentUser } = useContext(AuthContext);

    // using custom hook -> useAuth
    const { currentUser } = useAuth();

    // using axios instance
    const axiosInstace = useAxios();
    useEffect(() => {
        axiosInstace.get(`/products?email=${currentUser.email}`)
          .then(data => setMyProducts(data.data));

        // fetch(`http://localhost:3000/products?email=${currentUser.email}`, {
        //     headers: {
        //         'authorization': `Bearer ${localStorage.getItem('token')}`
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => setMyProducts(data))
        //     .catch(error => console.log(error.message));
    }, []);
    return (
        <section>
            <h2 className="text-3xl text-center my-4">My Products : {myProducts.length}</h2>
            {
                myProducts.length > 0 ? <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4">
                    {
                        myProducts.map(product => <Card key={product._id} product={product} />)
                    }
                </section> : <p className="text-center text-red-500">You dont have any products yet</p>
            }
        </section>
    );
}