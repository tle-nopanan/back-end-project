"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("./repositories/user"));
const user_2 = __importDefault(require("./handlers/user"));
const jwt_1 = __importDefault(require("./middleware/jwt"));
const content_1 = __importDefault(require("./repositories/content"));
const content_2 = __importDefault(require("./handlers/content"));
const PORT = Number(process.env.PORT || 8888);
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
const userRepo = new user_1.default(client);
const contentRepo = new content_1.default(client);
const userHandler = new user_2.default(userRepo);
const contentHandler = new content_2.default(contentRepo);
const jwtMiddleware = new jwt_1.default();
app.use(express_1.default.json());
app.get("/", jwtMiddleware.auth, (req, res) => {
    console.log(res.locals);
    return res.status(200).send("Welcome To LearnHub");
});
const userRouter = express_1.default.Router();
app.use("/user", userRouter);
userRouter.post("/", userHandler.registration);
const authRouter = express_1.default.Router();
app.use("/auth", authRouter);
authRouter.post("/login", userHandler.login);
authRouter.get("/me", jwtMiddleware.auth, userHandler.selfcheck);
const contentRouter = express_1.default.Router();
app.use("/content", contentRouter);
contentRouter.post("/", jwtMiddleware.auth, contentHandler.createContent);
app.listen(PORT, () => {
    console.log(`LearHub API is up at ${PORT}`);
});
