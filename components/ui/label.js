import { cx } from "@utils/all";

export default function Label(props) {
  const bg = {
    green: "bg-emerald-700",
    blue: "bg-blue-600",
    orange: "bg-orange-700",
    purple: "bg-purple-600",
    pink: "bg-pink-600"
  };
  return (
    <span
      className={cx(
        "inline-block mt-5 text-sm uppercase font-bold text-black dark:text-white rounded-sm bg-white dark:bg-black p-1"
      )}>
      #{props.children}
    </span>
  );
}
