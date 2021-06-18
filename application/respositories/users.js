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
        return User.find(id)
   },

   getUserByEmail(email) { 
        return User.findOne({
            where:{
                email:email
            }
        })
   },
   addUser(user) {
        UserExiste = this.getUserByEmail(user.email);
        if(UserExiste)
            return {
                status: 403,
                message: 'User already exists'
            };

        var UserCreate = await User.create(userDate)
        return {
            status: 200,
            message: 'User added succesuflly',
            user: UserCreate
        }
    },

   updateUser(user) { 
       if( getUser(user.id)==NULL)
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
   deleteUser(id) { 
        if( getUser(id)==NULL)
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
