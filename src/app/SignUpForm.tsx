"use client"
import Image from "next/image";
import { useState, useRef, useReducer } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useMutation , useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import TripleBarActivity from '@/components/TripleBarActivity';

// ASSETS
// import googleIcon from "../../public/assets/google.svg";
// import facebookIcon from "../../public/assets/facebook.svg";
// import githubIcon from "../../public/assets/github.svg";
// import eyeIcon from "../../public/assets/eye.svg";
import eyeSlashIcon from "../../public/assets/eye-slash.svg";
// import mainLogoIcon from "../../public/assets/taskly-logo.png";
// import main2LogoIcon from "../../public/assets/taskly-logo-2.svg";

// API
import handleEmailSignUp from '@/api/handleEmailSignUp';

// REDUCERS
import signUpFormReducer from '@/reducers/signUpFormReducer';

// UTILS
import validate from '@/utils/validate';

export default function SignUpForm () {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname= usePathname();
  const queryClient = useQueryClient();;

  const [ activity, setActivity ] = useState<boolean>(false);

  const passRef = useRef<HTMLInputElement | null>(null);
  const cPassRef = useRef<HTMLInputElement | null>(null);

  const usernameErrorRef = useRef<HTMLLabelElement | null>(null);
  const emailErrorRef = useRef<HTMLLabelElement | null>(null);
  const passErrorRef = useRef<HTMLLabelElement | null>(null);
  const cPassErrorRef = useRef<HTMLLabelElement>(null);


  const [ formInputs, dispatch ] = useReducer(signUpFormReducer, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleEmailSignUpMutation = useMutation({
    mutationFn: handleEmailSignUp,
    onMutate: () => {
      setActivity(true);
    },
    onSettled: () => {
      setActivity(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    }
  })

  const addOrUpdateParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('login', '1');

    router.push(`${pathname}?${params.toString()}`);
  }

  const validateInputs = () => {
    const { username, email, password, confirmPassword } = formInputs;
    const { reg } = validate;

    if (reg.username(username) !== true) 
      return handleError('usernameInput', reg.username(username));
    if (reg.email(email) !== true) 
      return handleError('emailInput', reg.email(email));
    if (reg.password(password) !== true) 
      return handleError('passwordInput', reg.password(password));
    if (reg.confirmPassword(password, confirmPassword) !== true) 
      return handleError('cPasswordInput', reg.confirmPassword(password, confirmPassword));

    return true;
  }

  const removeErrMsg = () => {

    if (usernameErrorRef.current) usernameErrorRef.current.style.display = 'none';  
    if (emailErrorRef.current) emailErrorRef.current.style.display = 'none';  
    if (passErrorRef.current) passErrorRef.current.style.display = 'none';  
    if (cPassErrorRef.current) cPassErrorRef.current.style.display = 'none';  
  }

  const handleError = (type: string, message: string) => {
    switch (type) {
      case 'usernameInput':
        if (usernameErrorRef.current) usernameErrorRef.current.style.display = 'initial';  
        if (usernameErrorRef.current) usernameErrorRef.current.innerText = message;  
        break;
      case 'emailInput':
        if (emailErrorRef.current) emailErrorRef.current.style.display = 'initial';  
        if (emailErrorRef.current) emailErrorRef.current.innerText = message;  
        break;
      case 'passwordInput':
        if (passErrorRef.current) passErrorRef.current.style.display = 'initial';  
        if (passErrorRef.current) passErrorRef.current.innerText = message;  
        break;
      case 'cPasswordInput':
        if (cPassErrorRef.current) cPassErrorRef.current.style.display = 'initial';  
        if (cPassErrorRef.current) cPassErrorRef.current.innerText = message;  
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleClick = (e: any) => {
    const { type, name } = e.currentTarget.dataset;
    
    switch (type) {
      case 'signup_button_is_clicked':
        addOrUpdateParam();
        break;
      case 'eyeIcon_button_is_clicked':
        e.currentTarget.classList.toggle('toggle');
        const isELContainToggle = e.currentTarget.classList.contains('toggle');
        // if (isELContainToggle) e.currentTarget.src = `${eyeSlashIcon}`;
        if (isELContainToggle && passRef.current && cPassRef.current) {
          e.currentTarget.src = `/assets/eye.svg`;
          name === 'password' 
          ? passRef.current.type = 'text'
          : cPassRef.current.type = 'text';
        } else if (passRef.current && cPassRef.current) {
          e.currentTarget.src = `/assets/eye-slash.svg`;
          name === 'password' 
          ? passRef.current.type = 'password'
          : cPassRef.current.type = 'password';

        }
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    removeErrMsg();

    const isInputsCorrect = validateInputs();
    if (!isInputsCorrect) return;
    
    const { email, password, username } = formInputs;
    handleEmailSignUpMutation.mutate({ email, password, username });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
      case 'email':
      case 'password':
      case 'confirmPassword':
        const trimmedValue = (name === 'username' || name === 'email') ? value.trim() : value;

        dispatch({
          type:'update_input',
          name,
          value: trimmedValue
        })
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  // console.log('from inputs: ', formInputs);

  return (
    <form
      className="flex flex-col bg-[var(--background-color)] md:bg-[transparent] mt-[-2rem] md:mt-[0] gap-1 w-[100%] md:max-w-[600px] p-4 md:py-4 md:px-12 rounded-3xl"
      onSubmit={handleSubmit}
     >
      <h2
        className="font-bold text-2xl text-heading mx-auto"
      >
        Create account
      </h2>
      <div
        className="relative flex flex-col"
      >
        <label 
          htmlFor="username"
          className="text-body font-semibold"
        >
          Username
        </label>
        <input 
          className="p-2 bg-[hsla(0,0%,80%)] rounded-sm outline-primary outline-secondary focus:outline-primary transition-all duration-[0.15s] ease-in"
          name="username"
          id="username"
          // placeholder="Example@gmail.com" 
          onChange={handleChange}
        />
        <label
          className="absolute hidden top-[100%] left-2 text-sm text-red-500"
          htmlFor="email"
          ref={usernameErrorRef}
        /> 
      </div><br/>
      <div
        className="relative flex flex-col"
      >
        <label 
          className="text-body font-semibold"
          htmlFor="email"
        >
          Email
        </label>
        <input 
          className="p-2 bg-[hsla(0,0%,80%)] rounded-sm outline-primary outline-secondary focus:outline-primary transition-all duration-[0.15s] ease-in"
          name="email"
          id="email"
          type="text"
          // placeholder="Example@gmail.com"
          onChange={handleChange}
        />
        <label
          className="absolute hidden top-[100%] left-2 text-sm text-red-500"
          htmlFor="email"
          ref={emailErrorRef}
        /> 
      </div><br/>
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
              className="w-[100%] p-2 bg-[hsl(0,0%,80%)] rounded-sm outline-secondary focus:outline-primary transition-all duration-[0.15s] ease-in"
              name="password"
              id="password"
              type="password"
              // placeholder="Example@gmail.com" 
              onChange={handleChange}
              ref={passRef}
            />
            <Image
              className="absolute top-[50%] right-[0.5rem] bg-[hsl(0,0%,80%)] translate-x-[-50%] translate-y-[-50%]  hover:opacity-[0.8] cursor-pointer"
              src={eyeSlashIcon}
              alt="Eye Icon"
              data-type="eyeIcon_button_is_clicked"
              data-name="password"
              onClick={handleClick}
            />
            <label
              className="absolute hidden top-[100%] left-2 text-sm text-red-500"
              htmlFor="password"
              ref={passErrorRef}
            /> 
          </div>
        </div>
        <div
          className="flex flex-col flex-grow"
        >
          <label 
            htmlFor="confirmPassword"
            className="text-body font-semibold"
          >
            Confirm
          </label>
          <div
            className="relative flex flex-col flex-grow"
          >
            <input 
              className="p-2 bg-[hsla(0,0%,80%)] rounded-sm outline-primary outline-secondary focus:outline-primary transition-all duration-[0.15s] ease-in"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              // placeholder="Example@gmail.com" 
              onChange={handleChange}
              ref={cPassRef}
            />
            <Image
              className="absolute top-[50%] right-[0.5rem] bg-[hsl(0,0%,80%)] translate-x-[-50%] translate-y-[-50%] hover:opacity-[0.8] cursor-pointer"
              src={eyeSlashIcon}
              alt="Eye Icon"
              data-type="eyeIcon_button_is_clicked"
              data-name="confirmPassword"
              onClick={handleClick}
            />
            <label
              className="absolute hidden top-[100%] left-2 text-sm text-red-500"
              htmlFor="confirmPassword"
              ref={cPassErrorRef}
            /> 
          </div>
        </div>
      </div><br/>
      <button 
        className="relative flex gap-2 items-center bg-primary cursor-pointer mx-auto text-heading-invert hover:text-heading font-semibold px-8 py-2 rounded-lg transition-colors duration-150 ease-in hover:bg-secondary"
        type="submit"
      >
        {activity 
          ? <>
              <span className="opacity-0">Create Account</span>
              <TripleBarActivity />
            </>
          : <span>Create Account</span>
        }
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