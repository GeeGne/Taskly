type Props = {
  color?: string,
  width?: string,
  height?: string,
  className?: string
}

export default function CheckLgSvg ({color = "black", width = "1rem", height = "1rem", className = ''}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} className={`bi bi-check-lg ${className}`} viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
    </svg>
  )
}