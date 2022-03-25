const addToLocals = (req, res, next) => {
    res.locals.userName = req.session?.userName;
    res.locals.userId = req.session?.userId;
    res.locals.userEmail = req.session?.userEmail;
    next();
};

const checkUser = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

// const checkAuthFalse = (req, res, next) => {
//   if (!req.session.userId) {
//     return res.sendStatus(401);
//   }
//   return next();
// };

module.exports = { addToLocals, checkUser };
