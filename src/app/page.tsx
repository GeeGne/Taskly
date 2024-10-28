import Image from "next/image";
import Link from 'next/link';
import gitHubIcon from "../../public/assets/github.svg";

export default function Home() {
  return (
    <div 
      className="flex flex-col max-w-[750px] my-auto mx-auto bg-primary items-center gap-8 rounded-lg p-8 mx-4 md:mx-auto"
    >
      <h1 
        className="text-2xl font-bold text-heading-invert"
      >
        Stay Organized, Stay Focused!
      </h1>
      <h2 
        className="text-lg font-semibold text-heading-invert"
      >
        Organize your tasks, track your progress, and achieve your goals with ease.
      </h2>
      <Link 
        className="flex gap-2 items-center bg-secondary cursor-pointer text-heading font-semibold p-2 rounded-lg transition-opacity duration-150 ease-in hover:opacity-70"
        href="/tasks"
      >
        <span>Sign in with GitHub</span>
        <Image
          src={gitHubIcon}
          alt="GitHub Logo"
        />
      </Link>
    </div>
  );
}
