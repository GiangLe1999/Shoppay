/* eslint-disable @next/next/no-img-element */
import { sidebarData } from "@/data/profile";
import styled from "./styles.module.scss";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ data }) {
  return (
    <div className={styled.sidebar}>
      <div className={styled.sidebar__container}>
        <img src={data.image} alt="" />
        <span className={styled.sidebar__name}>{data.name}</span>
        <ul>
          {sidebarData.map((item, i) => (
            <SidebarItem
              key={i}
              item={item}
              //Tab định bằng 0 => Tab được open là tab đầu tiên
              visible={data.tab == i.toString()}
              index={i.toString()}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
