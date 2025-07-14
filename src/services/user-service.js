const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data) {
        try {
            const user = await this.userRepository.createUser(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in user service");
            throw { error };
        }
    }

    async signIn(email, plainPassword) {
        try {
            // fetch user with email
            const user = await this.userRepository.getByEmail(email);
            // compare plainPassword and encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);

            if (!passwordMatch) {
                console.log("Password does not match");
                throw { error: "Incorrect Password" };
            }

            // if password match then create token and send to the user
            const newToken = this.createToken({email: user.email, id: user.id});
            return newToken;

        } catch (error) {
            console.log("Something went wrong while signIn in user service");
            throw { error };
        }
    }

    // async getById(userId) {
    //     try {
    //         const user = await this.userRepository.getById(userId);
    //         return user;
    //     } catch (error) {
    //         console.log("Something went wrong in user service");
    //         throw { error };
    //     }
    // }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
            console.log("Something went wrong in user service");
            throw { error };
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw { error };
        }
    }

    checkPassword(plainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(plainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password in password matching");
            throw { error };
        }
    }
}

module.exports = UserService;