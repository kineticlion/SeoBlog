const User = require('../models/user')
const shortId = require('shortid')

exports.signup = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if (user) return res.status(400).json({
        error: 'Email is taken'
    })

    const {
        name,
        email,
        password
    } = req.body
    let username = shortId.generate()
    let profile = `${process.env.CLIENT_URL}/profile/${username}`

    let newUser = new User({
        name,
        email,
        password,
        profile,
        username
    })
    try {
        await newUser.save()
        res.json({
            message: 'Signup Success! Please sign in.'
        })
    } catch (e) {
        return res.status(400).json({
            error: e
        })
    }
}