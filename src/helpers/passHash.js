const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// Function to hash a password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

// Function to compare a password with a hash
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    hashPassword,
    comparePassword,
};