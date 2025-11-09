import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MyProducts(){
    const [ myProducts, setMyProducts ] = useState([]);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        fetch(`http://localhost:3000/products?email=${currentUser.email}`)
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(error => console.log(error.message));
    }, []);
    return(
        <section>
            <h2 className="text-3xl text-center my-4">My Products : {myProducts.length}</h2>
            {
                myProducts.length > 0 ? <ul>
                    {
                        myProducts.map(product => <li key={product._id}>{product.title}</li>)
                    }
                </ul> : <p className="text-center text-red-500">You dont have any products yet</p>
            }
        </section>
    );
}