import { Upload, FileText, Headphones } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const steps = [
  {
    icon: <Upload className="mb-4 h-10 w-10 text-primary" />,
    title: '1. Upload Your Content',
    description: 'Easily upload your notes, textbook chapters, or any text file. Our platform securely processes your documents.',
  },
  {
    icon: <FileText className="mb-4 h-10 w-10 text-primary" />,
    title: '2. AI Summarizes',
    description: 'Our advanced AI analyzes your text and creates a concise, easy-to-digest summary, formatted perfectly for an audio script.',
  },
  {
    icon: <Headphones className="mb-4 h-10 w-10 text-primary" />,
    title: '3. Listen Anywhere',
    description: 'Listen to your personalized podcast on any device. Track your history and revise efficiently, anytime, anywhere.',
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-muted/40 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center md:mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            How It Works
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            In three simple steps, transform your text into a personal podcast.
          </p>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-3 md:gap-12">
          {steps.map((step, index) => (
            <Card key={index} className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-center">{step.icon}</div>
                <CardTitle className="text-center font-bold">{step.title}</CardTitle>
                <CardDescription className="text-center">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
