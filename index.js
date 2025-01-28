import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let comments = []; // In-memory storage for comments

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To parse JSON bodies

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Endpoint to check credentials
app.post("/check", (req, res) => {
    if (req.body["password"] === "ILoveProgramming" && req.body["Username"] === "ChristianPer") {
        res.sendFile(__dirname + "/public/body.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

// Endpoint to add a comment
app.post('/Body', (req, res) => {
    const { title, thoughts } = req.body;

    if (title && thoughts) {
        const newComment = {
            id: comments.length + 1,
            title,
            thoughts,
            time: new Date().toLocaleString(),
        };
        comments.push(newComment);
        res.status(201).json(newComment);
    } else {
        res.status(400).json({ error: 'Title and thoughts are required.' });
    }
});

// Endpoint to get all comments
app.get('/comments', (req, res) => { 
  //This route listens for GET requests at the /comments endpoint.
  //When this endpoint is hit, it returns the current list of comments stored in the comments array
    res.json(comments); 
    //res.json(comments) method converts the comments array into a JSON response and sends it back to the client
});

// Endpoint to delete a comment
app.delete('/comments/:id', (req, res) => { 
//This route listens for DELETE requests at the /comments/:id endpoint
//:id part is a route parameter that represents the ID of the comment to be deleted
    const commentId = parseInt(req.params.id, 10);
    // checking the specific id number if it is a number. else the result is NaN (not a number)
    // parseInt is a built-in JavaScript function that converts a string into an integer
    // parseInt(string, radix);
    // The first argument (string) is the value you want to convert, and the second argument (radix) specifies the base of the numeral system (base 10)
    // req.params.id
    // req.params is an object containing route parameters. These are named segments of the URL that you define in your route paths
    comments = comments.filter(comment => comment.id !== commentId);
    // .filter() Method
   
    // The .filter() method is an array method in JavaScript that creates a new array with all elements that pass a test implemented by the provided function
    // comment.id !== commentId: This comparison checks if the id of the current comment is not the same as commentId
    // If they are not equal, the condition evaluates to true, meaning the comment will be included in the new array
    res.status(204).send(); // No content
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
