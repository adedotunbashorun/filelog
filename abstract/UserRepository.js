const AbstractRepository = require("./AbstractRepository");
const User = require("../models/User");
class UserRepository extends AbstractRepository {

    constructor() {
        super(User);
    }
}

module.exports = UserRepository;