import { NextFunction, Request, Response, Router } from "express";
import mailServices from "../services/mail.services";

export default (router: Router) => {
  router.post(
    "/feedback/sendMail",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await mailServices.sendEmail(req.body);
        res.json({
          status: 200,
          data: { message: "Message sent successfully" },
        });
      } catch (e) {
        const error = e instanceof Error ? e : new Error(String(e));
        const statusCode = (e as { status?: number }).status || 500;
        res.status(statusCode).send(error.message || error);
        next(error);
      }
    }
  );
};
