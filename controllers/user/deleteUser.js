let DataBase = require('../../DataBase').getInstance();
module.exports = async (req, res) => {
    try {
        const UserModel = DataBase.getModel('User');
        const id = req.params.id;

        if (!UserModel) throw new Error('Cant connect to DataBase');
        if (!id) throw new Error('BAD REQUEST');

        await UserModel.destroy({
            where: {
                id
            }
        });

        let allUsers = await UserModel.findAll();

        res.render('usersPage', {allUsers})
    } catch (e) {
        res.render('errorPage', {message: e.message})
    }

};