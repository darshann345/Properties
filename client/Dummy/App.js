import React, { useState } from "react";
import UsersTable from "./components/UsersTable";
import EditUserForm from "./components/EditUserForm";
import AddUserForm from "./components/AddUserForm";
import { Container } from "@mui/material";

function App() {
    const [editingUser, setEditingUser] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const refreshTable = () => setRefresh(!refresh);

    return (
        <Container>
            <h1>User Management</h1>

            <AddUserForm onAdded={refreshTable} />

            <UsersTable key={refresh} onEdit={handleEdit} />

            {editingUser && (
                <EditUserForm
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onUpdated={refreshTable}
                />
            )}
        </Container>
    );
}

export default App;
