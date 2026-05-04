// Toggle visibilidade da senha
const icons = document.querySelectorAll('i');

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        const inputPassword = icon.parentElement.querySelector('.input-password')

        if (inputPassword.type === 'password') {
            inputPassword.type = 'text'
            icon.classList.remove('fa-eye-slash')
            icon.classList.add('fa-eye')
        } else {
            inputPassword.type = 'password'
            icon.classList.remove('fa-eye')
            icon.classList.add('fa-eye-slash')
        }
    })
});

function setError(input, span) {
    input.classList.remove('input-success', 'input-error')
    void input.offsetWidth
    input.classList.add('input-error')

     if (span) {
        span.classList.remove('error-message')
        void span.offsetWidth
        span.classList.add('error-message')
    }
}

function setSuccess(input) {
    input.classList.remove('input-error')
    input.classList.add('input-success') 
}

// Registro
const btnRegister = document.querySelector('#btn-register');

btnRegister.addEventListener('click', (event) => {
    event.preventDefault()

    // Validação nome
    const name = document.querySelector('#name')
    const nameError = document.querySelector('#name-error')

    const hasNumber = /[0-9]/.test(name.value)
    const hasSymbol = /[^a-zA-ZÀ-ÿ\s]/.test(name.value)
    const invalidName = hasNumber || hasSymbol

    if (name.value.trim() === "") {
        nameError.textContent = "Por favor, digite um nome."
        setError(name, nameError)
    } else if (invalidName) {
        nameError.textContent = "O nome não pode ter números ou símbolos."
        setError(name, nameError)
    } else {
        nameError.textContent = ""
        setSuccess(name)
    }

    // Validação e-mail
    const email = document.querySelector('#email')
    const emailError = document.querySelector('#email-error')

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)

    if (email.value.trim() === "") {
        emailError.textContent = "Por favor, digite um e-mail."
        setError(email, emailError)
    } else if (!validEmail) {
        emailError.textContent = "O email precisa ter um formato válido (exemplo: joao123@gmail.com)"
        setError(email, emailError)
    } else {
        emailError.textContent = ""
        setSuccess(email)
    }


    // Validação senha
    function validatePassword(password) {
        const tooShort = password.length < 8
        const hasSpace = /\s/.test(password)
        const hasUppercase = /[A-Z]/.test(password)
        const hasSymbol = /[^a-zA-Z0-9]/.test(password)

        return !tooShort && !hasSpace && hasUppercase && hasSymbol
    }

    const password1 = document.querySelectorAll('.input-password')[0]
    const password2 = document.querySelectorAll('.input-password')[1]
    const passwordError = document.querySelector('#password-error')

    const passwordsMatch = password1.value === password2.value
    const emptyPasswords = password1.value.trim() == "" || password2.value.trim() == ""
    const validPassword = validatePassword(password1.value)

    if (emptyPasswords) {
        passwordError.textContent = "Por favor, digite uma senha."
        setError(password1)
        setError(password2, passwordError)
    } else if (!passwordsMatch) {
        passwordError.textContent = "As senhas não coincidem. Tente novamente."
        setError(password1)
        setError(password2, passwordError)
    } else if (!validPassword) {
        passwordError.textContent = "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um símbolo especial e sem espaços."
        setError(password1)
        setError(password2, passwordError)
    } else {
        passwordError.textContent = ""
        setSuccess(password1)
        setSuccess(password2)
    }

    if (!invalidName && validEmail && validPassword && passwordsMatch) {
        window.location.href = "/success"
    }
})