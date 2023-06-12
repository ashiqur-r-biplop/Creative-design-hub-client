import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `CreativeDesignHub | ${title}`;
  }, [title]);
};

export default useTitle;