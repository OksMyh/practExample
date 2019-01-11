const DataBse = require('../../DataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const UserModel = DataBse.getModel('User');
        const {email, password} = req.body;

        if (!UserModel) throw new Error('Cant connect to DataBase');
        if (!email || !password) throw new Error('Some field is empty');


        const isRegisterd = await UserModel.findOne({
            where: {
                email,
                password
            }
        });
        if (!isRegisterd) throw new Error('This user is not registered');

        const allUsers = await UserModel.findAll({});

        res.render('usersPage', {allUsers})

    } catch (e) {
        res.render('errorPage', {message: e.message})
    }
}