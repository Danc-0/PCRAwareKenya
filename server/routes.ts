import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail, EMAIL_CONFIG, EMAIL_BODY } from "./mail";
import { log } from "./index";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/send-submission", async (req, res) => {
    try {
      const { senderName, senderId } = req.body;
      
      const personalizedBody = EMAIL_BODY + `\n\nSincerely,\n${senderName || "[Your Name]"}\n${senderId || "[ID Number]"}`;
      
      const attachmentContent = Buffer.from(personalizedBody, "utf8").toString("base64");
      
      const result = await sendEmail({
        to: EMAIL_CONFIG.recipient,
        bcc: EMAIL_CONFIG.bcc,
        subject: EMAIL_CONFIG.subject,
        text: `Dear Director General,\n\nPlease find attached my citizen submission on the Draft Private Security Regulations, 2025.\n\nI respectfully request that these recommendations be considered during the public participation process.\n\nSincerely,\n${senderName || "[Your Name]"}\n${senderId || "[ID Number]"}`,
        attachments: [
          {
            filename: "PSRA_Citizen_Submission_2025.txt",
            content: attachmentContent,
            contentType: "text/plain",
            encoding: "base64",
          },
        ],
      });
      
      log(`Email sent successfully to ${EMAIL_CONFIG.recipient}`);
      res.json({ ok: true, messageId: result.messageId });
    } catch (error: any) {
      log(`Failed to send email: ${error.message}`);
      res.status(500).json({ ok: false, error: error.message || "Failed to send email" });
    }
  });

  return httpServer;
}
