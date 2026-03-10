import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import nodemailer from "nodemailer";

// GET — fetch booked slots for a given date
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date");

        if (!date) {
            return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const bookings = await db
            .collection("bookings")
            .find({ date })
            .project({ time: 1, _id: 0 })
            .toArray();

        const bookedSlots = bookings.map((b) => b.time);
        return NextResponse.json({ bookedSlots });
    } catch {
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}

// POST — create a new booking
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, date, time } = body;

        if (!name || !email || !date || !time) {
            return NextResponse.json(
                { error: "All fields are required: name, email, date, time" },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();

        // Check for duplicate booking
        const existing = await db.collection("bookings").findOne({ date, time });
        if (existing) {
            return NextResponse.json(
                { error: "This time slot is already booked. Please choose another." },
                { status: 409 }
            );
        }

        // Save booking
        await db.collection("bookings").insertOne({
            name,
            email,
            date,
            time,
            createdAt: new Date(),
        });

        // Send confirmation email
        const meetLink = process.env.GOOGLE_MEET_LINK || "https://meet.google.com";

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email to the person booking
        try {
            await transporter.sendMail({
                from: `"Prashant Kumar" <${process.env.SMTP_USER}>`,
                to: email,
                replyTo: process.env.SMTP_USER,
                subject: `Meeting Confirmed — ${date} at ${time}`,
                html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1a1a1a; border-radius: 16px; overflow: hidden; border: 1px solid #e5e5e5;">
                        <div style="background: linear-gradient(135deg, #8b5cf6, #6366f1); padding: 40px 32px; text-align: center;">
                            <h1 style="margin: 0 0 8px; font-size: 28px; color: #ffffff;">Meeting Confirmed ✅</h1>
                            <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 15px;">Your portfolio call has been scheduled</p>
                        </div>
                        <div style="padding: 32px;">
                            <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; border: 1px solid #e9ecef;">
                                <p style="margin: 0 0 16px; font-size: 14px; color: #333;"><strong style="color: #8b5cf6;">👤 Name:</strong> ${name}</p>
                                <p style="margin: 0 0 16px; font-size: 14px; color: #333;"><strong style="color: #8b5cf6;">📅 Date:</strong> ${date}</p>
                                <p style="margin: 0 0 16px; font-size: 14px; color: #333;"><strong style="color: #8b5cf6;">⏰ Time:</strong> ${time} IST</p>
                                <p style="margin: 0; font-size: 14px; color: #333;"><strong style="color: #8b5cf6;">🎥 Google Meet:</strong> <a href="${meetLink}" style="color: #6366f1; text-decoration: underline;">${meetLink}</a></p>
                            </div>
                            <div style="text-align: center; margin-top: 24px;">
                                <a href="${meetLink}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #6366f1); color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">Join Google Meet</a>
                            </div>
                            <p style="text-align: center; margin: 24px 0 0; color: #999; font-size: 13px;">— Prashant Kumar</p>
                        </div>
                    </div>
                `,
            });
            console.log("✅ Confirmation email sent to:", email);
        } catch (emailErr) {
            console.error("❌ Failed to send email to booker:", emailErr);
        }

        // Notification email to yourself
        try {
            await transporter.sendMail({
                from: `"Portfolio Booking" <${process.env.SMTP_USER}>`,
                to: process.env.SMTP_USER!,
                subject: `New Booking: ${name} — ${date} at ${time}`,
                html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1a1a1a; border-radius: 16px; overflow: hidden; border: 1px solid #e5e5e5;">
                        <div style="background: linear-gradient(135deg, #8b5cf6, #6366f1); padding: 32px; text-align: center;">
                            <h1 style="margin: 0; font-size: 24px; color: #ffffff;">New Booking Received 📅</h1>
                        </div>
                        <div style="padding: 32px;">
                            <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; border: 1px solid #e9ecef;">
                                <p style="margin: 0 0 14px; font-size: 14px; color: #333;"><strong>👤 Name:</strong> ${name}</p>
                                <p style="margin: 0 0 14px; font-size: 14px; color: #333;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #6366f1;">${email}</a></p>
                                <p style="margin: 0 0 14px; font-size: 14px; color: #333;"><strong>📅 Date:</strong> ${date}</p>
                                <p style="margin: 0 0 14px; font-size: 14px; color: #333;"><strong>⏰ Time:</strong> ${time} IST</p>
                                <p style="margin: 0; font-size: 14px; color: #333;"><strong>🎥 Meet Link:</strong> <a href="${meetLink}" style="color: #6366f1;">${meetLink}</a></p>
                            </div>
                            <div style="text-align: center; margin-top: 24px;">
                                <a href="${meetLink}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #6366f1); color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">Open Meet Link</a>
                            </div>
                        </div>
                    </div>
                `,
            });
            console.log("✅ Notification email sent to host");
        } catch (emailErr) {
            console.error("❌ Failed to send notification email to host:", emailErr);
        }

        return NextResponse.json({ success: true, message: "Meeting booked successfully!" });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json({ error: "Failed to book meeting" }, { status: 500 });
    }
}
