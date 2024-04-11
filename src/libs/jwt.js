import Jwt from "jsonwebtoken";

export const createToken = (userId) => {
    const token = Jwt.sign(userId, process.env.SECRET, {
        expiresIn: "20h",
    });
    return token
};
