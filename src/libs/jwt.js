import Jwt from "jsonwebtoken";

export const createToken = (payload) => {
    return new Promise(( resolve, reject ) => {
        Jwt.sign(
            payload,
            'ecommerceSecret',
            {
                expiresIn: '20s'
            }
        )
    })
}