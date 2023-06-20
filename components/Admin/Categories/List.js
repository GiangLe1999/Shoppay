import ListItem from "./ListItem";
import styled from "./styles.module.scss";

export default function List({ categories, setCategories }) {
  return (
    <>
      <div className={styled.header}>Categories list</div>

      <table className={styled.list}>
        <thead>
          <th>CATEGORY NAME</th>
          <th>Editing</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <ListItem
              category={category}
              key={category._id}
              setCategories={setCategories}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
