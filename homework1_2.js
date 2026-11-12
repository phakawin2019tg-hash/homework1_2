const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

// 1. http://localhost:3000/about (พื้นหลังสีน้ำเงิน)
app.get('/about', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>About</title>
        <style>
          body {
            background-color: blue;
            color: white;
            font-family: sans-serif;
            padding: 20px;
          }
        </style>
      </head>
      <body>
        This is about page.
      </body>
    </html>
  `);
});

// 2. http://localhost:3000/my-json-api3
app.get('/my-json-api3', (req, res) => {
  res.json({
    University: 'PIM'
  });
});

// 3. http://localhost:3000/users2
app.get('/users2', (req, res) => {
  res.json([
    {
      id: 1,
      firstname: 'Somchai',
      lastname: 'Jaidee',
    },
    {
      id: 2,
      firstname: 'Tony',
      lastname: 'Stark',
    },
  ]);
});

// 4. http://localhost:3000/read-users (อ่านไฟล์จาก users.json)
app.get('/read-users', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'users.json');
    const data = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Cannot read users.json' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


