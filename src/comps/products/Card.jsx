import { Link } from "react-router";

export default function Card({product}) {
    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body gap-0">
                <figure className="aspect-3/2">
                    <img src={product.image} alt={product.title} className="rounded-xl" />
                </figure>
                <h2 className="card-title mt-2">{product.title}</h2>
                <p className="mt-1 mb-2 font-medium">$ {product.price_min} - {product.price_max}</p>
                <div className="card-actions">
                    <Link to={`/all-products/${product._id}`} className="btn btn-primary btn-outline w-full">View Details</Link>
                </div>
            </div>
        </div>
    );
}