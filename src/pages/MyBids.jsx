import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MyBids(){
    const [ myBids, setMyBids ] = useState([]);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        fetch(`http://localhost:3000/bids?email=${currentUser.email}`, {
            headers: {
                'Authorization' : `Bearer ${currentUser.accessToken}`
            }
        })
          .then(res => res.json())
          .then(data => setMyBids(data))
          .catch(error => console.log(error.message));
    }, []);
    console.log(myBids);
    return(
        <section>
            <h2 className="text-3xl text-center my-4">My Bids : {myBids.length || 0}</h2>
            {
                myBids.length > 0 ? <ul>
                    {
                        myBids.map(product => <li key={product._id}>Product ID : {product.product} and price : {product.price}</li>)
                    }
                </ul> : <p className="text-center text-red-500">You dont have any products yet</p>
            }
        </section>
    );
}