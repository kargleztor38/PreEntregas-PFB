import bcrypt from "bcrypt";

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const passwordValidate = (user, password) => {
    return bcrypt.compare(password, user.password);
};
