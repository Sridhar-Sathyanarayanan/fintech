import { NextFunction, Request, Response } from "express";
import mailServices from "../services/mail.services.ts";

export default (router: any) => {
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
        res.status(e.status || 500).send(e.message || e)
      }
    }
  );
};
