import emailjs from "@emailjs/browser";

const EMAIL_SERVICE_ID = "service_np274dk";
const EMAIL_TEMPLATE_ID = "template_8hevesq";
const EMAIL_PUBLIC_KEY = "ITpVsQKr0ZXKmzw_y";

export const sendEmail = async (to, subject, message) => {
  try {
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      {
        to_email: to,
        subject: subject,
        message: message,
      },
      EMAIL_PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};
