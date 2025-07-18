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
            if (error.name === 'SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong in user service");
            throw error;
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

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw {error: 'Invalid token'};
            }
            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw {error: 'No user with this token'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in user service");
            throw {error: 'token error'};
        }
    }

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

    isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong while checking user for isAdmin");
            throw { error};
        }
    }
}

module.exports = UserService;