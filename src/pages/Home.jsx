import { Suspense } from "react";
import Banner from "../comps/Banner";
import RecentProducts from "../comps/products/RecentProducts";
import Loading from "../comps/utils/Loading";
const promise = async() => {
    const response = await fetch('http://localhost:3000/recent-products');
    return response.json();
}
export default function Home(){
    return(
        <>
            <Banner />
            <Suspense fallback={<Loading />}>
                <RecentProducts data={promise()} />
            </Suspense>
        </>
    );
}