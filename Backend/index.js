const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const FileUpload = require('express-fileupload');

const clodinaryConnect = require('./Configs/CloudinaryConfig');
const DB_connect = require('./Configs/DatabaseConfig');

const route = require('./Routes/PostRoutes');
const getRoute = require('./Routes/GetRoute');
const putrouter = require('./Routes/PutRoute');

// WebSocket
const websocket_connection = require('./Controllers/web-socket/conncetion');
const upgradeHttpToWebSocket = require('./Controllers/web-socket/http-to-ws')
const http = require('http');
const passport = require('./Configs/passport').default;

dotenv.config();

const app = express();
const server = http.createServer(app); //Shared HTTP server for both Express and WebSocket

// Middlewares
app.use(FileUpload({ useTempFiles: true, tempFileDir: "./temp/" }));


app.set("trust proxy", 1);

app.use(cors({
  origin: ["http://localhost:5174", "http://localhost:5173"],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/codesy/v1', route);
app.use('/codesy/v1/get', getRoute);
app.use('/codesy/v1/put', putrouter);


//OAuth with Google
app.use(passport.initialize());
app.use('/codesy/v1/auth/oauth', require('./Controllers/auth/oAuth-route').default);

app.get('/hello', (req, res) => {
  console.log("hi all fine bro");
  res.send(`<h1> hi bro </h1>`);
});

// Use this instead of app.listen()
server.listen(3000, () => {
  console.log("Server (HTTP + WebSocket) is running at port 3000");
});

// MongoDB and Cloudinary
const URL = process.env.MONGO_URL;
console.log("MongoDB URL:", URL);
DB_connect(URL);
clodinaryConnect();


// Connect WebSocket to the same HTTP server
console.log("Connecting WebSocket...");
// websocket_connection(server);
upgradeHttpToWebSocket(server);
