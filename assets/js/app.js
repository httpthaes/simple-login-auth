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

// Registro
const btnRegister = document.querySelector('#btn-register');

btnRegister.addEventListener('click', (event) => {
    event.preventDefault()

    // Validação nome
    const name = document.querySelector('#name').value
    const nameError = document.querySelector('#name-error')

    const hasNumber = /[0-9]/.test(name)
    const hasSymbol = /[^a-zA-ZÀ-ÿ\s]/.test(name)
    const invalidName = hasNumber || hasSymbol

    if (name.trim() === "") {
        nameError.textContent = "Por favor, digite um nome."
    } else if (invalidName) {
        nameError.textContent = "O nome não pode ter números ou símbolos."
    } else {
        nameError.textContent = ""
    }

    // Validação e-mail
    const email = document.querySelector('#email').value
    const emailError = document.querySelector('#email-error')

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (email.trim() === "") {
        emailError.textContent = "Por favor, digite um e-mail."
    } else if (!validEmail) {
        emailError.textContent = "O email precisa ter um formato válido (exemplo: joao123@gmail.com)"
    } else {
        emailError.textContent = ""
    }


    // Validação senha
    function validatePassword(password) {
        const tooShort = password.length < 8
        const hasSpace = /\s/.test(password)
        const hasUppercase = /[A-Z]/.test(password)
        const hasSymbol = /[^a-zA-Z0-9]/.test(password)

        return !tooShort && !hasSpace && hasUppercase && hasSymbol
    }

    const password1 = document.querySelectorAll('.input-password')[0].value
    const password2 = document.querySelectorAll('.input-password')[1].value
    const passwordError = document.querySelector('#password-error')

    const passwordsMatch = password1 === password2
    const emptyPasswords = password1.trim() == "" || password2.trim() == ""
    const validPassword = validatePassword(password1)

    if (emptyPasswords) {
        passwordError.textContent = "Por favor, digite uma senha."
    } else if (!passwordsMatch) {
        passwordError.textContent = "As senhas não coincidem. Tente novamente."
    } else if (!validPassword) {
        passwordError.textContent = "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um símbolo especial e sem espaços."
    } else {
        passwordError.textContent = ""
    }

    if (!invalidName && validEmail && validPassword && passwordsMatch) {
        window.location.href = "/success"
    }
})