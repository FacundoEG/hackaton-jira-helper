const express = require('express');
const app = express();
const multer = require('multer');
const port = '8080'
const path = require('path');

// Set up storage using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Hello world!')
})

// Endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Return the uploaded file
    const filePath = path.join(__dirname, req.file.path);
    res.sendFile(filePath);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
