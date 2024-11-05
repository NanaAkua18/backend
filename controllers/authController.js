const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User.js');

const signup = async (req, res) => {
  const {name, reference, password} = req.body

  if (!name || !reference || !password) {
    return res.status(400).json({ message: 'All fields are required!' })
  }
  try {
    const duplicateReference = await User.findOne({ reference }).exec()
    if (duplicateReference) {
      return res
        .status(409)
        .json({ message: `The reference number ${reference} already exist` })
    }

    const hashedP = bcrypt.hashSync(password, 10)
    const newUser = new User({
      name,
      reference,
      password: hashedP,
    })
    await newUser.save()
    const { password: pass, ...rest } = newUser._doc
    res.status(201).json(rest)
  } catch (error) {
    console.log("Error", error)
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(err => err.message)
      res.status(400).json({ message: messages[0] })
    } else {
      console.log("Error", error)
      res.status(500).json({ error: 'An unexpected error occurred while signup. Please retry' })
    }
  }
}

const signin = async (req, res) => {
  const { reference, password } = req.body
  if (!reference || !password) {
    return res.status(400).json({ message: 'Reference number and password required!' })
  }
  const foundUser = await User.findOne({ reference }).exec()
  if (!foundUser) {
    return res
      .status(401)
      .json({ message: 'Wrong credentials entered', ok: false })
  }

  try {
    const isValidated = bcrypt.compareSync(password, foundUser.password)
    if (!isValidated) {
      return res
        .status(401)
        .json({ message: 'Wrong credentials entered!', ok: false })
    }

    const accessToken = jwt.sign(
      {
        name: foundUser.name,
        reference,
        _id: foundUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    const { password: pass, ...rest } = foundUser._doc

    return res.status(200).json({
      message: `User ${reference} successfully signed in!`,
      user: { ...rest, accessToken },
      ok: true
    })
  } catch (error) {
    console.log(error)
    return res
      .status(401)
      .json({ message: 'Error while signing in', ok: false })
  }
}

const verifyToken = (req, res, next) => {
  const header = req.headers.Authorization || req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format', ok: false })
  }
  const token = header.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err)
      return res
        .status(401)
        .json({ expired: true, message: 'Token expired', ok: false })
    }
    req.user = await User.findOne({ reference: decoded.reference })
    next()
  })
}

const verifyRole = roles => async (req, res, next) => {
  try {
    const header = req.headers.Authorization || req.headers.authorization

    if (!header?.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Invalid token format', ok: false })
    }

    const token = header.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err)
        return res
          .status(401)
          .json({ expired: true, message: 'Token expired', ok: false })
      }
      const user = await User.findOne({ contact: decoded.contact })
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied.' })
      }

      req.user = user
      next()
    })
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' })
  }
}

module.exports = { signin, signup, verifyToken, verifyRole };
