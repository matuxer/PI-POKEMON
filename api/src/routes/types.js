const { Router } = require('express');
const { getApiTypes } = require('./controllers/apiControllers.js');
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    let rta = await getApiTypes();
    res.send(rta)
  } catch (e) {
    next(e);
  }
})


module.exports = router;