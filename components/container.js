import { cx } from "@utils/all";

export default function Container(props) {
  return (
    <div
      className={cx(
        "container py-5 lg:py-8 mx-auto",
        props.className
      )}>
      {props.children}
    </div>
  );
}
