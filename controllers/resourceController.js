const Resource = require('../models/resourceModel');

exports.createResource = async (req, res) => {
  try {
    const resource = new Resource({
      ...req.body,
      createdBy: req.user._id
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('createdBy', 'email');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('createdBy', 'email');
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found or unauthorized' });
    }

    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({ 
      _id: req.params.id, 
      createdBy: req.user._id 
    });

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found or unauthorized' });
    }

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};