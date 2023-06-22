import ListItem from "./ListItem";
import styled from "./styles.module.scss";

export default function SubList({
  categories,
  subCategories,
  setSubCategories,
}) {
  return (
    <>
      <div className={styled.header}>Sub-Categories list</div>

      <table className={styled.list}>
        <thead>
          <th>subcategory</th>
          <th>parent category</th>
          <th>editing</th>
          <th>actions</th>
        </thead>
        <tbody>
          {subCategories.map((subCategory, index) => (
            <ListItem
              categories={categories}
              subCategory={subCategory}
              key={subCategory._id}
              setSubCategories={setSubCategories}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
