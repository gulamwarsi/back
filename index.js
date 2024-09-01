import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/Practice'; // For local MongoDB
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority'; // For MongoDB Atlas

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());

// Define your schema
const formSchema = new mongoose.Schema({
    name: String,
    email: String
});

// Create a model
const Form = mongoose.model('Form', formSchema);

app.post('/submit', async (req, res) => {
    try {
        const formData = new Form(req.body);
        await formData.save();
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
