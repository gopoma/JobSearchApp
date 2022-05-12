const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function normalizeRole(req, res, next) {
  if(req.body.role) {
    req.body.role = "applicant";
  }
  return next();
}

function verifyToken(req, res, next) {
  const bearer = req.headers.authorization;

  if(bearer && bearer.match(/^Bearer .+$/)) {
    const [, token] = bearer.match(/^Bearer (.+)$/);

    if(token) {
      try {
        const decoded = jwt.verify(token, jwtSecret);
        
        req.user = decoded;

        return next();
      } catch(error) {
        const { message, name } = error;

        return res.status(403).json({
          error: true,
          message,
          type: name
        });
      }
    }
  }

  return res.status(403).json({
    error: true,
    message: "Insufficient permissions"
  });
}

function typeValidation(...types) {
  return function(req, res, next) {
    if(types.reduce((result, type) => result || req.user.role === type, false)) {
      return next();
    } else {
      return res.status(403).json({
        error: true,
        mesage: "Insufficient permissions"
      });
    }
  }
}

const adminValidation = typeValidation("admin");
const employerValidation = typeValidation("employer");
const applicantValidation = typeValidation("applicant");
const employerAdminValidation = typeValidation("employer", "admin");

module.exports = {
  normalizeRole,
  verifyToken,
  adminValidation,
  employerValidation,
  applicantValidation,
  employerAdminValidation
};
