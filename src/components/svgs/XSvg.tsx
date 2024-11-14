type Props = {
  color?: string,
  width?: string,
  height?: string,
  className?: string
}

export default function XSvg ({ color = "black", width = "1rem", height = "1rem", className = '' }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} className={`bi bi-x ${className}`} viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg>
  )
}