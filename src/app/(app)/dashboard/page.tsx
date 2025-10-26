import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FilePlus2, Podcast, Clock, PlayCircle } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { DUMMY_PODCASTS } from '@/lib/constants';

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Welcome Back, Alex!"
        description="Here's a quick overview of your learning journey."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Podcasts</CardTitle>
            <Podcast className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~4 Hours</div>
            <p className="text-xs text-muted-foreground">Based on average reading speed</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1 bg-primary/10 border-primary/50">
          <CardHeader className="pb-2">
              <CardTitle>Generate New Podcast</CardTitle>
               <CardDescription>Ready to convert more notes?</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild className="w-full">
                <Link href="/upload">
                    <FilePlus2 className="mr-2 h-4 w-4" /> Upload Content
                </Link>
             </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Podcasts</CardTitle>
          <CardDescription>Here are the podcasts you've generated recently.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Subject</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_PODCASTS.map((podcast) => (
                <TableRow key={podcast.id}>
                  <TableCell className="font-medium">{podcast.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{podcast.subject}</TableCell>
                  <TableCell className="hidden md:table-cell">{podcast.date}</TableCell>
                  <TableCell className="hidden sm:table-cell">{podcast.duration}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <PlayCircle className="h-5 w-5" />
                      <span className="sr-only">Play</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
