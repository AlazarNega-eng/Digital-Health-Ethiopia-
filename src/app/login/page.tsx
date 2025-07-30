"use client";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import Link from "next/link";
import { User, Lock, Download, FileText, Info, Settings, Bell, Calendar, UserCircle } from "lucide-react";

const roles = ["User", "Doctor", "Secretary"];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  return (
    <div className="min-h-screen flex flex-col bg-[#f7fafd]">
      {/* Top Nav */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-yellow-400 flex items-center justify-center text-white font-bold text-xl shadow">
            <span>ET</span>
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight">TenaID</span>
        </div>
        <nav className="flex-1 flex items-center justify-center gap-8">
          <Link href="#" className="text-base font-medium text-gray-700 hover:text-primary">My Records</Link>
          <Link href="#" className="text-base font-medium text-gray-700 hover:text-primary">Doctors & Facilities</Link>
          <Link href="#" className="text-base font-medium text-gray-700 hover:text-primary">Emergency Access</Link>
          <Link href="#" className="text-base font-medium text-gray-700 hover:text-primary">Appointments</Link>
          <Link href="#" className="text-base font-medium text-gray-700 hover:text-primary">Settings</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="rounded-lg px-5">Settings</Button>
          <UserCircle className="w-7 h-7 text-gray-500" />
        </div>
      </header>
      <main className="flex flex-1 w-full">
        {/* Left Panel */}
        <aside className="w-[340px] text-white flex flex-col justify-between p-8 rounded-tr-3xl rounded-br-3xl relative overflow-hidden" style={{ backgroundImage: 'url(/sidebar-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div>
            <h2 className="text-lg font-semibold mb-2">Secure your</h2>
            <p className="mb-6 text-sm">Enter Fayda ID</p>
            <div className="mb-4">
              <Input placeholder="A Fayda ID" className="bg-white/90 text-gray-900 placeholder:text-gray-400" />
            </div>
            {/* Dropdown for role selection */}
            <div className="mb-4">
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <Button variant="destructive" className="w-full rounded-lg">Login</Button>
          </div>
          <div className="absolute bottom-8 left-8">
            {/* Stethoscope SVG or icon */}
            <svg width="60" height="60" fill="none" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="#FFD600"/><path d="M20 35c0 5.523 4.477 10 10 10s10-4.477 10-10" stroke="#1B5E20" strokeWidth="2"/><path d="M30 45v5" stroke="#1B5E20" strokeWidth="2"/><circle cx="20" cy="35" r="2" fill="#1B5E20"/><circle cx="40" cy="35" r="2" fill="#1B5E20"/></svg>
          </div>
        </aside>
        {/* Main Content */}
        <section className="flex-1 flex flex-col items-center justify-center py-16 px-8 gap-8 relative">
          <h1 className="text-3xl font-bold mb-2">Welcome visits</h1>
          <p className="mb-8 text-lg text-gray-500">Enter your <span className="font-semibold text-primary">Fayda</span> In Dassward</p>
          <div className="flex gap-8 mb-8">
            {/* Fayda Password Card */}
            <Card className="w-56 h-32 flex flex-col items-center justify-center gap-2 shadow-lg">
              <User className="w-8 h-8 text-primary" />
              <div className="font-semibold">Fayda Password</div>
              <div className="text-xs text-gray-400">Pownword</div>
            </Card>
            {/* Downwiptions Card */}
            <Card className="w-56 h-32 flex flex-col items-center justify-center gap-2 shadow-lg bg-green-100">
              <Download className="w-8 h-8 text-green-700" />
              <div className="font-semibold">Downiptions</div>
            </Card>
            {/* Download Card */}
            <Card className="w-56 h-32 flex flex-col items-center justify-center gap-2 shadow-lg bg-red-100">
              <FileText className="w-8 h-8 text-red-700" />
              <div className="font-semibold">Download</div>
            </Card>
          </div>
          {/* Recent Medical Visits Card */}
          <Card className="w-[420px] flex flex-row items-center justify-between p-6 shadow-lg bg-white">
            <div className="flex items-center gap-4">
              <User className="w-10 h-10 text-primary" />
              <div>
                <div className="font-semibold">Recent Medical visits</div>
                <div className="text-xs text-gray-400">Prescriptions</div>
              </div>
            </div>
            <Button variant="destructive" className="rounded-lg">Downiptions</Button>
          </Card>
          {/* User Info Card (floating, right) */}
          <div className="absolute right-8 top-8">
            <Card className="w-64 p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-10 h-10 text-primary" />
                <div>
                  <div className="font-semibold">Name Nlite</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between"><span>Photo</span><span>7000%</span></div>
                <div className="flex justify-between"><span>Age</span><span>0106%</span></div>
                <div className="flex justify-between"><span>Sterinfaad</span><span>??22%</span></div>
                <div className="flex justify-between"><span>Blood Type</span><span>24%</span></div>
              </div>
              <Button variant="secondary" className="w-full mt-4">Aode Info</Button>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
} 