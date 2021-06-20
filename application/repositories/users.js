const { User } = require('../models')




 module.exports = {
   getAllUsers() {
        return User.findAll()
   },
   // méthodes à implémenter
   getUsers(offset = 0, limit = 10) {
       
        return User.findAll({
            offset: offset , limit:limit
        })
    },


   getAdmins() { 
        return User.findAll({
            where: {
                role: 'admin'
            }
        })
   },

   getAuthors() { 
        return User.findAll({
            where: {
                role: 'author'
            }
        })
   },


   getGuests(){ 
        return User.findAll({
            where: {
                role: 'guest'
            }
        })
   }, 


   getUser(id) { 
        return User.findByPk(id)
   },

   getUserByEmail(email) { 
        return User.findOne({
            where:{
                email:email
            }
        })
   },
   async addUser(user) {
        UserExiste = await this.getUserByEmail(user.email);
        if(UserExiste)
            return {
                status: 403,
                message: 'User already exists'
            };

        var UserCreate = await User.create(user)
        return {
            status: 200,
            message: 'User added succesuflly',
            user: UserCreate
        }
    },

   async updateUser(user) { 
        UserExiste = await this.getUser(user.id);
       if(!UserExiste)
       {
           return {
            status: 404,
            message: 'User not found'
           }
       }
        UserUpdate =await User.update(user, {
            where: {
                id: user.id
            }
        })
        return {
            status: 200,
            message: 'User updated',
            user: UserUpdate
        }
   },
   async deleteUser(id) { 
        UserExiste = await this.getUser(id);
        if(!UserExiste)
        {
            return {
            status: 404,
            message: 'User not found'
            }
        }
        UserDelete= await User.destroy({
            where: {
                id :id
            }
        })
        return {
            status: 200,
            message: 'User deleted',
            user: UserDelete
        }

   },
   // D'autres méthodes jugées utiles
 }
