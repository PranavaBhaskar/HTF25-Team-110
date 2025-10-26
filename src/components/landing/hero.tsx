import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start justify-center space-y-4">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Turn Your Notes Into Podcasts
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            AudioNotes uses AI to convert your study materials into engaging
            audio podcasts. Revise on the go, absorb information faster, and
            make learning effortless.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline">
              See a Demo
            </Button>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              width={600}
              height={400}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
