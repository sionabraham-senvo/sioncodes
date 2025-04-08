import cn from "classnames";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn("border-b border-solid", {
        "bg-neutral-800 text-white": preview,
        "bg-neutral-50": !preview,
      })}
      style={{ borderColor: 'var(--border-color)' }}
    >
    </div>
  );
};

export default Alert;