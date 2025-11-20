import React from "react";
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#f6fbff] text-[#021220] flex flex-col font-['Poppins',_system-ui,_sans-serif]">
            {/* White container with border radius */}
            <div className="bg-white rounded-[15px] flex-1 flex flex-col overflow-hidden shadow-sm">
                {/* Top Navigation */}
                <header className="bg-white/80 backdrop-blur sticky top-0 z-20">
                    <div className="px-6 py-3 flex items-center justify-between gap-4">
                        {/* Left: View Switcher */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-1 rounded-full bg-[#eff5f9] p-1 text-xs font-medium">
                                <button className="px-3 py-1 rounded-full bg-white text-[#021220] shadow-sm">Today</button>
                                <button className="px-3 py-1 rounded-full text-[#839aac] hover:text-[#021220]">Week</button>
                                <button className="px-3 py-1 rounded-full text-[#839aac] hover:text-[#021220]">Month</button>
                                <button className="px-3 py-1 rounded-full text-[#839aac] hover:text-[#021220]">Focus</button>
                            </div>
                        </div>

                        {/* Center: Global Search */}
                        <div className="flex-1 max-w-xl hidden md:block">
                            <label className="relative block">
                                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="11" cy="11" r="6" />
                                        <path d="m16 16 4 4" />
                                    </svg>
                                </span>
                                <input
                                    type="search"
                                    placeholder="Search anything: links, events, people…"
                                    className="w-full rounded-full bg-[#eff5f9] py-2 pl-9 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </label>
                        </div>

                        {/* Right: Metrics + Actions */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                <span>Today 68% · On track</span>
                            </div>
                            <button className="inline-flex items-center gap-1 rounded-full bg-[#2e95f3] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#145589]">
                                <span className="text-lg leading-none">＋</span>
                                <span>New</span>
                            </button>
                            <button className="relative p-2 rounded-full hover:bg-slate-100">
                                <span className="sr-only">Notifications</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-slate-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M10 21h4" />
                                    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                </svg>
                                <span className="absolute right-1 top-1 inline-flex h-2 w-2 rounded-full bg-rose-500" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Layout */}
                <main className="flex-1 overflow-auto">
                    <div className="px-6 py-5 flex flex-col lg:flex-row gap-5">
                        {/* Left Panel: Today Rail */}
                        <section className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
                            {/* Today header */}
                            <div className="bg-[#eff5f9] rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-slate-400">Today</p>
                                        <p className="text-base font-semibold">Wednesday, Nov 19</p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                                        3 meetings · 2h focus
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-slate-500">
                                    <span>Working hours</span>
                                    <button className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
                                        <span className="h-3 w-3 rounded-full bg-sky-500" />
                                        <span>09:00 – 18:00</span>
                                    </button>
                                </div>
                            </div>

                            {/* Time Rail */}
                            <div className="bg-[#eff5f9] rounded-2xl p-3 shadow-sm flex flex-col gap-4">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs font-semibold text-slate-500">Timeline</p>
                                    <button className="text-[11px] text-sky-600 hover:text-sky-700 font-medium">
                                        View full day
                                    </button>
                                </div>
                                <div className="relative max-h-[480px] overflow-hidden">
                                    <div className="flex">
                                        {/* Time labels */}
                                        <div className="flex flex-col text-[10px] text-slate-400 mr-2">
                                            <span className="h-10">09:00</span>
                                            <span className="h-10">10:00</span>
                                            <span className="h-10">11:00</span>
                                            <span className="h-10">12:00</span>
                                            <span className="h-10">13:00</span>
                                            <span className="h-10">14:00</span>
                                            <span className="h-10">15:00</span>
                                            <span className="h-10">16:00</span>
                                        </div>
                                        {/* Rail */}
                                        <div className="relative flex-1">
                                            <div className="absolute inset-0 border-l border-slate-100">
                                                {/* Hour rows */}
                                                {Array.from({ length: 8 }).map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="h-10 border-t border-dashed border-slate-100"
                                                    />
                                                ))}
                                            </div>

                                            {/* Events */}
                                            <div className="relative">
                                                {/* 09:00 Team Standup */}
                                                <div className="absolute left-0 right-3 top-2 h-10 rounded-xl bg-sky-50 px-3 py-2 text-[11px] shadow-sm flex flex-col justify-center">
                                                    <p className="font-semibold text-sky-900">Team Standup</p>
                                                    <p className="text-[10px] text-sky-700">09:00 – 09:30 · 5 attendees</p>
                                                </div>

                                                {/* 10:30 Client Call */}
                                                <div className="absolute left-0 right-3 top-12 h-14 rounded-xl bg-indigo-50 px-3 py-2 text-[11px] shadow-sm flex flex-col justify-center">
                                                    <p className="font-semibold text-indigo-900">Client Call</p>
                                                    <p className="text-[10px] text-indigo-700">10:30 – 11:30 · 3 attendees</p>
                                                </div>

                                                {/* 14:00 Focus Time */}
                                                <div className="absolute left-0 right-3 top-32 h-16 rounded-xl bg-emerald-50 px-3 py-2 text-[11px] shadow-sm flex flex-col justify-center">
                                                    <p className="font-semibold text-emerald-900">Deep Focus Block</p>
                                                    <p className="text-[10px] text-emerald-700">14:00 – 16:00 · No meetings</p>
                                                </div>

                                                {/* Empty gap CTA */}
                                                <div className="absolute left-0 right-3 top-24 h-7 flex items-center justify-center">
                                                    <button className="text-[10px] rounded-full border border-dashed border-slate-300 bg-white/80 px-2 py-1 text-slate-500 hover:border-sky-400 hover:text-sky-600">
                                                        + Add focus block
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mini week bar */}
                                <div className="mt-3 border-t border-slate-100 pt-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-[11px] font-medium text-slate-500">This week</p>
                                        <button className="text-[11px] text-sky-600 hover:text-sky-700 font-medium">
                                            Compact calendar
                                        </button>
                                    </div>
                                    <div className="flex gap-2 text-[10px]">
                                        {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
                                            <button
                                                key={d + idx}
                                                className={`flex-1 rounded-xl px-1.5 py-1 flex flex-col items-center gap-0.5 ${idx === 2
                                                    ? "bg-sky-50 text-sky-700"
                                                    : "bg-slate-50 text-slate-500"
                                                    }`}
                                            >
                                                <span>{d}</span>
                                                <span className="text-[9px] font-semibold">{[3, 4, 5, 2, 3, 0, 0][idx]} ev</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Center Panel: Decision Hub */}
                        <section className="flex-1 flex flex-col gap-4">
                            {/* Decision Hub header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h1 className="text-lg font-semibold tracking-tight">Decision Hub</h1>
                                    <p className="text-xs text-slate-500 mt-1">
                                        3 items need your input · approx. 35 min to clear
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
                                        <button className="px-3 py-1 rounded-full bg-white shadow-sm font-medium text-slate-900">
                                            Requests
                                        </button>
                                        <button className="px-3 py-1 rounded-full text-slate-500 hover:text-slate-900">
                                            Links
                                        </button>
                                        <button className="px-3 py-1 rounded-full text-slate-500 hover:text-slate-900">
                                            Focus suggestions
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select className="text-xs rounded-full bg-white px-3 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500">
                                            <option>Sort by: Urgency</option>
                                            <option>Sort by: Age</option>
                                            <option>Sort by: Requester</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Request groups */}
                            <div className="space-y-4">
                                {/* Group: Now */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Now · due in next 3 hours
                                        </h2>
                                        <span className="text-[11px] text-slate-400">2 items</span>
                                    </div>

                                    {/* Card 1 */}
                                    <article className="relative overflow-hidden rounded-2xl bg-white shadow-md group">
                                        <div className="absolute inset-y-0 left-0 w-1 bg-rose-500" />
                                        <div className="p-4 pl-5 flex flex-col gap-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-sm font-semibold">Product Review with John Doe</h3>
                                                        <span className="text-[10px] rounded-full bg-rose-50 px-2 py-0.5 font-semibold text-rose-700">
                                                            Urgent
                                                        </span>
                                                        <span className="text-[10px] rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                                                            30 min
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        John Doe proposed 3 time slots this afternoon. Your calendar has a
                                                        2-hour gap from 15:00–17:00.
                                                    </p>
                                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                                                        <div className="flex items-center gap-1">
                                                            <div className="h-5 w-5 rounded-full bg-slate-200" />
                                                            <span>John Doe</span>
                                                        </div>
                                                        <span className="inline-flex items-center gap-1">
                                                            <span className="h-1 w-1 rounded-full bg-slate-400" />
                                                            Est. response time: 2 min
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-[11px] text-slate-400">Requested 1h ago</span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <button className="inline-flex items-center justify-center rounded-full bg-[#2e95f3] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#145589]">
                                                    Accept at 15:30
                                                </button>
                                                <button className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-sky-700 shadow-sm border border-[#c3d5e0]">
                                                    Offer other times
                                                </button>
                                                <button className="ml-auto inline-flex items-center justify-center rounded-full bg-white px-2.5 py-1 text-[11px] text-slate-500 shadow-sm border border-[#c3d5e0]">
                                                    View details
                                                </button>
                                            </div>
                                        </div>
                                    </article>

                                    {/* Card 2 */}
                                    <article className="relative overflow-hidden rounded-2xl bg-white shadow-md group">
                                        <div className="absolute inset-y-0 left-0 w-1 bg-amber-400" />
                                        <div className="p-4 pl-5 flex flex-col gap-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-sm font-semibold">Design Consultation with Sarah Smith</h3>
                                                        <span className="text-[10px] rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-700">
                                                            Today
                                                        </span>
                                                        <span className="text-[10px] rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                                                            60 min
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        Sarah suggested 2 slots tomorrow morning. You already have one
                                                        protected focus block.
                                                    </p>
                                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                                                        <div className="flex items-center gap-1">
                                                            <div className="h-5 w-5 rounded-full bg-pink-200" />
                                                            <span>Sarah Smith</span>
                                                        </div>
                                                        <span className="inline-flex items-center gap-1">
                                                            <span className="h-1 w-1 rounded-full bg-slate-400" />
                                                            Also invited: 2 others
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-[11px] text-slate-400">Requested 3h ago</span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <button className="inline-flex items-center justify-center rounded-full bg-[#2e95f3] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#145589]">
                                                    Book 10:00 tomorrow
                                                </button>
                                                <button className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-sky-700 shadow-sm border border-[#c3d5e0]">
                                                    Compare with focus
                                                </button>
                                                <button className="ml-auto inline-flex items-center justify-center rounded-full bg-white px-2.5 py-1 text-[11px] text-slate-500 shadow-sm border border-[#c3d5e0]">
                                                    Snooze
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                </div>

                                {/* Group: Later */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Later · flexible
                                        </h2>
                                        <button className="text-[11px] text-sky-600 hover:text-sky-700 font-medium">
                                            Collapse
                                        </button>
                                    </div>

                                    {/* Card 3 */}
                                    <article className="relative overflow-hidden rounded-2xl bg-white shadow-md group">
                                        <div className="absolute inset-y-0 left-0 w-1 bg-slate-300" />
                                        <div className="p-4 pl-5 flex flex-col gap-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-sm font-semibold">Approve updated Coffee Chat link</h3>
                                                        <span className="text-[10px] rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                                                            Asynchronous
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        Your default 30-minute coffee chat link is set to allow only
                                                        afternoons. Utilization is above 75% on Tuesdays.
                                                    </p>
                                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                                                        <span className="inline-flex items-center gap-1">
                                                            <span className="h-1 w-1 rounded-full bg-emerald-400" />
                                                            AI Suggestion: move some chats to Friday mornings
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-[11px] text-slate-400">From system</span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <button className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700">
                                                    Apply suggestion
                                                </button>
                                                <button className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm border border-[#c3d5e0]">
                                                    Review details
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </section>

                        {/* Right Panel: Insights & Actions */}
                        <section className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
                            {/* Week Health */}
                            <div className="bg-[#eff5f9] rounded-2xl p-4 shadow-sm flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-slate-400">Week health</p>
                                        <p className="text-sm font-semibold">On track</p>
                                    </div>
                                    <span className="text-[11px] text-emerald-600 font-medium">+5% vs last week</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Radial gauge placeholder */}
                                    <div className="relative h-24 w-24 flex items-center justify-center">
                                        <div className="h-24 w-24 rounded-full border-[6px] border-slate-100" />
                                        <div className="absolute h-24 w-24 rounded-full border-[6px] border-[#2e95f3] border-r-slate-100 border-b-slate-100 rotate-45" />
                                        <div className="absolute flex flex-col items-center justify-center">
                                            <span className="text-lg font-semibold">68%</span>
                                            <span className="text-[10px] text-slate-500">utilization</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-2 text-[11px]">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Events this week</span>
                                            <span className="font-semibold">12</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Completed</span>
                                            <span className="font-semibold">8</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Remaining</span>
                                            <span className="font-semibold">4</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Focus time</span>
                                            <span className="font-semibold">4h scheduled</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-1 flex flex-col gap-1 text-[10px]">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500">Mon</span>
                                        <div className="flex-1 mx-2 h-1.5 rounded-full bg-slate-100">
                                            <div className="h-1.5 rounded-full bg-sky-500 w-1/3" />
                                        </div>
                                        <span className="text-slate-500">35%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500">Tue</span>
                                        <div className="flex-1 mx-2 h-1.5 rounded-full bg-slate-100">
                                            <div className="h-1.5 rounded-full bg-sky-500 w-1/2" />
                                        </div>
                                        <span className="text-slate-500">52%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500">Wed</span>
                                        <div className="flex-1 mx-2 h-1.5 rounded-full bg-slate-100">
                                            <div className="h-1.5 rounded-full bg-sky-500 w-3/4" />
                                        </div>
                                        <span className="text-slate-500">76%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="bg-[#eff5f9] rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs uppercase tracking-wide text-slate-400">Recent activity</p>
                                    <button className="text-[11px] text-sky-600 hover:text-sky-700 font-medium">
                                        View all
                                    </button>
                                </div>
                                <div className="space-y-2 text-[11px]">
                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-slate-700">New booking from Sarah</p>
                                            <p className="text-slate-400">2 minutes ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-slate-700">Coffee Chat link updated</p>
                                            <p className="text-slate-400">1 hour ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                                <path d="M16 2v4" />
                                                <path d="M8 2v4" />
                                                <path d="M3 10h18" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-slate-700">Protected focus block added</p>
                                            <p className="text-slate-400">3 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Create */}
                            <div className="bg-[#eff5f9] rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                                <p className="text-xs uppercase tracking-wide text-slate-400">Quick create</p>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <button className="flex flex-col items-start gap-1 rounded-2xl bg-sky-50 px-3 py-3 text-left hover:bg-sky-100 shadow-sm">
                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2e95f3] text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                            </svg>
                                        </span>
                                        <span className="font-semibold">New link</span>
                                        <span className="text-[10px] text-slate-500">Share availability</span>
                                    </button>
                                    <button className="flex flex-col items-start gap-1 rounded-2xl bg-emerald-50 px-3 py-3 text-left hover:bg-emerald-100 shadow-sm">
                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                            </svg>
                                        </span>
                                        <span className="font-semibold">Protect time</span>
                                        <span className="text-[10px] text-slate-500">Block deep work</span>
                                    </button>
                                    <button className="flex flex-col items-start gap-1 rounded-2xl bg-slate-50 px-3 py-3 text-left hover:bg-slate-100 shadow-sm">
                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <path d="M16 2v4" />
                                                <path d="M8 2v4" />
                                                <path d="M3 10h18" />
                                            </svg>
                                        </span>
                                        <span className="font-semibold">New event</span>
                                        <span className="text-[10px] text-slate-500">Add a meeting</span>
                                    </button>
                                    <button className="flex flex-col items-start gap-1 rounded-2xl bg-indigo-50 px-3 py-3 text-left hover:bg-indigo-100 shadow-sm">
                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 3v18h18" />
                                                <path d="m19 9-5 5-4-4-3 3" />
                                            </svg>
                                        </span>
                                        <span className="font-semibold">Stats</span>
                                        <span className="text-[10px] text-slate-500">Weekly insights</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
