import sgMail from "@sendgrid/mail";

export const sg = sgMail;
sg.setApiKey(process.env.SENDGRID_API_KEY);