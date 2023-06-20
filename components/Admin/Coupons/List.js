import ListItem from "./ListItem";
import styled from "./styles.module.scss";

export default function List({ coupons, setCoupons }) {
  return (
    <>
      <div className={styled.header}>Categories list</div>

      <table className={styled.list}>
        <thead>
          <th>Coupons</th>
          <th>Discount</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Editing</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {coupons?.map((coupon, index) => (
            <ListItem
              coupon={coupon}
              key={coupon._id}
              setCoupons={setCoupons}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
