// PropertiesCard.js (Card version)
import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Grid } from "@mui/material";
import { deleteProperty } from "../api/propertyApi";

export default function PropertiesCard({ properties, onEdit, refresh }) {

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            await deleteProperty(id);
            refresh();
        }
    };

    return (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
            {properties.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{property.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {property.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Contact: {property.contact}
                            </Typography>
                            {property.image_uri && (
                                <img
                                    src={property.image_uri}
                                    alt={property.title}
                                    style={{ width: "100%", marginTop: "10px", borderRadius: "4px" }}
                                />
                            )}
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => onEdit(property)}>Edit</Button>
                            <Button size="small" color="error" onClick={() => handleDelete(property.id)}>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}