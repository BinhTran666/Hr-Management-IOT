import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
  } catch (error) {
    console.error("Error sending verification0", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password Reset",
    });
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};


export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try{
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    })
  } catch (error) {
    console.error("Error sending reset success email", error);
    throw new Error(`Failed to send reset success email: ${error.message}`);
  }
};

export const sendCheckInEmail = async (email, checkInTime) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Check-in successful",
      html: `You have successfully checked in at ${checkInTime}`,
      category: "Check-in",
    });
  } catch (error) {
    console.error("Error sending check-in email", error);
    throw new Error(`Failed to send check-in email: ${error.message}`);
  }
};

