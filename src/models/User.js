const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function(next) {
  if (!this.isModified('password')) {
      next();
  }
  try {
      const salt = await bcrypt.genSaltSync(10);
      this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
      console.log("Error hashing password", error);
      next(error);
  }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.export= User;