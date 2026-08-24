type QuoteRequest = Record<string, unknown>;

const RECIPIENTS = {
  to: ["info@motzfarm.com"],
  cc: ["darryl@motzfarm.com", "chrissy@motzfarm.com", "gene@motzfarm.com"],
};
const FROM = "Motz Turf Farms <quotes@notifications.motzfarm.com>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function field(label: string, value: string) {
  return `<tr><td style="padding:8px 14px 8px 0;color:#5b665f;font-size:13px;vertical-align:top">${label}</td><td style="padding:8px 0;color:#123d2a;font-size:15px;font-weight:600">${escapeHtml(value)}</td></tr>`;
}

export async function POST(request: Request) {
  let body: QuoteRequest;
  try {
    body = (await request.json()) as QuoteRequest;
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const quote = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 160).toLowerCase(),
    phone: clean(body.phone, 40),
    address: clean(body.address, 240),
    service: clean(body.service, 120),
    timeline: clean(body.timeline, 80),
    details: clean(body.details, 4000),
  };

  if (!quote.firstName || !quote.lastName || !EMAIL_PATTERN.test(quote.email) || !quote.phone || !quote.address || !quote.service || !quote.timeline || !quote.details) {
    return Response.json({ error: "Please complete every required field." }, { status: 400 });
  }

  const runtimeGlobal = globalThis as typeof globalThis & { __MOTZ_RESEND_API_KEY__?: string };
  const resendApiKey = runtimeGlobal.__MOTZ_RESEND_API_KEY__ || process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not configured");
    return Response.json({ error: "Email delivery is not configured yet." }, { status: 503 });
  }

  const name = `${quote.firstName} ${quote.lastName}`;
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "long",
    timeStyle: "short",
  });

  const internalHtml = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;padding:28px;color:#173c2b">
      <p style="margin:0 0 8px;color:#9b7a13;font-size:12px;letter-spacing:2px;text-transform:uppercase">New website inquiry</p>
      <h1 style="margin:0 0 24px;font-size:28px">${escapeHtml(name)} requested a quote</h1>
      <table role="presentation" style="border-collapse:collapse;width:100%">
        ${field("Email", quote.email)}${field("Phone", quote.phone)}${field("Project address", quote.address)}
        ${field("Service", quote.service)}${field("Ideal timing", quote.timeline)}${field("Submitted", submittedAt)}
      </table>
      <div style="margin-top:22px;padding:20px;background:#f4f5ef;border-left:4px solid #b89018">
        <p style="margin:0 0 8px;color:#5b665f;font-size:13px">Project details</p>
        <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(quote.details)}</p>
      </div>
      <p style="margin-top:24px;font-size:13px;color:#5b665f">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
    </div>`;

  const confirmationHtml = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;padding:32px;color:#173c2b">
      <p style="margin:0 0 8px;color:#9b7a13;font-size:12px;letter-spacing:2px;text-transform:uppercase">Motz Turf Farms</p>
      <h1 style="margin:0 0 18px;font-size:30px">We received your request.</h1>
      <p style="font-size:16px;line-height:1.7">Hi ${escapeHtml(quote.firstName)}, thank you for telling us about your ${escapeHtml(quote.service.toLowerCase())} project. A member of our Cincinnati team will review the details and follow up with you.</p>
      <div style="margin:24px 0;padding:18px 20px;background:#f4f5ef;border-left:4px solid #b89018">
        <strong>Project address</strong><br />${escapeHtml(quote.address)}<br /><br />
        <strong>Ideal timing</strong><br />${escapeHtml(quote.timeline)}
      </div>
      <p style="font-size:15px;line-height:1.6">Need to add something? Call us at <a href="tel:+15132314844" style="color:#173c2b;font-weight:700">513-231-4844</a> or reply to this email.</p>
      <p style="margin-top:30px;color:#5b665f;font-size:13px">Motz Turf Farms · 6280 Clough Pike · Cincinnati, Ohio</p>
    </div>`;

  const resendResponse = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        from: FROM,
        to: RECIPIENTS.to,
        cc: RECIPIENTS.cc,
        reply_to: quote.email,
        subject: `New quote request: ${quote.service} — ${name}`,
        html: internalHtml,
      },
      {
        from: FROM,
        to: [quote.email],
        reply_to: "info@motzfarm.com",
        subject: "We received your Motz Turf Farms quote request",
        html: confirmationHtml,
      },
    ]),
  });

  if (!resendResponse.ok) {
    const error = await resendResponse.text();
    console.error("Resend quote delivery failed", resendResponse.status, error);
    return Response.json({ error: "We could not send your request. Please call 513-231-4844." }, { status: 502 });
  }

  return Response.json({ success: true });
}
