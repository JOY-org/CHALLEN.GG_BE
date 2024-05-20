const passport = require("passport");

exports.verifyToken = (req, res, next) => {
    console.log('test');
    try {
        // jwt
        passport.authenticate('jwt', {session: false}, (err, user, authErr) => {
            // 토큰 만료
            if (authErr) {
                if (authErr.message === "jwt expired") {
                    authErr.status = 403;
                }
                return next(authErr);
            }
            // user 없음 => invalid
            if (!user) {
                const err = new Error('토큰이 유효하지 않습니다.');
                err.status = 401;
                return next(err);
            }
            req.user = user; //토큰으로 가져온 user
            return next();
        })(req, res, next);
    } catch (err) {
        console.error(err);
        next(err);
    };
}