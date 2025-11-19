import { use, useState } from "react";
import Card from "./Card";

export default function RecentProducts({data}){
    const [products, setProducts] = useState(use(data));
    // const response = use(data);
    // console.log(response);
    return(
        <section>
            <h2 className="text-3xl text-center my-4">Recent Products</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4">
                {
                    products.map(product => <Card key={product._id} product={product} />)
                }
            </section>
        </section>
    );
}