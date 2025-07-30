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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 transition-colors relative">
        <ThemeToggle />
        <Card className="w-full max-w-md shadow-2xl border bg-card/80 backdrop-blur-xl relative z-10">
          <CardHeader className="flex flex-col items-center gap-3 pb-0">
            <div className="flex flex-col items-center gap-1">
              <Logo />
              <span className="text-lg text-muted-foreground font-medium">Welcome to FaydaHealth</span>
            </div>
            <CardTitle className="text-2xl font-bold text-primary mt-2">Access your health records</CardTitle>
            <p className="text-sm text-muted-foreground pt-2">Securely access your health records using your national ID.</p>
          </CardHeader>
          <CardContent className="pt-2">
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
              className="w-full flex items-center gap-2 text-base font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" fill="#10B981"/><path d="M12 7v5l3 3" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Sign In with VeriFayda
            </Button>
          </CardContent>
        </Card>
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      </div>
    );
  }
  
  // This is the authenticated view
  const patient = mockPatient; // Using mock patient data for now
  
  return (
    <div className="min-h-screen bg-slate-50">
       <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.name || patient.firstName}</span>
            <Avatar>
              <AvatarImage src={session?.user?.image || patient.photoUrl} alt="User Avatar" />
              <AvatarFallback>{(session?.user?.name || patient.firstName)?.[0]}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={() => signOut()}>Logout</Button>
          </div>
        </div>
      </header>
       <main className="container mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Patient Records</h1>
            <div className="w-full max-w-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input placeholder="Search patient by Fayda ID..." className="pl-10"/>
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Patient Info */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="text-primary"/> 
                            Patient Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={session?.user?.image || patient.photoUrl} />
                                <AvatarFallback>{(session?.user?.name || patient.firstName)?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-bold">{session?.user?.name || `${patient.firstName} ${patient.lastName}`}</h2>
                                <p className="text-sm text-gray-500">Email: {session?.user?.email}</p>
                            </div>
                        </div>
                        <div className="border-t pt-4 space-y-2">
                            <p><strong>Age:</strong> {getAge(patient.dateOfBirth)}</p>
                            <p><strong>Blood Type:</strong> {patient.bloodType}</p>
                            <p><strong>Date of Birth:</strong> {patient.dateOfBirth.toLocaleDateString()}</p>
                        </div>
                         <Button className="w-full">Update Information</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Right Side - Medical Records */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg">
                    <CardHeader><CardTitle>Recent Records</CardTitle></CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Doctor</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patient.records.map(record => (
                                    <TableRow key={record.id}>
                                        <TableCell className="font-medium">{record.recordType}</TableCell>
                                        <TableCell>{record.title}</TableCell>
                                        <TableCell>{record.practitionerName}</TableCell>
                                        <TableCell>{record.createdAt.toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" disabled={record.isLocked}>
                                                {record.isLocked ? <Lock className="h-4 w-4"/> : "View"}
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