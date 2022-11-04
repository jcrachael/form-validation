import style from './style.css';

// HTMLFormElement
const form = document.getElementById('form'); 
const submission = document.getElementById('submission');

// HTMLInputElements
const email = document.getElementById('email'); 
const country = document.getElementById('country');
const postcode = document.getElementById('postcode');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const formElements = [email, country, postcode, password, confirmPassword];

// HTMLButtonElement
const cancelBtn = document.getElementById('cancel');

// HTMLSpanElements
const emailError = document.getElementById('email-error');
const countryError = document.getElementById('country-error');
const postcodeError = document.getElementById('postcode-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const errors = [emailError, countryError, postcodeError, passwordError, confirmPasswordError]

// set form attributes
form.setAttribute('novalidate', '');
password.setAttribute('minlength', '8');
password.setAttribute('maxlength', '15');
confirmPassword.setAttribute('minlength', '8');
confirmPassword.setAttribute('maxlength', '15');
postcode.setAttribute('min', '1000');
postcode.setAttribute('max', '9999');

// resetAllErrors
const resetAllErrors = function() {
    for (let i = 0; i < errors.length; i++) {
        errors[i].textContent = '';
        errors[i].className = 'error';
    }
}

// showEmailError 
const showEmailError = function() {
    if (email.validity.valueMissing) {
        emailError.textContent = "Please enter your email address";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Entered value needs to be an email address";
    } else if (email.validity.tooShort) {
        emailError.textContent = `Email should be at least 8 characters; you entered ${email.value.length}`;
    }
    emailError.className = 'error active';
}

// showCountryError
const showCountryError = function() {
    if (country.validity.valueMissing) {
        countryError.textContent = "Please enter your country";
    } else if (country.validity.typeMismatch) {
        countryError.textContent = "Entered value should be a string";
    } 
    countryError.className = 'error active';
}

// showPostcodeError
const showPostcodeError = function() {
    if (postcode.validity.valueMissing) {
        postcodeError.textContent = "Please enter your postal or ZIP code";
    } else if (postcode.valueAsNumber < 1000 ) {
        postcodeError.textContent = "Postcode too short! Please enter 4 digits";
    } else if (postcode.valueAsNumber > 9999) {
        postcodeError.textContent = "Postcode too long! Please enter 4 digits";
    }
    postcodeError.className = 'error active';
}


// Passwords
// a password shall be between 8 to 15 characters which contain at least one lowercase 
// letter, one uppercase letter, one numeric digit, and one special character.
// Regex: ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$

const checkPassword = function() {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.value.match(regex)) {
        // return true
        passwordError.textContent = '';
        passwordError.className = 'error';
    } else  if (password.validity.valueMissing) {
        passwordError.textContent = 'Please enter a password';
        passwordError.className = 'error active';
    } else if (password.validity.tooShort) {
        passwordError.textContent = 'Please enter at least 8 characters';
        passwordError.className = 'error active';
    } else if (!password.value.match(regex)) {
        passwordError.textContent = 'Password must be 8-15 characters including lowercase, uppercase, number, special characters'
        passwordError.className = 'error active';
    }
}

const checkPasswordsMatch = function() {
    if (confirmPassword.value == password.value) {
        confirmPasswordError.textContent = '';
        confirmPasswordError.className = 'error';
    } else if (confirmPassword.value == password.value || confirmPassword.validity.tooShort) {
        confirmPasswordError.textContent = 'Passwords do not match'
        confirmPasswordError.className = 'error active';
   
    }
}


// set all form elements to required
for (let i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('required', '');
}

email.addEventListener('input', (event) => {
    if (email.validity.valid) {
        emailError.textContent = '';
        emailError.className = 'error';
    } else {
        showEmailError();
    }
});

country.addEventListener('input', (event) => {
    if (country.validity.valid) {
        countryError.textContent = '';
        countryError.className = 'error';
    } else {
        showCountryError();
    }
});

postcode.addEventListener('input', (event) => {
    if (postcode.validity.valid) {
        postcodeError.textContent = '';
        postcodeError.className = 'error';
    } else {
        showPostcodeError();
    }
});

password.addEventListener('input', (event) => {
    checkPassword();
})

confirmPassword.addEventListener('input', (event) => {
    checkPasswordsMatch();
})

form.addEventListener('submit', (event) => {
    if (!email.validity.valid) {
        showEmailError();
        event.preventDefault();
    }
    if (!country.validity.valid) {
        showCountryError();
        event.preventDefault();
    }
    if (!postcode.validity.valid) {
        showPostcodeError();
        event.preventDefault();
    }
    if (!password.validity.valid) {
        checkPassword();
        event.preventDefault();
    }
    if (!confirmPassword.validity.valid) {
        checkPasswordsMatch();
        event.preventDefault();
    }
    if (form.reportValidity()) {
        event.preventDefault();
        form.style.display = 'none';
        submission.classList.remove('invisible');
    }
});

cancelBtn.addEventListener('click', resetAllErrors);