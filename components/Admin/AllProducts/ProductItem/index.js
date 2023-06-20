import { format } from "date-fns";
import styled from "./styles.module.scss";

export default function ProductCard({ product }) {
  const sizes = product.subProducts.map((s) => s.sizes).flat();
  const stock = sizes.reduce((a, c) => a + c.qty, 0);

  const styles = product.subProducts.map((s) => s.color);

  console.log(styles);

  return (
    <div className={styled.product__item}>
      <tr>
        <td>{product.name}</td>
        <td>{product.category.name}</td>
        <td>
          {styles.map((style, index) => {
            if (style.image) {
              // eslint-disable-next-line @next/next/no-img-element
              return <img src={style.image} alt="" key={index} />;
            }

            return (
              <span
                key={index}
                style={{ backgroundColor: style.color }}
                className={styled.product__color}
              ></span>
            );
          })}
        </td>
        <td>{stock} items</td>
        <td>{format(new Date(product.createdAt), "MM/dd/yyyy")}</td>
      </tr>
    </div>
  );
}
