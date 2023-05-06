import { cx } from "@utils/all";

export default function Container(props) {
  return (
    <div
      className={cx(
        "container py-5 lg:py-8 mx-auto px-5",
        props.className
      )}>
      {props.children}
    </div>
  );
}
