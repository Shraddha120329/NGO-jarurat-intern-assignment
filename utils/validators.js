const Joi = require('joi');

const resourceValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    description: Joi.string().optional().max(500)
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

const idValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().length(24).required()
  });

  const { error } = schema.validate({ id: req.params.id });
  
  if (error) {
    return res.status(400).json({ message: 'Invalid resource ID' });
  }
  
  next();
};

module.exports = {
  resourceValidation,
  idValidation
};