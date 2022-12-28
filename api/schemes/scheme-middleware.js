const db = require(`../../data/db-config`)
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const id = await db('schemes').where('scheme_id', req.params.scheme_id)

  if(id.length === 0){
    next({
      status: 404, 
      message: `scheme with scheme_id ${req.params.scheme_id} not found`
    })
  }
  next()
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body 
  console.log(`Middleware Scheme Name:`, scheme_name)
  console.log(`Middleware Scheme Name type of:`, typeof scheme_name)

  if(!scheme_name || typeof scheme_name !== 'string'){
    next({
      status: 400,
      message: `invalid scheme_name`
    })
  }
  next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const {instructions, step_number} = req.body

  if(!instructions || step_number < 1 || typeof step_number !== 'number'){
    next({
      status: 400, 
      message: `invalid step`
    })
  }
  next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
