"use client"
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ASSETS
import googleIcon from "../../public/assets/google.svg";
import facebookIcon from "../../public/assets/facebook.svg";
import githubIcon from "../../public/assets/github.svg";
import eyeIcon from "../../public/assets/eye.svg";
import eyeSlashIcon from "../../public/assets/eye-slash.svg";
import mainLogoIcon from "../../public/assets/taskly-logo.png";
import main2LogoIcon from "../../public/assets/taskly-logo-2.svg";

// api
import handleEmailSignIn from '@/api/handleEmailSignIn';


export default function SignInForm () {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();


  // const handleEmailSignInMutation = useMutation({
    // mutationFn: handleEmailSignIn
  // })

  const addOrUpdateParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('login', '0');

    router.push(`${pathname}?${params.toString()}`);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;
    switch (type) {
      case 'forgot_password_button_is_clicked':
        break;
      case 'login_button_is_clicked':
        addOrUpdateParam();
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('test: gi');
  }

  return (
    <form
      className="flex flex-col bg-white md:bg-[transparent] mt-[-2rem] md:mt-[0] gap-1 w-[100%] md:max-w-[600px] p-4 md:py-4 md:px-12 rounded-3xl"
      onSubmit={handleSubmit}
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
        type="submit"
        onSubmit={handleSubmit}
      >
        Continue
      </button><br/>
      <div
        className=""
        role="button"
        id="login"
        data-type="forgot_password_button_is_clicked"
        onClick={handleClick}
      >
        <span
          className="text-primary underline"
        >
          Forgot your password?
        </span>{' '}
        <span
          className="font-bold text-primary"
        >   
        </span>  
      </div>
      <div
        className=""
        role="button"
        id="login"
        data-type="login_button_is_clicked"
        onClick={handleClick}
      >
        <span
          className="text-primary underline"
        >
          First time here?
        </span>{' '}
        <span
          className="font-bold text-primary"
        >
          Create Account
        </span>  
      </div>
    </form>
  )
}