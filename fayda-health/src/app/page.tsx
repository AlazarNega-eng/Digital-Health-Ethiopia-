"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, User, Lock, HeartPulse, FileText, FlaskConical, ShieldAlert, Loader2 } from 'lucide-react';


// ... existing imports ...

// Mock Data - this remains for demonstration until the API is connected
const mockPatient = {
  faydaId: "6140798523917519", // Using test FIN from docs
  firstName: "Tsega",
  lastName: "Abebe",
  dateOfBirth: new Date("1992-08-10"),
  bloodType: "A+",
  photoUrl: "/default-avatar.png",
  records: [
    { id: 'rec1', recordType: "Diagnose", title: "Malaria", practitionerName: "Dr. Genet", createdAt: new Date("2024-07-26"), isLocked: false },
    { id: 'rec2', recordType: "Past Visit", title: "General Consultation", practitionerName: "Dr. Genet", createdAt: new Date("2024-05-15"), isLocked: false },
    { id: 'rec3', recordType: "Lab Result", title: "Complete Blood Count", practitionerName: "Central Lab", createdAt: new Date("2024-05-10"), isLocked: true },
  ]
};

const getAge = (dob: Date) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) { age--; }
    return age;
}

const getRecordIcon = (type: string) => {
    switch(type) {
      case "Diagnose": return <HeartPulse className="h-6 w-6 text-red-500" />;
      case "Past Visit": return <User className="h-6 w-6 text-blue-500" />;
      case "Lab Result": return <FlaskConical className="h-6 w-6 text-purple-500" />;
      case "Prescription": return <FileText className="h-6 w-6 text-green-500" />;
      default: return <FileText className="h-6 w-6 text-gray-500" />;
    }
}

// The main application component
export default function HomePage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  
  // Add this state for VeriFayda user
  const [veriFaydaUser, setVeriFaydaUser] = useState(null);

  // Add this useEffect to handle callback data
  useEffect(() => {
    const userParam = searchParams.get('user');
    if (userParam) {
      try {
        const userData = JSON.parse(userParam);
        setVeriFaydaUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [searchParams]);

  const user = veriFaydaUser || session?.user;

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-slate-900 p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50">Welcome to FaydaHealth</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Your health, your records, your control.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Sign in using your national ID to securely access your health information.
              </p>
              <Button
                onClick={() => {
                  const authUrl = new URL('https://esignet.ida.fayda.et/authorize')
                  authUrl.searchParams.set('response_type', 'code')
                  authUrl.searchParams.set('client_id', 'crXYIYg2cJiNTaw5t-peoPzCRo-3JATNfBd5A86U8t0')
                  authUrl.searchParams.set('redirect_uri', 'http://localhost:3000/callback')
                  authUrl.searchParams.set('scope', 'openid profile email')
                  authUrl.searchParams.set('state', Math.random().toString(36).substring(7))
                  window.location.href = authUrl.toString()
                }}
                className="w-full font-semibold"
                variant="primary"
              >
                Sign In with VeriFayda
              </Button>
            </div>
            <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
              <p>&copy; {new Date().getFullYear()} FaydaHealth. All rights reserved.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // This is the authenticated view
  const patient = mockPatient; // Using mock patient data for now
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Welcome, {user?.name || patient.firstName}
              </span>
              <Avatar>
                <AvatarImage src={session?.user?.image || patient.photoUrl} alt="User Avatar" />
                <AvatarFallback>{(session?.user?.name || patient.firstName)?.[0]}</AvatarFallback>
              </Avatar>
              <ThemeToggle />
              <Button variant="outline" onClick={() => signOut()}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">Patient Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Manage all your health records in one place.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Patient Info */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-primary text-primary-foreground p-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <User />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                    <AvatarImage src={session?.user?.image || patient.photoUrl} />
                    <AvatarFallback className="text-4xl">
                      {(session?.user?.name || patient.firstName)?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{session?.user?.name || `${patient.firstName} ${patient.lastName}`}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
                </div>
                <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Age:</strong> {getAge(patient.dateOfBirth)}</div>
                  <div><strong>Blood Type:</strong> {patient.bloodType}</div>
                  <div className="col-span-2"><strong>DOB:</strong> {patient.dateOfBirth.toLocaleDateString()}</div>
                </div>
                <Button className="w-full mt-4" variant="secondary">Update Information</Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Medical Records */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">Recent Medical Records</CardTitle>
                  <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input placeholder="Search records..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Practitioner</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Access</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patient.records.map(record => (
                      <TableRow key={record.id} className="hover:bg-gray-100 dark:hover:bg-slate-800">
                        <TableCell className="font-medium flex items-center gap-2">
                          {getRecordIcon(record.recordType)} {record.recordType}
                        </TableCell>
                        <TableCell>{record.title}</TableCell>
                        <TableCell>{record.practitionerName}</TableCell>
                        <TableCell>{record.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant={record.isLocked ? "destructive" : "outline"} size="sm">
                            {record.isLocked ? <Lock className="h-4 w-4" /> : "View"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}