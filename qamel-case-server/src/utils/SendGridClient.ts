import sgMail from "@sendgrid/mail";
import { config } from "dotenv-safe";

config();

export const sg = sgMail;
sg.setApiKey(process.env.SENDGRID_API_KEY);