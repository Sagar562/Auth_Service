const { User } = require('../models/index');

class UserRepository {
    async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong while creating user in user repository");
            throw { error };
        }
    }

    async deleteUser(userId) {
        try {
            const response = await User.destroy({
                where: { id: userId }
            });
            return response;
        } catch (error) {
            console.log("Something went wrong while deleting user in user repository");
            throw { error };
        }
    }
}

module.exports = UserRepository;