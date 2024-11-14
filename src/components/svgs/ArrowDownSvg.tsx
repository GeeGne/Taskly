type Props = {
  color?: string,
  width?: string,
  height?: string,
  className?: string
}

export default function ArrowUpSvg ({ color = "black", width = "1rem", height = "1rem", className = '' }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} className={`bi bi-arrow-down ${className}`} viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
    </svg>
  )
}