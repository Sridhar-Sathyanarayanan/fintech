import { NextFunction, Request, Response, Router } from "express";
import mailServices from "../services/mail.services.js";

export default (router: Router) => {
  router.post(
    "/send",
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
        res.status(statusCode).json({
          status: statusCode,
          error: error.message || 'Failed to send email'
        });
        next(error);
      }
    }
  );

  return router;
};
