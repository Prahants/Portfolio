"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Mail,
    Clock,
    Video,
    Globe,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    User,
    ArrowLeft,
    Loader2,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

// ─── Helpers ─────────────────────────────────────────────

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const TIME_SLOTS = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isToday(year: number, month: number, day: number) {
    const now = new Date();
    return now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;
}

function to12h(time: string) {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function isPast(year: number, month: number, day: number) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const target = new Date(year, month, day);
    return target < now;
}

// ─── Main Component ──────────────────────────────────────

export default function BookCallPage() {
    const now = new Date();
    const [currentMonth, setCurrentMonth] = useState(now.getMonth());
    const [currentYear, setCurrentYear] = useState(now.getFullYear());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [timeFormat, setTimeFormat] = useState<"24h" | "12h">("12h");

    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch booked slots when date changes
    const fetchBookedSlots = useCallback(async (date: string) => {
        setLoadingSlots(true);
        try {
            const res = await fetch(`/api/book?date=${date}`);
            const data = await res.json();
            setBookedSlots(data.bookedSlots || []);
        } catch {
            setBookedSlots([]);
        } finally {
            setLoadingSlots(false);
        }
    }, []);

    useEffect(() => {
        if (selectedDate) {
            fetchBookedSlots(selectedDate);
            setSelectedTime(null);
        }
    }, [selectedDate, fetchBookedSlots]);

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleSubmit = async () => {
        if (!selectedDate || !selectedTime || !formName || !formEmail) return;

        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formName,
                    email: formEmail,
                    date: selectedDate,
                    time: selectedTime,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            setSuccess(true);
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Calendar grid
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const calendarCells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) calendarCells.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

    const isPrevDisabled =
        currentYear === now.getFullYear() && currentMonth <= now.getMonth();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-purple-600/[0.07] rounded-full blur-[180px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[150px]" />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/[0.04] rounded-full blur-[120px]" />
                {/* Subtle noise texture */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-50" />
            </div>

            {/* Back button */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 text-sm group"
            >
                <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    <ArrowLeft size={14} />
                </div>
                <span className="hidden sm:inline">Back to Portfolio</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[1100px]"
            >
                {/* Success State */}
                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-3xl bg-[#0d1117]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_0_80px_rgba(139,92,246,0.08)] p-12 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle size={40} className="text-green-400" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-white mb-3 font-heading">
                                Meeting Booked Successfully!
                            </h2>
                            <p className="text-white/50 text-base mb-2">
                                You will receive the Google Meet link via email.
                            </p>
                            <p className="text-white/30 text-sm mb-8">
                                {selectedDate} at {selectedTime} IST • 30 min session
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
                            >
                                <ArrowLeft size={16} />
                                Back to Portfolio
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="booking"
                            className="rounded-3xl bg-[#0d1117]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_0_80px_rgba(139,92,246,0.08)] overflow-hidden"
                        >
                            {/* Top accent gradient line */}
                            <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

                            {/* Main 3-panel layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_260px]">
                                {/* ─── Left Panel — Profile ─── */}
                                <div className="p-7 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] relative">
                                    {/* Subtle panel glow */}
                                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/[0.03] to-transparent pointer-events-none rounded-tl-3xl" />

                                    {/* Avatar with glow ring */}
                                    <div className="relative w-20 h-20 mb-6">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/30 blur-md" />
                                        <img
                                            src="/Prashant.png"
                                            alt="Prashant Kumar"
                                            className="relative w-20 h-20 rounded-full object-cover border-2 border-purple-500/40 ring-4 ring-purple-500/10"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0d1117] flex items-center justify-center">
                                            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold text-white mb-10 font-heading tracking-tight">
                                        Prashant Kumar
                                    </h2>

                                    {/* Detail pills */}
                                    <div className="space-y-2.5">
                                        {[
                                            { icon: <CheckCircle size={14} />, text: "Confirmation required", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                                            { icon: <Clock size={14} />, text: "30 min session", color: "text-purple-400", bg: "bg-purple-500/10" },
                                            { icon: <Video size={14} />, text: "Google Meet", color: "text-blue-400", bg: "bg-blue-500/10" },
                                            { icon: <Globe size={14} />, text: "Asia/Kolkata", color: "text-amber-400", bg: "bg-amber-500/10" },
                                        ].map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + i * 0.05 }}
                                                className="flex items-center gap-3 text-[13px] text-white/50"
                                            >
                                                <div className={`p-1.5 rounded-lg ${item.bg}`}>
                                                    <span className={item.color}>{item.icon}</span>
                                                </div>
                                                <span>{item.text}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* ─── Center Panel — Calendar ─── */}
                                <div className="p-7 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                                    <div className="flex items-center gap-2 mb-5">
                                        <Calendar size={14} className="text-purple-400" />
                                        <p className="text-[11px] font-bold tracking-[0.15em] text-white/40 uppercase">
                                            Select a Date
                                        </p>
                                    </div>

                                    {/* Month navigation */}
                                    <div className="flex items-center justify-between mb-6">
                                        <button
                                            onClick={handlePrevMonth}
                                            disabled={isPrevDisabled}
                                            className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 outline-none border border-white/[0.05]"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <span className="text-white font-semibold text-[15px] tracking-wide font-heading">
                                            {MONTHS[currentMonth]} {currentYear}
                                        </span>
                                        <button
                                            onClick={handleNextMonth}
                                            className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-white/50 hover:text-white transition-all duration-200 outline-none border border-white/[0.05]"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>

                                    {/* Day headers */}
                                    <div className="grid grid-cols-7 gap-1 mb-3">
                                        {DAYS.map((day) => (
                                            <div
                                                key={day}
                                                className="text-center text-[11px] font-semibold text-white/25 uppercase py-1"
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Calendar grid */}
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {calendarCells.map((day, idx) => {
                                            if (day === null) {
                                                return <div key={`empty-${idx}`} className="aspect-square" />;
                                            }

                                            const dateStr = formatDate(currentYear, currentMonth, day);
                                            const past = isPast(currentYear, currentMonth, day);
                                            const today = isToday(currentYear, currentMonth, day);
                                            const selected = selectedDate === dateStr;
                                            const isSunday = new Date(currentYear, currentMonth, day).getDay() === 0;

                                            return (
                                                <button
                                                    key={dateStr}
                                                    disabled={past || isSunday}
                                                    onClick={() => setSelectedDate(dateStr)}
                                                    className={`
                                                        aspect-square rounded-xl flex items-center justify-center text-[13px] font-medium transition-all duration-200 outline-none relative
                                                        ${past || isSunday
                                                            ? "text-white/10 cursor-not-allowed"
                                                            : selected
                                                                ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] font-semibold"
                                                                : today
                                                                    ? "text-purple-300 hover:bg-white/[0.06]"
                                                                    : "text-white/60 hover:bg-white/[0.06] hover:text-white cursor-pointer"
                                                        }
                                                    `}
                                                >
                                                    {day}
                                                    {today && !selected && (
                                                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* ─── Right Panel — Time Slots ─── */}
                                <div className="p-7 lg:p-8">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-purple-400" />
                                            <p className="text-[12px] font-bold tracking-[0.15em] text-white/40 uppercase">
                                                Available Slots
                                            </p>
                                        </div>
                                        {/* 24H / 12H toggle */}
                                        <div className="flex items-center rounded-md bg-white/[0.04] border border-white/[0.08] p-0.5">
                                            <button
                                                onClick={() => setTimeFormat("24h")}
                                                className={`px-2 py-0.5 rounded text-[9px] font-semibold transition-all duration-200 outline-none ${timeFormat === "24h"
                                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                                    : "text-white/35 hover:text-white/60 border border-transparent"
                                                    }`}
                                            >
                                                24H
                                            </button>
                                            <button
                                                onClick={() => setTimeFormat("12h")}
                                                className={`px-2 py-0.5 rounded text-[9px] font-semibold transition-all duration-200 outline-none ${timeFormat === "12h"
                                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                                    : "text-white/35 hover:text-white/60 border border-transparent"
                                                    }`}
                                            >
                                                12H
                                            </button>
                                        </div>
                                    </div>

                                    {!selectedDate ? (
                                        <div className="flex flex-col items-center justify-center h-[300px] text-center">
                                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] mb-4">
                                                <Calendar size={28} className="text-white/10" />
                                            </div>
                                            <p className="text-white/25 text-sm leading-relaxed">
                                                Pick a date to see<br />available time slots
                                            </p>
                                        </div>
                                    ) : loadingSlots ? (
                                        <div className="flex items-center justify-center h-[300px]">
                                            <div className="flex flex-col items-center gap-3">
                                                <Loader2 size={24} className="text-purple-400 animate-spin" />
                                                <span className="text-white/30 text-xs">Loading slots...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="grid grid-cols-1 gap-2 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar"
                                        >
                                            {TIME_SLOTS.map((time, i) => {
                                                const isBooked = bookedSlots.includes(time);
                                                const isSelected = selectedTime === time;

                                                // Disable slots that have already passed today
                                                const isTimePast = (() => {
                                                    if (!selectedDate) return false;
                                                    const today = new Date();
                                                    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
                                                    if (selectedDate !== todayStr) return false;
                                                    const [h, m] = time.split(":").map(Number);
                                                    return h < today.getHours() || (h === today.getHours() && m <= today.getMinutes());
                                                })();

                                                const isDisabled = isBooked || isTimePast;

                                                return (
                                                    <motion.button
                                                        key={time}
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.02 }}
                                                        disabled={isDisabled}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`
                                                            py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 outline-none border
                                                            ${isDisabled
                                                                ? "bg-white/[0.01] text-white/12 cursor-not-allowed line-through border-white/[0.03]"
                                                                : isSelected
                                                                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] border-purple-500/30 font-semibold"
                                                                    : "bg-white/[0.02] text-white/60 hover:bg-white/[0.06] hover:text-white hover:border-white/15 cursor-pointer border-white/[0.06]"
                                                            }
                                                        `}
                                                    >
                                                        {timeFormat === "24h" ? time : to12h(time)}
                                                    </motion.button>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* ─── Bottom — Booking Form ─── */}
                            <AnimatePresence>
                                {selectedDate && selectedTime && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="border-t border-white/[0.06] overflow-hidden"
                                    >
                                        <div className="p-7 lg:p-8">
                                            {/* Selection summary chip */}
                                            <div className="flex items-center gap-2 mb-5 flex-wrap">
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                                                    <Calendar size={12} />
                                                    {selectedDate}
                                                </div>
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                                                    <Clock size={12} />
                                                    {selectedTime} IST
                                                </div>
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/40">
                                                    <Video size={12} />
                                                    30 min
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-4 items-end">
                                                <div className="flex-1 w-full">
                                                    <label className="block text-[11px] font-bold tracking-[0.15em] text-white/35 uppercase mb-2">
                                                        Full Name
                                                    </label>
                                                    <div className="relative">
                                                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                                                        <input
                                                            type="text"
                                                            value={formName}
                                                            onChange={(e) => setFormName(e.target.value)}
                                                            placeholder="John Doe"
                                                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:bg-white/[0.04] transition-all duration-200"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-1 w-full">
                                                    <label className="block text-[11px] font-bold tracking-[0.15em] text-white/35 uppercase mb-2">
                                                        Email Address
                                                    </label>
                                                    <div className="relative">
                                                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                                                        <input
                                                            type="email"
                                                            value={formEmail}
                                                            onChange={(e) => setFormEmail(e.target.value)}
                                                            placeholder="john@example.com"
                                                            className={`w-full bg-white/[0.03] border rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:bg-white/[0.04] transition-all duration-200 ${formEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)
                                                                ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/10"
                                                                : "border-white/[0.08] focus:border-purple-500/40 focus:ring-purple-500/10"
                                                                }`}
                                                        />
                                                    </div>
                                                    {formEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail) && (
                                                        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                                            <span className="w-1 h-1 rounded-full bg-red-400" />
                                                            Invalid email address
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={submitting || !formName || !formEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)}
                                                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer group"
                                                >
                                                    {submitting ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <Calendar size={16} className="group-hover:rotate-12 transition-transform" />
                                                    )}
                                                    {submitting ? "Booking..." : "CONFIRM BOOKING"}
                                                </button>
                                            </div>

                                            {/* Error */}
                                            {error && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-400 text-sm mt-4 flex items-center gap-2"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                    {error}
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Custom scrollbar styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(139, 92, 246, 0.25);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(139, 92, 246, 0.4);
                }
            `}</style>
        </div>
    );
}
