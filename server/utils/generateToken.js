const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const sendTokenResponse = (user, statusCode, res, message = "Success") => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  // ✅ Safe user object
  let userResponse = {};
  try {
    userResponse = user.toPublicProfile
      ? user.toPublicProfile()
      : user.toObject();
  } catch (e) {
    userResponse = user;
  }

  return res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    token,
    user: userResponse,
  });
};

module.exports = { generateToken, sendTokenResponse };
