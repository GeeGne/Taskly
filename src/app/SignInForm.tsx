"use client"
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';

// ASSETS
import googleIcon from "../../public/assets/google.svg";
import facebookIcon from "../../public/assets/facebook.svg";
import githubIcon from "../../public/assets/github.svg";
import eyeIcon from "../../public/assets/eye.svg";
import eyeSlashIcon from "../../public/assets/eye-slash.svg";
import mainLogoIcon from "../../public/assets/taskly-logo.png";
import main2LogoIcon from "../../public/assets/taskly-logo-2.svg";


export default function SignInForm () {

  const router = useRouter();
  const searchParams = useSearchParams();

  const addOrUpdateParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('signup', '1');
    params.set('login', '0');
  }


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;
    switch (type) {
      case 'signIn_github_button_is_clicked':
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <form
      className="flex flex-col bg-white md:bg-[transparent] mt-[-2rem] md:mt-[0] gap-1 w-[100%] md:max-w-[600px] p-4 md:py-4 md:px-12 rounded-3xl"
     >
      <h2
        className="font-bold text-2xl text-heading mx-auto"
      >
        Sign Up
      </h2>
      <label 
        className="text-body font-semibold"
        htmlFor="email"
      >
        Email
      </label>
      <input 
        className="p-2 bg-[hsla(0,0%,80%)] rounded-sm"
        // placeholder="Example@gmail.com"
        id="email"
      /><br/>
      <div
        className="flex flex-col flex-grow"
      >
        <label 
          htmlFor="password"
          className="text-body font-semibold"
        >
          Password
        </label>
        <div
          className="relative"
        >
          <input 
            className="w-[100%] p-2 bg-[hsl(0,0%,80%)] rounded-sm"
            // placeholder="Example@gmail.com" 
            id="password"
            type="password"
          />
          <Image
            className="absolute content-[''] top-[50%] right-[0.5rem] bg-[hsl(0,0%,80%)] translate-x-[-50%] translate-y-[-50%]"
            src={eyeIcon}
            alt="Eye Icon"
          />
        </div>
      </div><br/>
      <button 
        className="flex gap-2 items-center bg-primary cursor-pointer mx-auto text-heading-invert font-semibold px-8 py-2 rounded-lg transition-opacity duration-150 ease-in hover:opacity-70"
        data-type="create_account_button_is_clicked"
        onClick={handleClick}
      >
        Continue
      </button><br/>
      <a
        className=""
        id="login"
        href="google.com"
        target="_blank"
      >
        <button
          className="text-primary underline"
        >
          Forgot your password?
        </button>{' '}
        <button
          className="text-primary underline"
        >
          Forgot your password?
        </button>{' '}
        <span
          className="font-bold text-primary"
        >
          
        </span>  
      </a>
    </form>

  )
}