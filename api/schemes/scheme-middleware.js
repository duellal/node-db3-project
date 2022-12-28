/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const id = await db('schemes').where('scheme_id', req.params.id)

  if(!id){
    next({
      status: 404, 
      message: `scheme with scheme_id ${req.params.id} not found`
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
const validateScheme = async (req, res, next) => {
  const schemeName = await db('schemes').where('scheme_name', req.body.scheme)

  if(!schemeName){
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

  if(!instructions || step_number <= 1 || typeof step_number !== 'number'){
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
