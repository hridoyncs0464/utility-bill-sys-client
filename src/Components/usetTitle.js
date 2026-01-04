import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | PayBill`;
  }, [title]);
};

export default useTitle;
