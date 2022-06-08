let inputs = document.getElementsByTagName("input"),
  sendButton = document.querySelector(".contact-form button"),
  alerts = document.querySelectorAll("p.alert"),
  nameInput = inputs[0],
  emailInput = inputs[1],
  passwordInput = inputs[2],
  ageInput = inputs[3],
  phoneInput = inputs[4],
  messageInput = document.querySelector(".contact-form textarea"),
  nameAlert = alerts[0],
  emailAlert = alerts[1],
  passwordAlert = alerts[2],
  ageAlert = alerts[3],
  phoneAlert = alerts[4],
  messageAlert = alerts[5],
  usersMessages;

/*get messages from local storage */
if (localStorage.getItem("usersMessages") == null) {
  usersMessages = [];
} else {
  usersMessages = JSON.parse(localStorage.getItem("usersMessages"));
}

/*add send message to send button to check all inputs */
sendButton.addEventListener("click", sendMessage);
function sendMessage() {
  nameAlert.classList.add("d-none");
  emailAlert.classList.add("d-none");
  passwordAlert.classList.add("d-none");
  ageAlert.classList.add("d-none");
  phoneAlert.classList.add("d-none");
  messageAlert.classList.add("d-none");
  let user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      age: ageInput.value,
      phone: phoneInput.value,
      message: messageInput.value,
    },
    filled = checkInputs(
      user.name,
      user.email,
      user.password,
      user.age,
      user.phone,
      user.message
    );
  if (filled) {
    clearInputs(
      nameInput,
      emailInput,
      passwordInput,
      ageInput,
      phoneInput,
      messageInput
    );
    usersMessages.push(user);
    localStorage.setItem("usersMessages", JSON.stringify(usersMessages));
  }
}

/*check empty values of the input fields */
function checkInputs(
  nameValue,
  emailValue,
  passwordValue,
  ageValue,
  phoneValue,
  messageValue
) {
  let checked = false;
  if (
    nameValue == "" &&
    emailValue == "" &&
    passwordValue == "" &&
    ageValue == "" &&
    phoneValue == "" &&
    messageValue == ""
  ) {
    messageAlert.innerHTML = `All Inputs are required.`;
    messageAlert.classList.replace("d-none", "d-block");
  } else {
    checked =
      checkName(nameValue) &&
      checkEmail(emailValue) &&
      checkPassword(passwordValue) &&
      checkAge(ageValue) &&
      checkPhone(phoneValue) &&
      checkMessage(messageValue);
  }
  if (checked) {
    messageAlert.innerHTML = `Message Sent.`;
    messageAlert.classList.replace("alert-danger", "alert-success");
    messageAlert.classList.replace("d-none", "d-block");
  }
  return checked;
}

/*check name input */
function checkName(nameValue) {
  if (nameValue == "") {
    nameAlert.innerHTML = `Name is required.`;
    nameAlert.classList.replace("d-none", "d-block");
    return false;
  } else if (isNaN(nameValue) == false) {
    nameAlert.innerHTML = `Name is required not number.`;
    nameAlert.classList.replace("d-none", "d-block");
    return false;
  }
  return true;
}

/*check email is valid or Not */
function checkEmail(emailValue) {
  let emailRegex = /.+@.{2,}\..{2,4}$/;
  if (emailValue == "") {
    emailAlert.innerHTML = `Email is required.`;
    emailAlert.classList.replace("d-none", "d-block");
    return false;
  } else if (emailRegex.test(emailValue) == false) {
    emailAlert.innerHTML = `Enter a valid email please`;
    emailAlert.classList.replace("d-none", "d-block");
    return false;
  } else if (emailRegex.test(emailValue)) {
    return true;
  }
}

/*check if password empty or less than 8 characters */
function checkPassword(passwordValue) {
  if (passwordValue == "") {
    passwordAlert.innerHTML = `Password is required.`;
    passwordAlert.classList.replace("d-none", "d-block");
    return false;
  } else if (passwordValue.length < 8) {
    passwordAlert.innerHTML = `Password must be more than 8 characters.`;
    passwordAlert.classList.replace("d-none", "d-block");
    return false;
  }
  return true;
}

/*check age is number or not */
function checkAge(ageValue) {
  if (ageValue == "") {
    ageAlert.innerHTML = `Age is required.`;
    ageAlert.classList.replace("d-none", "d-block");
    return false;
  } else if (isNaN(ageValue)) {
    ageAlert.innerHTML = `Age must be a number.`;
    ageAlert.classList.replace("d-none", "d-block");
    return false;
  }
  return true;
}

/*check phone is valid or Not */
function checkPhone(phoneValue) {
  let phoneRegex = /^(01)[0-25][0-9]{8}$/;
  if (phoneValue == "") {
    phoneAlert.innerHTML = `Phone is required.`;
    phoneAlert.classList.replace("d-none", "d-block");
    return false;
  } else if (phoneRegex.test(phoneValue) == false) {
    phoneAlert.innerHTML = `Enter a valid phone please`;
    phoneAlert.classList.replace("d-none", "d-block");
    return false;
  } else if (phoneRegex.test(phoneValue)) {
    return true;
  }
}

/*check message input empty or not */
function checkMessage(messageValue) {
  if (messageValue == "") {
    messageAlert.innerHTML = `Message is required.`;
    messageAlert.classList.replace("d-none", "d-block");
    return false;
  }
  return true;
}

/*Clear all inputs */
function clearInputs(
  nameInput,
  emailInput,
  passwordInput,
  ageInput,
  phoneInput,
  messageInput
) {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  ageInput.value = "";
  phoneInput.value = "";
  messageInput.value = "";
}
