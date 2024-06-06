'use strict'
// Import app object.
import { app } from './appObject.js'
import { escapeHTML } from './utils.js'

// Account Generation
const primeAccount = {
  admin: true,
  ID: '10000000',
  accountEmail: 'daniel.lathrop77@outlook.com',
  verifiedEmail: true,
  accountPassword: 'PrimeAccount',
  firstAndMiddleName: 'Daniel A L',
  lastName: 'Lathrop',
  gender: 'male',
  photo: null,
  registerDate: '2023-09-17T07:39:29.444Z',
  accountLastActive: null,
  accountFollows: null,
  accountFriends: null,
  accountBlockedAccounts: null,
  accountMutedAccounts: null
}

// Prime Account is added to the account registry.
app.accounts.push(primeAccount)
app.accountNumberRegistry.add('10000000')
app.accountEmailRegistry.add('daniel.lathrop77@outlook.com')

// A second test account
const testAccount1 = {
  admin: true,
  ID: '10000001',
  accountEmail: 'testAccount1@outlook.com',
  verifiedEmail: true,
  accountPassword: 'testAccount1',
  firstAndMiddleName: 'Joe',
  lastName: 'Schmoe',
  gender: 'male',
  photo: null,
  registerDate: '2023-08-17T07:39:29.444Z',
  accountLastActive: null,
  accountFollows: null,
  accountFriends: null,
  accountBlockedAccounts: null,
  accountMutedAccounts: null
}

// testAccount1 is added to the account registry.
app.accounts.push(testAccount1)
app.accountNumberRegistry.add('10000001')
app.accountEmailRegistry.add('testAccount1@outlook.com')

// The Account class is defined.
class Account {
  constructor (accountEmail, accountPassword, firstAndMiddleName, lastName, gender, registerDate, admin, ID) {
    this.accountEmail = accountEmail
    this.accountPassword = accountPassword
    this.firstAndMiddleName = firstAndMiddleName
    this.lastName = lastName
    this.gender = gender
    this.registerDate = registerDate
    this.admin = admin
    this.accountID = ID
  }

  get fullName () {
    return `${this.firstAndMiddleName} ${this.lastName}`
  }
}

