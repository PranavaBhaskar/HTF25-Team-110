'use server';

/**
 * @fileOverview A flow to customize the voice of the generated podcast.
 *
 * - customizePodcastVoice - A function that handles the customization of the podcast voice.
 * - CustomizePodcastVoiceInput - The input type for the customizePodcastVoice function.
 * - CustomizePodcastVoiceOutput - The return type for the customizePodcastVoice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const CustomizePodcastVoiceInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
  voiceName: z.string().describe('The name of the voice to use.'),
});
export type CustomizePodcastVoiceInput = z.infer<typeof CustomizePodcastVoiceInputSchema>;

const CustomizePodcastVoiceOutputSchema = z.object({
  media: z.string().describe('The audio data in WAV format as a data URI.'),
});
export type CustomizePodcastVoiceOutput = z.infer<typeof CustomizePodcastVoiceOutputSchema>;

export async function customizePodcastVoice(input: CustomizePodcastVoiceInput): Promise<CustomizePodcastVoiceOutput> {
  return customizePodcastVoiceFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const customizePodcastVoiceFlow = ai.defineFlow(
  {
    name: 'customizePodcastVoiceFlow',
    inputSchema: CustomizePodcastVoiceInputSchema,
    outputSchema: CustomizePodcastVoiceOutputSchema,
  },
  async input => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: input.voiceName },
          },
        },
      },
      prompt: input.text,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
