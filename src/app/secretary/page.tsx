"use client";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { User, FileText, Calendar, Users, Phone, Bell, Settings } from "lucide-react";

export default function SecretaryDashboard() {
  return (
    <div className="min-h-screen bg-[#f7fafd]">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-600 to-yellow-400 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
              <span>ET</span>
            </div>
            <span className="text-lg sm:text-2xl font-bold text-primary">TenaID - Secretary Dashboard</span>
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Secretary Dashboard</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Patient Registration */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Patient Registration</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Register new patients and manage patient information.</p>
              <Button className="w-full text-sm sm:text-base">Register Patient</Button>
            </Card>

            {/* Appointment Scheduling */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Appointment Scheduling</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Schedule and manage patient appointments with doctors.</p>
              <Button className="w-full text-sm sm:text-base">Schedule Appointment</Button>
            </Card>

            {/* Patient Records */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Patient Records</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Access and manage patient medical records and files.</p>
              <Button className="w-full text-sm sm:text-base">View Records</Button>
            </Card>

            {/* Staff Management */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Staff Management</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Manage doctor schedules and staff information.</p>
              <Button className="w-full text-sm sm:text-base">Manage Staff</Button>
            </Card>

            {/* Communication */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">Communication</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Send notifications and communicate with patients.</p>
              <Button className="w-full text-sm sm:text-base">Send Messages</Button>
            </Card>

            {/* System Settings */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold">System Settings</h3>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Configure system settings and manage administrative tasks.</p>
              <Button variant="secondary" className="w-full text-sm sm:text-base">Settings</Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 