type Props = {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
};

export default function PriorityHighRoundedSvg({
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
        d="M12 21q-.825 0-1.412-.587T10 19t.588-1.412T12 17t1.413.588T14 19t-.587 1.413T12 21m0-6q-.825 0-1.412-.587T10 13V5q0-.825.588-1.412T12 3t1.413.588T14 5v8q0 .825-.587 1.413T12 15"
      ></path>
    </svg>
  );
}
