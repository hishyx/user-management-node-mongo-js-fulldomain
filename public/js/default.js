function togglePassword() {
  const pwd = document.getElementById("pass-box");
  const icon = document.getElementById("togglePassword");

  if (pwd.type === "password") {
    pwd.type = "text";
    icon.src = "/images/hide-pass.png";
  } else {
    pwd.type = "password";
    icon.src = "/images/show-pass.png";
  }
}

function toggleConfirmPassword() {
  const pwd = document.getElementById("confirm-pass-box");
  const icon = document.getElementById("toggleConfirmPassword");

  if (pwd.type === "password") {
    pwd.type = "text";
    icon.src = "/images/hide-pass.png";
  } else {
    pwd.type = "password";
    icon.src = "/images/show-pass.png";
  }
}

const icon = document.getElementById("togglePassword");

if (icon) {
  icon.addEventListener("click", () => {
    togglePassword();
  });
}

const confirm_icon = document.getElementById("toggleConfirmPassword");

if (confirm_icon) {
  confirm_icon.addEventListener("click", () => {
    toggleConfirmPassword();
  });
}
