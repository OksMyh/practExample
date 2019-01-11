let databse = require('../../DataBase').getInstance();

module.exports = async (req, res) => {

    try {
        const {name, email, password} = req.body;
        const UserModel = databse.getModel('User');

        if (!UserModel) throw new Error('Cant connect to DataBase');
        if (!name || !email || !password) throw new Error('Some field is empty');

        let isRegister = await UserModel.findOne({
            where: {
                email,
            }
        });

        if (isRegister) throw new Error('This email is already registered');

        await UserModel.create({
            name,
            password,
            email
        })
        res.redirect('/login')
    }

    catch (e) {
        res.render('errorPage', {message: e.message})
    }
}