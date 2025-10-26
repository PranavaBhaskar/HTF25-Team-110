import { BrainCircuit, UserCog, History, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8" />,
    title: 'AI Summarization',
    description: 'Smart algorithms distill your text into key points, saving you time and effort.',
  },
  {
    icon: <UserCog className="h-8 w-8" />,
    title: 'Personalization',
    description: 'Choose summary length, tone, and voice style to create podcasts that fit your learning needs.',
  },
  {
    icon: <History className="h-8 w-8" />,
    title: 'Personal Dashboard',
    description: 'Track and manage all your generated podcasts in one place. Replay, download, or view transcripts.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: 'Secure & Private',
    description: 'Your uploaded files and generated podcasts are stored securely, ensuring your data remains private.',
  },
];

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center md:mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Everything You Need to Study Smarter
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A powerful suite of features designed for efficient, on-the-go learning.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center space-y-3 text-center">
              <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
