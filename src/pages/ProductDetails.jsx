import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetails() {
    const product = useLoaderData();
    const { currentUser } = useContext(AuthContext);
    const modalRef = useRef(null);
    const [existingBids, setExistingBids] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const price = Number(e.target.bidPrice.value);
        const newBid = {
            product: product._id,
            email: currentUser.email,
            name: currentUser.displayName,
            price: price
        }
        console.log(newBid);
        fetch('http://localhost:3000/bids', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    useEffect(() => {
        fetch(`http://localhost:3000/bids/products/${product._id}`, {
            headers: {
                'authorization': `Bearer ${currentUser.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setExistingBids(data));
    }, []);
    return (
        <section>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row gap-10">
                    <img src={product.image} className="max-w-lg rounded-lg shadow-2xl" />
                    <div>
                        <Link to='/all-products'>Back to Product</Link>
                        <h1 className="text-5xl font-bold">{product.title}</h1>
                        <p className="mt-1 mb-2 font-medium">$ {product.price_min} - {product.price_max}</p>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button onClick={() => modalRef.current.showModal()} className="btn btn-primary w-full">I want to buy this product</button>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-2xl font-medium">Bids for this product : {existingBids.length}</h2>
                <ol className="*:my-3 list-decimal list-inside">
                    {
                        existingBids.map(bid => <li key={bid._id}>
                            {bid.name} offered ${bid.price}
                        </li>)
                    }
                </ol>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Give Seller Your Offered Price</h3>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" className="input" placeholder="Name" defaultValue={currentUser.displayName} readOnly />
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" defaultValue={currentUser.email} readOnly />
                            <label className="label">Bid Your Price</label>
                            <input type="number" className="input" placeholder="Amount" name='bidPrice' required />
                            <button className="btn btn-neutral mt-4">Submit Bid</button>
                        </fieldset>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </section>
    );
}