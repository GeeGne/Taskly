"use client"
import Image from "next/image";
import { useReducer } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useQuery, useMutation , useQueryClient } from '@tanstack/react-query';

// ASSETS
import googleIcon from "../../public/assets/google.svg";
import facebookIcon from "../../public/assets/facebook.svg";
import githubIcon from "../../public/assets/github.svg";
import eyeIcon from "../../public/assets/eye.svg";
import eyeSlashIcon from "../../public/assets/eye-slash.svg";
import mainLogoIcon from "../../public/assets/taskly-logo.png";
import main2LogoIcon from "../../public/assets/taskly-logo-2.svg";

// API
import handleEmailSignUp from '@/api/handleEmailSignUp';

// REDUCERS
import signUpFormReducer from '@/reducers/signUpFormReducer';

export default function SignUpForm () {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname= usePathname();

  const [ formInputs, dispatch ] useReducer(signUpFormReducer, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleEmailSignUpMutation = useMutation({
    mutationFn: handleEmailSignUp
  })

  const addOrUpdateParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('login', '1');

    router.push(`${pathname}?${params.toString()}`);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;
    switch (type) {
      case 'signup_button_is_clicked':
        addOrUpdateParam();
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleEmailSignUpMutation.mutate(email, password)
  }

  return (
    <form
      className="flex flex-col bg-white md:bg-[transparent] mt-[-2rem] md:mt-[0] gap-1 w-[100%] md:max-w-[600px] p-4 md:py-4 md:px-12 rounded-3xl"
      onSubmit={handleSubmit}
     >
      <h2
        className="font-bold text-2xl text-heading mx-auto"
      >
        Create account
      </h2>
      <label 
        htmlFor="username"
        className="text-body font-semibold"
      >
        Username
      </label>
      <input 
        className="p-2 bg-[hsla(0,0%,80%)] rounded-sm"
        // placeholder="Example@gmail.com" 
        id="username"
      /><br/>
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
        className="flex flex-row flex-grow gap-8"
      >
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
        </div>
        <div
          className="relative flex flex-col flex-grow"
        >
          <label 
            htmlFor="confirm"
            className="text-body font-semibold"
          >
            Confirm
          </label>
          <div
            className="relative flex flex-col flex-grow"
          >
            <input 
              className="p-2 bg-[hsla(0,0%,80%)] rounded-sm"
              // placeholder="Example@gmail.com" 
              id="confirm"
              type="password"
            />
            <Image
              className="absolute content-[''] top-[50%] right-[0.5rem] bg-[hsl(0,0%,80%)] translate-x-[-50%] translate-y-[-50%]"
              src={eyeIcon}
              alt="Eye Icon"
            />
          </div>
        </div>
      </div><br/>
      <button 
        className="flex gap-2 items-center bg-primary cursor-pointer mx-auto text-heading-invert font-semibold px-8 py-2 rounded-lg transition-opacity duration-150 ease-in hover:opacity-70"
        type="submit"
      >
        Create account
      </button><br/>
      <div
        className=""
        id="login"
        role="button"
        data-type="signup_button_is_clicked"
        onClick={handleClick}
      >
        <span
          className="text-primary underline"
        >
          Already have an Account?
        </span>{' '}
        <span
          className="font-bold text-primary"
        >
          login
        </span>  
      </div>
    </form>

  )
}