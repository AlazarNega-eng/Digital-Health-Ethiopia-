"use client";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { User, FileText, Calendar, Heart, Bell, Download } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-[#f7fafd]">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-600 to-yellow-400 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
              <span>ET</span>
            </div>
            <span className="text-lg sm:text-2xl font-bold text-primary">TenaID - User Dashboard</span>
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">My Health Dashboard</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* My Records */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">My Medical Records</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">View your complete medical history, test results, and treatment records.</p>
              <Button className="w-full text-sm sm:text-base">View Records</Button>
            </Card>

            {/* Appointments */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">My Appointments</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Schedule and manage your upcoming medical appointments.</p>
              <Button className="w-full text-sm sm:text-base">Book Appointment</Button>
            </Card>

            {/* Health Metrics */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Health Metrics</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Track your vital signs, medications, and health indicators.</p>
              <Button className="w-full text-sm sm:text-base">View Metrics</Button>
            </Card>

            {/* Prescriptions */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">My Prescriptions</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Access your current and past prescriptions and medication history.</p>
              <Button className="w-full text-sm sm:text-base">View Prescriptions</Button>
            </Card>

            {/* Emergency Contacts */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                <h3 className="text-lg sm:text-xl font-semibold">Emergency Contacts</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Manage your emergency contacts and medical information.</p>
              <Button variant="destructive" className="w-full text-sm sm:text-base">Emergency Info</Button>
            </Card>

            {/* Download Records */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Download className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Download Records</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Download your medical records and health information.</p>
              <Button variant="secondary" className="w-full text-sm sm:text-base">Download</Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 