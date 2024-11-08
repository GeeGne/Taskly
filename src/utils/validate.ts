interface Validate {
  reg: any;
  log: any;
  placeOrder: any;
}

const validate: Validate = {
  reg: {
    username (name: string) {
      const re= /^[a-zA-Z\u0600-\u06FF\s]+$/;

      switch (false) {
        case name !== '':
          return 'can\'t be blank';
        // case !name.includes(' '):
          // return 'must not contain Spaces';
        case re.test(name):
          return 'must not contain Special Characters \'$%@..\' or Numbers';
        case name.length > 2:
          return 'must be at least 3 characters';
        case name.length < 12:
          return 'must not exceed 12 characters';
        default:
          return true
      }
    },
    email (email: string) {
      const re= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      switch (false) {
        case email !== '':
          return 'can\'t be blank';
        case !email.includes(' '):
          return 'must not contain Spaces';
        case re.test(email):
            return 'wrong email ex: example@email.com';
        default:
          return true
      }
    },
    password (password: string) {
      // const re= /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      // const re1= /^[a-zA-Z]+$/;
      // const re2= /^[0-9]+$/;

      switch (false) {
        case password !== '':
          return 'can\'t be blank';
        case !password.includes(' '):
          return 'must not contain Spaces';
        case password.length > 7:
          return 'must be at least 8 characters';
        // case (re.test(password)):
        //   if (!re1.test(password)) {
        //     return en ? 'must contain at least one alphabet': 'يجب أن يحتوي على حرف واحد على الأقل';
        //   } 
        //   if (!re2.test(password)) {
        //     return en ? 'must contain at least one number' : 'يجب أن يحتوي على رقم واحد على الأقل';
        //   };
        default:
          return true;
      }
    },
    confirmPassword (password: string, confirmedPassword: string) {
      switch (false) {
        case password !== '':
          return 'can\'t be blank';
        case password === confirmedPassword:
          return 'unmatched password';
        default:
          return true;
      }
    },
  },
  log: {
    email (email: string) {
      const re= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      switch (false) {
        case email !== '':
          return 'can\'t be blank';
        case !email.includes(' '):
          return 'must not contain Spaces';
        case re.test(email):
            return 'wrong email ex: example@email.com';
        default:
          return true;
      }
    },
    password (password: string) {
      switch (false) {
        case password !== '':
          return 'can\'t be blank';
        case !password.includes(' '):
          return 'must not contain Spaces';
        default:
          return true;
      }
    }
  },
  placeOrder: {
    phone (phone: string) {
      // const re= /^[0-9+]+$/;
      // const re1= /^\+963/;
      const re2= /^\+?\d{1,4}(\s\d{3}){2}\s\d{3}$/;;

      switch (false) {
        case phone !== '':
          return 'can\'t be blank';
        case re2.test(phone):
          return 'wrong phone number ex: +963 936 534 080';
        case phone.length === 16:
          return 'wrong phone number ex: +963 936 534 080';
        default:
          return true;
      }
    }, 
    addressDetails (addressDetails: string) {
      switch (false) {
        case addressDetails !== '':
          return 'can\'t be blank';
        default:
          return true;
      }
    }
  }
}

export default validate;