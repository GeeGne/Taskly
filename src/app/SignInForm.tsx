"use client"
import Image from "next/image";
import { useReducer, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import TripleBarActivity from '@/components/TripleBarActivity';

// ASSETS
// import googleIcon from "../../public/assets/google.svg";
// import facebookIcon from "../../public/assets/facebook.svg";
// import githubIcon from "../../public/assets/github.svg";
import eyeIcon from "../../public/assets/eye.svg";
import eyeSlashIcon from "../../public/assets/eye-slash.svg";
// import mainLogoIcon from "../../public/assets/taskly-logo.png";
// import main2LogoIcon from "../../public/assets/taskly-logo-2.svg";

// API
import handleEmailSignIn from '@/api/handleEmailSignIn';

// REDUCERS
import signInFormReducer from '@/reducers/signInFormReducer';

// UTILS
import validate from '@/utils/validate';

// STORES
import { useLanguageStore, useErrorAlertStore } from '@/store/index';

export default function SignInForm ({ currentLanguage }: { currentLanguage: string }) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const isEn = currentLanguage === 'en';

  const [ activity, setActivity ] = useState<boolean>(false);
  const { setErrorAlert, setErrorText } = useErrorAlertStore();

  const [ formInputs, dispatch ] = useReducer(signInFormReducer, {
    email: '',
    password: '',
  })
  // console.log('fromInputs: ', formInputs);

  const passRef = useRef<HTMLInputElement | null>(null);
  const emailErrorRef = useRef<HTMLLabelElement | null>(null);
  const passErrorRef = useRef<HTMLLabelElement | null>(null);

  const handleEmailSignInMutation = useMutation({
    mutationFn: handleEmailSignIn,
    onMutate: () => {
      setActivity(true);
    },
    onSettled: () => {
      setActivity(false);
    },
    onError: (error) => {
      setErrorAlert(Date.now());
      setErrorText('Auth error: ' + error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['buckets'] });
    }
  })

  const addOrUpdateParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('login', '0');

    router.push(`${pathname}?${params.toString()}`);
  }

  const validateInputs = () => {
    const { email, password } = formInputs;
    const { log } = validate;

    if (log.email(email) !== true) 
      return handleError('emailInput', log.email(email));
    if (log.password(password) !== true) 
      return handleError('passwordInput', log.password(password));

    return true;
  }

  const handleError = (type: string, message: string) => {
    switch (type) {
      case 'emailInput':
        if (emailErrorRef.current) emailErrorRef.current.style.display = 'initial';  
        if (emailErrorRef.current) emailErrorRef.current.innerText = message;  
        break;
      case 'passwordInput':
        if (passErrorRef.current) passErrorRef.current.style.display = 'initial';  
        if (passErrorRef.current) passErrorRef.current.innerText = message;  
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const removeErrMsg = () => {
    if (emailErrorRef.current) emailErrorRef.current.style.display = 'none';  
    if (passErrorRef.current) passErrorRef.current.style.display = 'none';  
  }

  const handleClick = (e: any) => {
    const { type, name } = e.currentTarget.dataset;
    
    switch (type) {
      case 'forgot_password_button_is_clicked':
        break;
      case 'login_button_is_clicked':
        addOrUpdateParam()
        break;
      case 'eyeIcon_button_is_clicked':
        e.currentTarget.classList.toggle('toggle');
        const isELContainToggle = e.currentTarget.classList.contains('toggle');
        console.log('hi')
        if (isELContainToggle && passRef.current) {
          e.currentTarget.src = `/assets/eye.svg`;
          passRef.current.type = 'text';
        } else if (passRef.current) {
          e.currentTarget.src = `/assets/eye-slash.svg`;
          passRef.current.type = 'password';
        }
        break;
      default:
        console.error('Unknown type: ', type);
    }
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    removeErrMsg();

    const isInputsCorrect = validateInputs();
    if (!isInputsCorrect) return;
    
    const { email, password } = formInputs;
    handleEmailSignInMutation.mutate({ email, password });
  }

  return (
    <form
      className="flex flex-col bg-[var(--background-color)] md:bg-[transparent] mt-[-2rem] md:mt-[0] gap-1 w-[100%] md:max-w-[600px] p-4 md:py-4 md:px-12 rounded-3xl"
      onSubmit={handleSubmit}
    >
      <h2
        className="font-bold text-2xl text-heading mx-auto"
      >
        {isEn ? 'Login' : 'تسجيل الدخول'}
      </h2>
      <div
        className="relative flex flex-col"
      >
        <label 
          className="text-body font-semibold"
          htmlFor="email"
        >
          {isEn ? 'Email' : 'ايميل'}
        </label>
        <input 
          className="p-2 bg-[hsla(0,0%,80%)] rounded-sm outline-primary outline-secondary focus:outline-primary transition-all duration-[0.15s] ease-in"
          // placeholder="Example@gmail.com"
          name="email"
          id="email"
          type="text"
          onChange={handleChange}
        />
        <label
          className="absolute hidden top-[100%] left-2 text-sm text-red-500"
          htmlFor="email"
          ref={emailErrorRef}
        /> 
      </div><br/>
      <div
        className="flex flex-col flex-grow"
      >
        <label 
          htmlFor="password"
          className="text-body font-semibold"
        >
          {isEn ? 'Password' : 'كلمه المرور'}
        </label>
        <div
          className="relative"
        >
          <input 
            className="w-[100%] p-2 bg-[hsl(0,0%,80%)] rounded-sm outline-secondary focus:outline-primary transition-all duration-[0.15s] ease-in"
            // placeholder="Example@gmail.com" 
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
            ref={passRef}
          />
          <Image
            className={`
              absolute content-[''] top-[50%] bg-[hsl(0,0%,80%)] translate-x-[-50%] translate-y-[-50%]
              ${isEn ? 'right-[0rem]' : 'left-[1rem]'}
            `}
            src={eyeIcon}
            alt="Eye Icon"
            data-type="eyeIcon_button_is_clicked"
            onClick={handleClick}
          />
          <label
            className="absolute hidden top-[100%] left-2 text-sm text-red-500"
            htmlFor="password"
            ref={passErrorRef}
          /> 

        </div>
      </div><br/>
      <button 
        className="relative flex gap-2 items-center bg-primary cursor-pointer mx-auto text-heading-invert hover:text-heading font-semibold px-8 py-2 rounded-lg transition-colors duration-150 ease-in hover:bg-secondary"
        type="submit"
      >
        {activity 
          ? <>
              <span className="opacity-0">{isEn ? 'Continue' : ''}</span>
              <TripleBarActivity />
            </>
          : <span>{isEn? 'Continue' : 'متابعه'}</span>
        }
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
          {isEn ? 'Forgot your password?' : 'نسيت كلمه المرور؟'}
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
          {isEn ? 'First time here?' : 'اول مره هنا؟'}
        </span>{' '}
        <span
          className="font-bold text-primary"
        >
          {isEn ? 'Create Account' : 'انشئ حساب'}
        </span>  
      </div>
    </form>
  )
}