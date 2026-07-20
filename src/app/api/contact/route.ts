import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Enquiry intake for the contact form, the consultation request and the
 * newsletter.
 *
 * Requires SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS, and optionally
 * ENQUIRY_TO and ENQUIRY_FROM. Without them the route refuses enquiries in
 * production rather than accepting and dropping them — a lost private client
 * enquiry is worse than a visible error.
 */

const TO = process.env.ENQUIRY_TO ?? "privateclients@tide-global.com";
const FROM = process.env.ENQUIRY_FROM ?? "no-reply@tide-global.com";

type Payload = Record<string, string | undefined> & { kind?: string };

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Telephone",
  country: "Country of residence",
  subject: "Subject",
  interest: "Area of interest",
  timeline: "Intended timeline",
  preferredTime: "Preferred contact time",
  message: "Message",
};

function smtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT ?? 587);
  return {
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function subjectFor(kind: string, name?: string) {
  if (kind === "newsletter") return "New newsletter subscription";
  if (kind === "consultation") return `Consultation request — ${name ?? "unnamed"}`;
  return `Website enquiry — ${name ?? "unnamed"}`;
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const kind = body.kind ?? "contact";

  if (!body.email?.includes("@")) {
    return NextResponse.json(
      { success: false, message: "A valid email address is required." },
      { status: 400 },
    );
  }
  if (kind !== "newsletter" && !body.name?.trim()) {
    return NextResponse.json({ success: false, message: "A name is required." }, { status: 400 });
  }

  const rows = Object.entries(LABELS)
    .filter(([key]) => body[key]?.trim())
    .map(([key, label]) => ({ label, value: body[key]!.trim() }));

  const config = smtpConfig();

  if (!config) {
    // Dev convenience only. In production an unconfigured mailer must surface.
    if (process.env.NODE_ENV === "production") {
      console.error("[enquiry] SMTP is not configured — enquiry rejected.", { kind });
      return NextResponse.json(
        { success: false, message: "Enquiries are temporarily unavailable." },
        { status: 503 },
      );
    }
    console.warn("[enquiry] SMTP not configured; logging instead of sending.", { kind, ...body });
    return NextResponse.json({ success: true, delivered: false });
  }

  try {
    const transporter = nodemailer.createTransport(config);

    await transporter.sendMail({
      from: `"Tide Global — website" <${FROM}>`,
      to: TO,
      replyTo: body.email,
      subject: subjectFor(kind, body.name),
      text: rows.map((r) => `${r.label}: ${r.value}`).join("\n"),
      html: rows
        .map(
          (r) =>
            `<p style="margin:0 0 12px"><strong>${r.label}:</strong><br>${escapeHtml(
              r.value,
            ).replace(/\n/g, "<br>")}</p>`,
        )
        .join(""),
    });

    return NextResponse.json({ success: true, delivered: true });
  } catch (error) {
    console.error("[enquiry] Delivery failed.", error);
    return NextResponse.json(
      { success: false, message: "We could not send your enquiry." },
      { status: 502 },
    );
  }
}
