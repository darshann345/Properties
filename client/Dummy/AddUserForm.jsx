import React, { useState } from "react";
import { createUser } from "../api/userApi";
import { TextField, Button } from "@mui/material";

export default function AddUserForm({ onAdded }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSave = async () => {
        try {
            await createUser({ name, email });
            onAdded();
            setName("");
            setEmail("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Button variant="contained" onClick={handleSave}>
                Add User
            </Button>
        </div>
    );
}
