type Props = {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
};

export default function GrommetLanguageSvg({
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
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11Zm0 0c3 0 4-5 4-11S15 1 12 1S8 6 8 12s1 11 4 11ZM2 16h20M2 8h20"
      ></path>
    </svg>
  );
}
