type Props = {
  color?: string,
  width?: string,
  height?: string,
  className?: string
}

export default function ArrowUpSvg ({ color = "black", width = "1rem", height = "1rem", className = '' }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} className={`bi bi-arrow-up ${className}`} viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
    </svg>
  )
}