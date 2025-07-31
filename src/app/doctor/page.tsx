"use client";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { User, Stethoscope, Calendar, FileText, Bell } from "lucide-react";
import Link from "next/link";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-[#f7fafd]">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-600 to-yellow-400 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
              <span>ET</span>
            </div>
            <span className="text-lg sm:text-2xl font-bold text-primary">TenaID - Doctor Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Doctor Dashboard</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Patient Management */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Patient Management</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">View and manage patient records, medical history, and treatment plans.</p>
              <Button asChild className="w-full text-sm sm:text-base">
                <Link href="/doctor/patient">View Patients</Link>
              </Button>
            </Card>

            {/* Appointments */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Appointments</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Schedule and manage patient appointments and consultations.</p>
              <Button asChild className="w-full text-sm sm:text-base">
                <Link href="/doctor/appointment">Manage Appointments</Link>
              </Button>
            </Card>

            {/* Medical Records */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Medical Records</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Access and update patient medical records and prescriptions.</p>
              <Button asChild className="w-full text-sm sm:text-base">
                <Link href="/doctor/medical-record">View Records</Link>
              </Button>
            </Card>

            {/* Treatment Plans */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Treatment Plans</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Create and manage patient treatment plans and follow-ups.</p>
              <Button asChild className="w-full text-sm sm:text-base">
                <Link href="/doctor/treatment-plan">Create Plans</Link>
              </Button>
            </Card>

            {/* Emergency Access */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                <h3 className="text-lg sm:text-xl font-semibold">Emergency Access</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Quick access to emergency patient information and protocols.</p>
              <Button asChild variant="destructive" className="w-full text-sm sm:text-base">
                <Link href="/doctor/emergency-access">Emergency Mode</Link>
              </Button>
            </Card>

            {/* Settings */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Profile Settings</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Manage your profile, preferences, and account settings.</p>
              <Button variant="secondary" className="w-full text-sm sm:text-base">Settings</Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 