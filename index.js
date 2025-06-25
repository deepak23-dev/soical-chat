import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import userLogin from './routes/auth.routrs.js';
import createPost from './routes/post.routers.js';
import socket from './routes/socket.routes.js';

import cookieParser from 'cookie-parser';
import { verifyAuth } from './middlewares/verify-auth.js';
import session from 'express-session';
import methodOverride from 'method-override';
import requestIp from 'request-ip';

import { app, server } from './socket/server.js'; // must be defined as http.createServer(app) inside that file

// 🔧 Required for __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure Render uses the correct port
const PORT = process.env.PORT || 8000;

// 🔧 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(requestIp.mw());

// 🔧 Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔧 View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // more robust

// 🔒 Session config
app.use(session({
    secret: "my-secret", // Ideally, load from process.env.SECRET
    resave: true,
    saveUninitialized: false
}));

// 🛡️ Custom auth middleware
app.use(verifyAuth);

// 🚀 Routes
app.use(userLogin);
app.use(createPost);
app.use(socket);

// 🟢 Start server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ App is listening on http://0.0.0.0:${PORT}`);
});
