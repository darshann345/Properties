// routes/patients.js

const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

router.post('/addProperty', async (req, res) => {
    try {
        const { id, title, description, image_uri, contact } = req.body;

        const newProperty = new Property({
            id,
            title,
            description,
            image_uri,
            contact
        });

        const savedProperty = await newProperty.save();

        res.status(201).json({
            message: "Property added Successfully",
            property: savedProperty
        });

    } catch (err) {
        res.status(500).json({   // ✅ CHANGE 401 → 500
            message: "Error adding Property",
            error: err.message
        });
    }
});
router.put("/updateProperty/:id", async (req, res) => {
    try {
        const propertyId = Number(req.params.id); // if your id field is numeric

        // Find property by custom numeric 'id'
        const property = await Property.findOne({ id: propertyId });

        if (!property) return res.status(404).json({ message: "Property not found" });

        // Update all fields from request body
        Object.assign(property, req.body);

        const updatedProperty = await property.save();

        res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
    } catch (err) {
        res.status(500).json({ message: "Error updating property", error: err.message });
    }
});
router.route("/deleteProperty/:id").delete(async (req, res) => {
    try {
        const { id } = req.params.id;
        const deletedProperty = await Property.findOneAndDelete({ id: Number(req.params.id) });

        if (!deletedProperty) return res.status(404).json({ message: "Poroperty Not Found" })
        res.status(200).json({ message: "Property Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ message: "Error Deleting Property", error: err.message })
    }
})
router.route("/getProperties").get(async (req, res) => {
    try {
        const Properties = await Property.find();
        res.status(200).json({ message: "Properties Retrieved Successfully", properties: Properties })
    } catch (err) {
        res.status(500).json({ message: "Error Retrieving Properties", error: err.message })
    }
})


module.exports = router;