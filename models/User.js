const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required!'],
    },
    reference: {
      type: String,
      required: [true, 'Reference required!'],
      unique: [true, 'Reference already exists!'],
      // validate: {
      //   validator: function(v) {
      //     return /^0\d{9}$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid reference number! It must be exactly 8 digits long.`
      // }
    },
    password: {
      type: String,
      required: [true, 'Password required!']
    },
    token: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;