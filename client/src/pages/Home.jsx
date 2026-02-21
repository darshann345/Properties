// Home.jsx
import React, { useEffect, useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { getProperties, addProperty, updateProperty } from "./../api/propertyApi";
import PropertiesCard from "../components/PropertiesCard";

function Home() {
    const [properties, setProperties] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState("");

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        image_uri: "",
        contact: ""
    });

    // Fetch properties on component mount
    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await getProperties();
            setProperties(res.properties);   // ✅ FIXED HERE
        } catch (err) {
            console.error("Error fetching properties:", err);
        }
    };

    const handleSave = async () => {
        try {
            if (isEditMode) {
                await updateProperty(editingId, formData);
            } else {
                await addProperty(formData);
            }
            clearForm();
            fetchProperties();
        } catch (err) {
            console.error("Error saving property:", err);
        }
    };

    const handleEdit = (property) => {
        setIsEditMode(true);
        setEditingId(property.id);
        setFormData({ ...property });
    };

    const clearForm = () => {
        setIsEditMode(false);
        setEditingId("");
        setFormData({
            id: "",
            title: "",
            description: "",
            image_uri: "",
            contact: ""
        });
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <h1>Property Management</h1>

            {/* ID Field */}
            <TextField
                label="ID"
                type="number"
                value={formData.id}
                onChange={(e) =>
                    setFormData({ ...formData, id: Number(e.target.value) })
                }
                fullWidth
                style={{ marginBottom: "10px" }}
            />

            {/* Title */}
            <TextField
                label="Title"
                value={formData.title}
                onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                }
                fullWidth
                style={{ marginBottom: "10px" }}
            />

            {/* Description */}
            <TextField
                label="Description"
                value={formData.description}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
                fullWidth
                style={{ marginBottom: "10px" }}
            />

            {/* Image URI */}
            <TextField
                label="Image URI"
                value={formData.image_uri}
                onChange={(e) =>
                    setFormData({ ...formData, image_uri: e.target.value })
                }
                fullWidth
                style={{ marginBottom: "10px" }}
            />

            {/* Contact */}
            <TextField
                label="Contact"
                value={formData.contact}
                onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                }
                fullWidth
                style={{ marginBottom: "10px" }}
            />

            <Button variant="contained" onClick={handleSave}>
                {isEditMode ? "Update Property" : "Add Property"}
            </Button>

            <Button
                variant="outlined"
                onClick={clearForm}
                style={{ marginLeft: "10px" }}
            >
                Clear
            </Button>

            {/* Property Cards */}
            <PropertiesCard
                properties={properties}
                onEdit={handleEdit}
                refresh={fetchProperties}
            />
        </Container>
    );
}

export default Home;