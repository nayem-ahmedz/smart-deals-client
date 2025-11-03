import { Suspense } from "react";
import Loading from "./Loading";

export default function SuspenseWrapper({children}){
    return(
        <Suspense fallback={<Loading />}>
            { children }
        </Suspense>
    );
}