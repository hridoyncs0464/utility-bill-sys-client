import { useEffect } from "react"
import MyPayBills from "../Pages/MyPayBills";

const useTitle = (title) =>{
    useEffect(()=>{
        document.title = `${title}` | MyPayBills ;

    },[title]);
};

export default useTitle;