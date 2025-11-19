import { useLoaderData } from "react-router";
import Card from "../comps/products/Card";

export default function AllProducts(){
    const productsData = useLoaderData();
    // console.log(productsData)
    const products = productsData.data;
    return(
        <section>
            <h2 className="text-3xl text-center my-4">All Products</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4">
                {
                    products.map(product => <Card key={product._id} product={product} />)
                }
            </section>
        </section>
    );
}