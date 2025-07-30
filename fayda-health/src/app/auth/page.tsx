"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Add authentication logic here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 transition-colors overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-2xl animate-pulse z-0" />
      {/* Theme toggle in top-right */}
      <div className="absolute top-6 right-8 z-20">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md shadow-2xl border-none bg-card/80 backdrop-blur-xl relative z-10 animate-fade-in-up">
        <CardHeader className="flex flex-col items-center gap-3 pb-0">
          <div className="flex flex-col items-center gap-1">
            <Logo />
            <span className="text-lg text-muted-foreground font-medium">Welcome to FaydaHealth</span>
          </div>
          <CardTitle className="text-2xl font-bold text-primary mt-2">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              className="w-full text-base font-semibold bg-gradient-to-r from-primary to-secondary shadow-md hover:from-primary/90 hover:to-secondary/90"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>Signing in...</span>
              ) : "Sign In"}
            </Button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-muted" />
            <span className="mx-4 text-muted-foreground text-xs">or</span>
            <div className="flex-grow border-t border-muted" />
          </div>
          <Button variant="outline" className="w-full flex items-center gap-2 shadow-sm hover:bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" fill="#10B981"/><path d="M12 7v5l3 3" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Sign in with VeriFayda
          </Button>
          <div className="flex justify-between items-center mt-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Forgot password?</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Create account</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
