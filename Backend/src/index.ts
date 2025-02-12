import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.config";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);


app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
    `/`, (req: Request, res: Response) => { 
        res.send('Hello World');
        console.log('Hello World');
    }
//   asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     throw new BadRequestException(
//       "This is a bad request",
//       ErrorCodeEnum.AUTH_INVALID_TOKEN
//     );
//     return res.status(HTTPSTATUS.OK).json({
//       message: "Hello Subscribe to the channel & share",
//     });
//   })
);


app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
//   await connectDatabase();
});