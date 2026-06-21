const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  {
    id: 1,
    name: "Kiranraj",
    email: "kiranraj@gmail.com"
  }
];

// GET - Fetch all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST - Add new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});

// PUT - Update user
app.put("/users/:id", (req, res) => {
  const user = users.find(
    u => u.id === parseInt(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const { name, email } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;

  res.json({
    message: "User updated successfully",
    user
  });
});

// DELETE - Remove user
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(
    u => u.id === parseInt(req.params.id)
  );

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users.splice(userIndex, 1);

  res.json({
    message: "User deleted successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});