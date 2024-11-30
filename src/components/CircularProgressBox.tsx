type Props = {
  title: string,
  description: string
}

export default function CircularProgressBox ({title="no title", description = "no description"}) {
  return (
    <div     
      className="flex flex-col items-center gap-4 w-[12rem]"     
    >
      <div
        className="relative"
      >
        <div
          className="circular-progress"
        />             
        <span
            className="
              absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] 
              text-xl text-body font-bold
            "
          >
            44 / 90
        </span>
      </div>
      <h3
        className="text-sm font-bold text-heading"
      >
        {title}
      </h3>
      <h4
        className="text-xs font-think italic text-body-light"
      >
        "{description}"
      </h4>
    </div>
  )
}