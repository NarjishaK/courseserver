const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        set: function (phone) {
            return phone.startsWith('+91 ') ? phone : `+91 ${phone}`;
        }
    },
    image: {
        type: String
    },
    username: String,
    skills: String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to generate a unique userId before saving
userSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastUser = await this.constructor.findOne({}, {}, { sort: { createdAt: -1 } });
        let newUserId = 'URID00001';

        if (lastUser && lastUser.userId) {
            const lastIdNum = parseInt(lastUser.userId.replace('URID', ''), 10);
            newUserId = `URID${String(lastIdNum + 1).padStart(5, '0')}`;
        }

        this.userId = newUserId;
    }

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
