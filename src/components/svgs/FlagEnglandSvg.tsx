type Props = {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
};

export default function FlagEnglandSvg({
  color = "currentColor",
  width = "1rem",
  height = "1rem",
  className = "",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 36 36"
      className={className}
    >
      <path
        fill="#eee"
        d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4"
      ></path>
      <path fill="#ce1124" d="M21 5h-6v10H0v6h15v10h6V21h15v-6H21z"></path>
    </svg>
  );
}
