const removeByIndex = (str, index) => {
  return str.slice(0, index) + str.slice(index + 1);
};

export const replaceQuery = (existedQuery, check, value, queryHandler) => {
  if (existedQuery) {
    if (check) {
      const _index = existedQuery.indexOf(value) - 1;
      //Khi đứng tại brand=Hugo_Prada, click vào Prada => brand=Hugo
      if (existedQuery[_index] === "_") {
        //Remove dấu _ trước Prada
        const newString = removeByIndex(existedQuery, _index);
        //Remove Prada
        queryHandler(newString.replace(value, ""));
      } else {
        const _index = existedQuery.indexOf("_");
        //Khi đứng tại brand=Hugo, click vào Hugo => brand=
        if (_index == -1) {
          queryHandler({});
        } else {
          //Khi đứng tại brand=Hugo_Prada_Zara, click vào Hugo => brand=Prada_Zara
          //Khi đứng tại brand=Prada_Zara, click vào Prada => brand=Zara
          queryHandler(existedQuery.replace(`${value}_`, ""));
        }
      }
      //Khi đứng tại brand=Hugo, click vào Prada => brand=Hugo_Prada
    } else {
      queryHandler(`${existedQuery}_${value}`);
    }
    //Khi đứng tại /browse, click vào Hugo => /browse?brand=Hugo
  } else {
    queryHandler(value);
  }
};
