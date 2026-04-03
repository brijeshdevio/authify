import { env } from "../config/env";

type ResetPassword = {
  token: string;
};

export const resetPasswordTemplate = ({ token }: ResetPassword) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reset your password</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
    <tr>
      <td align="center">

        <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">

            <!-- Header -->
          <tr>
            <td style="background:#4f46e5; color:#ffffff; text-align:center; padding:20px;">
              <h1 style="margin:0; font-size:22px;">Authify</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333;">
              <h2 style="margin-top:0;">Reset your password</h2>
              <p style="line-height:1.6;">
                We received a request to reset your password. If you didn't make this request, you can ignore this email.
              </p>
              <p style="line-height:1.6;">
                To reset your password, click the button below.
              </p>
              <p style="line-height:1.6;">
                <a href="${env.FRONTEND}/auth/reset-password/${token}" style="background-color:#4f46e5; color:#ffffff; padding:10px 20px; display:block; text-decoration:none;width:fit-content;margin:10px auto;">Reset Password</a>
              </p>
              <p style="line-height:1.6;">
                If you didn't request a password reset, you can safely ignore this email.
              </p>
            </td>
          </tr>

         <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; text-align:center; padding:15px; font-size:12px; color:#888;">
              © 2026 Authify. All rights reserved.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
