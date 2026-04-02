import { env } from "../config/env";

type Verification = {
  token: string;
};

export const verificationTemplate = ({ token }: Verification) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your Email</title>
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
              <h2 style="margin-top:0;">Verify your email</h2>
              <p style="line-height:1.6;">
                Thanks for signing up! Please confirm your email address by clicking the button below.
              </p>

              <!-- CTA Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="${env.FRONTEND}/auth/verify-email/${token}"
                   style="background:#4f46e5; color:#ffffff; text-decoration:none; padding:12px 20px; border-radius:5px; font-weight:bold; display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="line-height:1.6;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>

              <p style="word-break:break-all; color:#4f46e5;">
             ${env.FRONTEND}/auth/verify-email/${token}
              </p>

              <p style="margin-top:30px; font-size:12px; color:#888;">
                If you didn’t create an account, you can safely ignore this email.
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
