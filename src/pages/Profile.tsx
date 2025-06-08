
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, Bell } from "lucide-react";

export default function Profile() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 border-2 border-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-xl font-bold text-primary-foreground">
              AI
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Conversion Rate Optimization Expert</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue="AI Assistant" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@aico.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="CRO Expert" disabled />
              </div>
              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button variant="outline" className="w-full">Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recommendation Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified of new CRO recommendations
                  </p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Performance Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly performance summaries
                  </p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Account Activity
              </CardTitle>
              <CardDescription>
                Recent activity and login history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Last Login</span>
                  <span className="text-muted-foreground">Today, 2:30 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Account Created</span>
                  <span className="text-muted-foreground">January 1, 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Sessions</span>
                  <span className="text-muted-foreground">1,247</span>
                </div>
              </div>
              <Separator />
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
