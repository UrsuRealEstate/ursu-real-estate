'use server'

import nodemailer from 'nodemailer'
import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

type State = { error?: string; success?: boolean }

export async function submitInquiry(
  _prev: State | undefined,
  formData: FormData,
): Promise<State> {
  const name           = (formData.get('name')           as string | null)?.trim() ?? ''
  const email          = (formData.get('email')          as string | null)?.trim() ?? ''
  const phone          = (formData.get('phone')          as string | null)?.trim() || null
  const message        = (formData.get('message')        as string | null)?.trim() || null
  const property_title = (formData.get('property_title') as string | null)?.trim() || null
  const lang           = (formData.get('lang')           as string | null) ?? 'en'

  if (!name || !email) return { error: 'Name and email are required' }

  // 1. Save to DB
  const admin = createAdminClient()
  const { error: dbError } = await admin
    .from('inquiries')
    .insert({ name, email, phone, message, property_title, lang })

  if (dbError) {
    console.error('[inquiry] db error:', dbError)
    return { error: 'Failed to save inquiry. Please try again.' }
  }

  // 2. Send email (non-fatal — DB record is already saved)
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const subject = property_title
      ? `New inquiry — ${property_title}`
      : 'New inquiry from URSU Real Estate'

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ursurealestate.com'
    const submittedAt = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome', dateStyle: 'long', timeStyle: 'short' })

    const rows = [
      { label: 'Name',     value: name,                    always: true  },
      { label: 'Email',    value: `<a href="mailto:${email}" style="color:#4a5d47;text-decoration:none">${email}</a>`, always: true },
      { label: 'Phone',    value: phone    ? `<a href="tel:${phone}" style="color:#4a5d47;text-decoration:none">${phone}</a>` : null, always: false },
      { label: 'Property', value: property_title,           always: false },
      { label: 'Message',  value: message?.replace(/\n/g, '<br>'),        always: false },
    ]

    const tableRows = rows
      .filter(r => r.always || r.value)
      .map((r, i) => `
        <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f7f6f3'}">
          <td style="padding:14px 20px;width:110px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#8a9e87;white-space:nowrap;vertical-align:top">${r.label}</td>
          <td style="padding:14px 20px;font-size:14px;color:#1a2419;line-height:1.6;vertical-align:top">${r.value}</td>
        </tr>
      `).join('')

    await transporter.sendMail({
      from: `"URSU Real Estate" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO ?? process.env.SMTP_USER,
      subject,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#eeecea;font-family:Georgia,'Times New Roman',serif">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#eeecea;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- HEADER -->
        <tr>
          <td style="background:#283027;padding:36px 40px;text-align:center">
            <img src="${siteUrl}/ursu-logo5.png" alt="URSU Real Estate" width="200" style="display:block;margin:0 auto;width:200px;height:auto;border:0">
          </td>
        </tr>

        <!-- ACCENT LINE -->
        <tr><td style="height:4px;background:linear-gradient(90deg,#4a5d47,#8aa882)"></td></tr>

        <!-- TITLE BAR -->
        <tr>
          <td style="background:#ffffff;padding:32px 40px 0">
            <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#8a9e87;font-family:Arial,sans-serif">URSU Real Estate</p>
            <h1 style="margin:0 0 6px;font-size:22px;font-weight:400;color:#1a2419;font-family:Georgia,serif">New Property Inquiry</h1>
            <p style="margin:0 0 28px;font-size:12px;color:#aaa;font-family:Arial,sans-serif">${submittedAt}</p>
            <hr style="border:none;border-top:1px solid #e8e5e0;margin:0">
          </td>
        </tr>

        <!-- DATA TABLE -->
        <tr>
          <td style="background:#ffffff;padding:0">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
              ${tableRows}
            </table>
          </td>
        </tr>

        <!-- REPLY BUTTON -->
        <tr>
          <td style="background:#ffffff;padding:28px 40px 36px;text-align:center">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
               style="display:inline-block;padding:13px 36px;background:#283027;color:#ffffff;font-size:12px;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none">
              Reply to ${name}
            </a>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#f7f6f3;border-top:1px solid #e8e5e0;padding:20px 40px;text-align:center">
            <p style="margin:0;font-size:11px;color:#aaa;font-family:Arial,sans-serif">
              © ${new Date().getFullYear()} URSU Real Estate &nbsp;·&nbsp;
              <a href="${siteUrl}" style="color:#8a9e87;text-decoration:none">ursurealestate.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`,
    })
  } catch (emailErr) {
    console.error('[inquiry] email error:', emailErr)
    // non-fatal: inquiry is already in DB
  }

  revalidatePath('/admin')
  revalidatePath('/admin/inquiries')
  return { success: true }
}
