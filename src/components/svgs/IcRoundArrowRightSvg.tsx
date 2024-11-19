type Props = {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
};

export default function IcRoundArrowRightSvg({
  color = "black",
  width = "1rem",
  height = "1rem",
  className = "",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="m11.71 15.29l2.59-2.59a.996.996 0 0 0 0-1.41L11.71 8.7c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71"
      ></path>
    </svg>
  );
}
