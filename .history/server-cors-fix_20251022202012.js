// Updated CORS configuration for server.js
// Replace the existing corsOptions with this:

const corsOptions = {
    origin: 'https://uwaniumnya.github.io',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    optionsSuccessStatus: 200
};

// The app.use(cors(corsOptions)) line should remain the same
// Just replace the corsOptions object definition with the above