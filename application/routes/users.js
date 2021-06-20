const router = require('express').Router();
const usersRepo = require('../repositories/users')


/* GET users listing. */



router.get('/', async function(req, res, next) {
  const limit=parseInt(req.query.limit) || 10;
  const offset=parseInt(req.query.offset) || 0;
  res.send(await usersRepo.getUsers(offset , limit ))
});

router.get('/:id', async function(req, res, next) {
  res.send(await usersRepo.getUser(req.params.id))
});

router.post('/', async function(req, res, next) {
  var UserCreate =await usersRepo.addUser(req.body);
  res.redirect("/");
  res.send(UserCreate);
});

router.put('/', async function(req, res, next) {
  var UserUpdate = await usersRepo.updateUser(req.body)
  res.send(UserUpdate)
});

router.delete('/:id', async function(req, res, next) {
  var UserDelete = await usersRepo.deleteUser(req.params.id)
  res.send( UserDelete);

});



module.exports = router;