// The register account function handles retrieving data from the sign up form, validating it, and adding the new account ot the account registry.
function registerAccount () {
  // Generates a random numbmer for use as the account ID, every number starts with 1 and has a length of 8 digits.
  function generateRandomNumber () {
    let number = '1'
    while (number.length < 8) {
      const randomNumber = Math.floor(Math.random() * 10)
      number = number + randomNumber
    }
    return number
  }

  // Checks if the generated number is already present in the account number registry and generates a new numbmer until it isn't.  Then returns the unique number.
  function accountNumberGenerator () {
    let number
    do {
      number = generateRandomNumber()
    } while (app.accountNumberRegistry.has(number))
    return number
  }

  // Defines the newAccount variable that will be used to store account information until the new account is created with the class constructor and added to the account registry.
  const newAccount = {
    admin: null,
    accountID: accountNumberGenerator(),
    accountEmail: null,
    verifiedEmail: null,
    accountPassword: null,
    accountFirstAndMiddleName: null,
    accountLastName: null,
    accountGender: null,
    accountPhoto: null,
    accountRegisterDate: null,
    accountLastActive: null,
    accountFollows: null,
    accountFriends: null,
    accountBlockedAccounts: null,
    accountMutedAccounts: null
  }

  // Defines variables that will be used to access form inputs and change the values of the error fields on the webpage to show errors.
  const accountEmailInput = document.getElementById('email')
  const accountPasswordInput = document.getElementById('password')
  const confirmPasswordInput = document.getElementById('confirmPassword')
  const accountFirstAndMiddleNameInput = document.getElementById('firstAndMiddleName')
  const accountLastNameInput = document.getElementById('lastName')
  const accountMaleInput = document.getElementById('sexMale')
  const accountFemaleInput = document.getElementById('sexFemale')
  const accountOtherGenderInput = document.getElementById('sexOther')
  const termsCheckbox = document.getElementById('terms')
  const registerDate = new Date()
  const adminInput = document.getElementById('admin')
  const adminError = document.getElementById('admin-error')
  const emailError = document.getElementById('email-error')
  const formError = document.getElementById('form-error')
  const genderError = document.getElementById('gender-error')
  const passwordError = document.getElementById('password-error')
  const firstAndMiddleError = document.getElementById('firstAndMiddle-error')
  const lastNameError = document.getElementById('lastName-error')
  const termsError = document.getElementById('terms-error')

  // Admin key Validator
  function adminKeyValidator () {
    const adminEscaped = escapeHTML(adminInput.value)
    if (adminEscaped === '682354903A') {
      newAccount.admin = true
      adminError.textContent = ''
    } else if (adminEscaped === '') {
      newAccount.admin = false
      adminError.textContent = ''
    } else {
      newAccount.admin = null
      adminError.textContent = 'Please input the correct key or clear the field.'
    }
  };
  adminKeyValidator()

  // First and Middle Name Validator
  function firstAndMiddleNameValidator () {
    const firstEscaped = escapeHTML(accountFirstAndMiddleNameInput.value)
    if (firstEscaped.trim().length < 1 || /\d/.test(firstEscaped.trim())) {
      firstAndMiddleError.textContent = 'Please input your name or remove any numbers.'
    } else {
      firstAndMiddleError.textContent = ''
      newAccount.accountFirstAndMiddleName = firstEscaped
    }
  };
  firstAndMiddleNameValidator()

  // Last Name Validator
  function lastNameValidator () {
    const lastEscaped = escapeHTML(accountLastNameInput.value)
    if (lastEscaped.trim().length < 1 || /\d/.test(lastEscaped.trim())) {
      lastNameError.textContent = 'Please input your last name or remove any numbers.'
    } else {
      lastNameError.textContent = ''
      newAccount.accountLastName = lastEscaped
    }
  };
  lastNameValidator()

  // Email Validator
  function validateEmail () {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    const email = escapeHTML(accountEmailInput.value)

    if (emailRegex.test(email)) {
      if (app.accountEmailRegistry.has(email)) {
        emailError.textContent = 'An account with this email address already exists.'
      } else {
        newAccount.accountEmail = email
        emailError.textContent = ''
      }
      return true
    } else {
      emailError.textContent = 'Please enter a valid email address.'
      return false
    }
  }
  validateEmail()

  // Gender radio buttons Validator
  function genderValidator () {
    if (accountMaleInput.checked) {
      genderError.textContent = ''
      newAccount.accountGender = 'male'
    } else if (accountFemaleInput.checked) {
      genderError.textContent = ''
      newAccount.accountGender = 'female'
    } else if (accountOtherGenderInput.checked) {
      genderError.textContent = ''
      newAccount.accountGender = 'other'
    } else {
      genderError.textContent = 'Please choose one of the options.'
    }
  };
  genderValidator()

  // Password Input Validator
  function passwordVallidator () {
    const passwordEscaped = escapeHTML(accountPasswordInput.value)
    const confirmPassEscaped = escapeHTML(confirmPasswordInput.value)
    if (passwordEscaped === confirmPassEscaped && passwordEscaped !== '') {
      passwordError.textContent = ''
      newAccount.accountPassword = passwordEscaped
    } else if (passwordEscaped === '' || confirmPassEscaped === '') {
      passwordError.textContent = 'Your password or confirm password fields are empty.'
    } else {
      passwordError.textContent = 'There is a mistake in your password or confirm password fields.'
    }
  }
  passwordVallidator()

  function termsValidator () {
    if (termsCheckbox.checked) {
      termsError.textContent = ''
    } else {
      termsError.textContent = 'Please accept the terms or suspend registration.'
    }
  };
  termsValidator()

  // Converts the date variable to a string and adds it to the newAccount object.
  newAccount.accountRegisterDate = registerDate.toISOString()

  // Form Completeness Validator, new object creation, and user redirect
  if (newAccount.admin === null || newAccount.accountEmail === null ||
            newAccount.accountFirstAndMiddleName === null || newAccount.accountLastName === null ||
            newAccount.accountGender === null || newAccount.accountPassword === null || !termsCheckbox.checked) {
    formError.textContent = 'There is a mistake in your form or field(s) are blank.'
  } else {
    const newAccountObject = new Account(newAccount.accountEmail, newAccount.accountPassword, newAccount.accountFirstAndMiddleName,
      newAccount.accountLastName, newAccount.accountGender, newAccount.accountRegisterDate, newAccount.admin,
      newAccount.accountID)
    // const iterator = app.accountNumberRegistry.values();
    // const firstValue = iterator.next().value;
    app.accounts.push(newAccountObject)
    app.accountNumberRegistry.add(newAccount.accountID)
    app.accountEmailRegistry.add(newAccount.accountEmail)
    const retrievedAccount = app.accounts[app.accounts.length - 1]
    formError.textContent = ''
    console.log(newAccountObject)
    // console.log(firstValue);
    console.log(app.accountNumberRegistry.size)
    console.log(retrievedAccount)
    // window.location.href = 'myAccount.html';
  }
};

export { registerAccount as default, registerAccount }
