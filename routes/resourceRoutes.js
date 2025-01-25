const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { resourceValidation, idValidation } = require('../utils/validators');
const {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource,
} = require('../controllers/resourceController');

router.post('/', 
    authMiddleware, 
    roleMiddleware(['Admin']), 
    resourceValidation, 
    createResource
);

router.get('/', 
    authMiddleware, 
    getAllResources
);

router.get('/:id', 
    authMiddleware, 
    idValidation, 
    getResourceById
);

router.put('/:id', 
    authMiddleware, 
    roleMiddleware(['Admin']), 
    idValidation,
    resourceValidation, 
    updateResource
);

router.delete('/:id', 
    authMiddleware, 
    roleMiddleware(['Admin']), 
    idValidation,
    deleteResource
);

module.exports = router;