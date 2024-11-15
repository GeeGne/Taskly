"use client"

export default function TripleBarActivity ({ className = '', color = 'var(--background-light-color)' }: { className?: string; color?: string; }) {
  return (
    <div
      className={`${className} absolute flex flex-row gap-1 justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] h-[100%] z-10`}
    >
      <div
        className={`--tripleBars-ani w-2 h-4 bg-[${color}] rounded-sm`}
      />
      <div
        className={`--tripleBars-ani delay--015s w-2 h-4 bg-[${color}] rounded-sm`}
      />
      <div
        className={`--tripleBars-ani delay--03s w-2 h-4 bg-[${color}] rounded-sm`}
      />
    </div>
  )
}