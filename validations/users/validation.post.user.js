const { validationResult, body } = require("express-validator");
const validator = require("validator");
const { User } = require("../../model/User");
const { ERROR } = require("../../lang/index");

const checkPostUser = [
  body('email', ERROR.error_email_invalid).not().isEmpty().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  body('password', ERROR.error_password_isLength).isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
  body('fullName', ERROR.error_fullName_limit).optional().isLength({ min: 3, max: 20 }).matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
  body('phone', ERROR.error_phone_invalid).optional().matches(/^(0)[0-9]{9,10}$/)
];

const validatePostUser = async (req, res, next) => {
  const extractedErrors = [];
  const errors = validationResult(req);
  const { email, password, confirmPassword , fullName, phone } = req.body;
  
  const user = await User.findOne({ email });
  // ** Validate Email /
  if (user) {
    extractedErrors.push({ email: ERROR.error_email_exist });
  } else if (!email) {
    extractedErrors.push({ email: ERROR.error_email_required });
  } else if (errors.isEmpty()) {
    return next()
  }
  // * Validate Password  /
  if (!password) {
    extractedErrors.push({ password: ERROR.error_password_required })
  } else if (!validator.equals(password, confirmPassword)) {
    extractedErrors.push({confirmPassword: ERROR.error_password_must_match})
  } 
  // * Validate fullName  /
  if (!fullName) {
    extractedErrors.push({ fullName: ERROR.error_fullName_required })
  }
  // * Validate Phone /
  if (!phone) {
    extractedErrors.push({ phone: ERROR.error_phone_required });
  }


  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  return res.status(422).json({ errors: extractedErrors });


};

module.exports = {
  validatePostUser,
  checkPostUser
}