function loginUserId(req) {
  return req.cookies.userID;
};

module.exports = {loginUserId};
