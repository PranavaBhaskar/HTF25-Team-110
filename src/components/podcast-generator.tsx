'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { summarizeUploadedText } from '@/ai/flows/summarize-uploaded-text';
import { convertSummaryToAudio } from '@/ai/flows/convert-summary-to-audio';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { TONE_OPTIONS, SUMMARY_LENGTH_OPTIONS, VOICE_OPTIONS } from '@/lib/constants';
import { AudioPlayer } from '@/components/audio-player';
import { Wand2, Mic, FileText, Download } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const formSchema = z.object({
  text: z.string().min(50, 'Please enter at least 50 characters.'),
  summaryLength: z.enum(['short', 'medium', 'detailed']),
  tone: z.enum(['neutral', 'academic', 'friendly']),
  voice: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

type LoadingStep = 'idle' | 'summarizing' | 'converting' | 'done' | 'error';

export function PodcastGenerator() {
  const { toast } = useToast();
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('idle');
  const [podcastScript, setPodcastScript] = useState<string>('');
  const [audioDataUri, setAudioDataUri] = useState<string>('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      summaryLength: 'medium',
      tone: 'neutral',
      voice: VOICE_OPTIONS[0].value,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoadingStep('summarizing');
    setPodcastScript('');
    setAudioDataUri('');

    try {
      // Step 1: Summarize text
      const summaryResult = await summarizeUploadedText({
        text: values.text,
        summaryLength: values.summaryLength,
        tone: values.tone,
      });
      setPodcastScript(summaryResult.podcastScript);

      // Step 2: Convert to audio
      setLoadingStep('converting');
      const audioResult = await convertSummaryToAudio({
        summaryText: summaryResult.podcastScript,
        voiceName: values.voice,
      });
      setAudioDataUri(audioResult.audioDataUri);

      setLoadingStep('done');
      toast({
        title: 'Podcast Ready!',
        description: 'Your new podcast has been successfully generated.',
      });
    } catch (error) {
      console.error(error);
      setLoadingStep('error');
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description:
          'Failed to generate podcast. Please check your connection and try again.',
      });
    }
  };

  const isLoading = loadingStep === 'summarizing' || loadingStep === 'converting';

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Create Your Podcast</CardTitle>
          <CardDescription>
            Paste your text and choose your options to generate a new audio episode.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Text Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your notes, article, or textbook chapter here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="summaryLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary Length</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUMMARY_LENGTH_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TONE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {VOICE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingStep === 'summarizing'
                      ? 'Summarizing...'
                      : 'Converting to Audio...'}
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" /> Generate Podcast
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="lg:col-span-3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Your Generated Podcast</CardTitle>
            <CardDescription>Listen to the result and review the script below.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingStep === 'idle' && (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 text-center">
                <Mic className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  Your podcast will appear here once generated.
                </p>
              </div>
            )}
            {(loadingStep === 'summarizing' || loadingStep === 'converting') && (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 text-center">
                 <Wand2 className="mx-auto h-12 w-12 text-muted-foreground animate-pulse" />
                <p className="mt-4 text-muted-foreground capitalize">
                  {loadingStep}... please wait.
                </p>
              </div>
            )}
            {loadingStep === 'done' && audioDataUri && podcastScript && (
              <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold flex items-center mb-2"><Mic className="mr-2 h-5 w-5"/> Audio Player</h3>
                    <AudioPlayer src={audioDataUri} />
                </div>
                 <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold flex items-center"><FileText className="mr-2 h-5 w-5"/> Podcast Script</h3>
                        <Button variant="outline" size="sm" asChild>
                           <a href={audioDataUri} download="podcast.wav">
                                <Download className="mr-2 h-4 w-4" /> Download
                           </a>
                        </Button>
                    </div>
                    <ScrollArea className="h-[240px] w-full rounded-md border p-4">
                        <p className="whitespace-pre-wrap">{podcastScript}</p>
                    </ScrollArea>
                 </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
