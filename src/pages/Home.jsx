import { Suspense } from "react";
import Banner from "../comps/Banner";
import RecentProducts from "../comps/products/RecentProducts";
import Loading from "../comps/utils/Loading";
import axios from "axios";
const promise = async() => {
    const response = await axios.get('https://smart-deeals-server.vercel.app/recent-products');
    // return response.json();
    return response.data;
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