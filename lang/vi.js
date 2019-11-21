const transErrorValidateUser = {
  error_email_required : "Email field must not be blank! Please enter",
  error_email_exist: "Email already exists! Please enter another email",
  error_email_invalid: "Invalid email! Please enter your email correctly",
  error_password_required: "Password field must not be blank! Please enter",
  error_password_isLength: "Password requires 8 characters including: Uppercase letters, lowercase letters and numbers",
  error_password_must_match: "Passwords must match",
  error_fullName_required: "Full name field must not be blank! Please enter",
  error_fullName_limit: "Full name is limited to 3 - 20 characters and cannot contain special characters",
  error_phone_required: "Phone field must not be blank! Please enter",
  error_phone_invalid: "Phone numbers start with 0 and contain 3 - 12 characters"
};

module.exports = { 
  transErrorValidateUser
}