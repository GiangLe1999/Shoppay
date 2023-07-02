import { useState } from "react";

const useSeeMore = (array) => {
  const [itemsQty, setItemsQty] = useState(5);
  const [hideBtn, setHideBtn] = useState(false);

  const showAllHandler = () => {
    if (!hideBtn) {
      setItemsQty(array.length - 1);
      setHideBtn(true);
    } else {
      setItemsQty(5);
      setHideBtn(false);
    }
  };

  return { itemsQty, showAllHandler, hideBtn };
};

export default useSeeMore;
