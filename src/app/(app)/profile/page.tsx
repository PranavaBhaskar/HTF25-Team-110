import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { SUMMARY_LENGTH_OPTIONS, TONE_OPTIONS, VOICE_OPTIONS } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Settings } from "lucide-react"

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Your Profile"
        description="Manage your personal details and generation preferences."
      />
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="items-center">
              <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://picsum.photos/seed/profile-avatar/200" alt="Alex" />
                  <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">Alex Doe</CardTitle>
              <CardDescription>alex.doe@example.com</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Change Profile Photo</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Application</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" /> Go to Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your name and email address.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Alex Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="alex.doe@example.com" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Generation Preferences</CardTitle>
                    <CardDescription>Set your default voice and summary settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Default Voice</Label>
                        <Select defaultValue={VOICE_OPTIONS[0].value}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {VOICE_OPTIONS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Default Summary Length</Label>
                             <Select defaultValue={SUMMARY_LENGTH_OPTIONS[1].value}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {SUMMARY_LENGTH_OPTIONS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Default Tone</Label>
                             <Select defaultValue={TONE_OPTIONS[0].value}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {TONE_OPTIONS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button>Save Preferences</Button>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Manage Account</CardTitle>
                    <CardDescription>Change your password or delete your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Change Password</Label>
                        <div className="flex gap-4 mt-2">
                             <Input type="password" placeholder="Current Password" />
                             <Input type="password" placeholder="New Password" />
                        </div>
                    </div>
                    <Separator />
                     <div>
                        <Label className="text-destructive">Delete Account</Label>
                        <p className="text-sm text-muted-foreground mt-1">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    </div>
                </CardContent>
                <CardFooter className="justify-between">
                    <Button>Update Password</Button>
                    <Button variant="destructive">Delete My Account</Button>
                </CardFooter>
            </Card>

        </div>
      </div>
    </>
  )
}
