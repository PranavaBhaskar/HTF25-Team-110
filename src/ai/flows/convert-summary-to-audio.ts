'use server';

/**
 * @fileOverview Converts summarized text into an audio podcast using text-to-speech technology.
 *
 * - convertSummaryToAudio - A function that handles the conversion of summarized text to audio.
 * - ConvertSummaryToAudioInput - The input type for the convertSummaryToAudio function.
 * - ConvertSummaryToAudioOutput - The return type for the convertSummaryToAudio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const ConvertSummaryToAudioInputSchema = z.object({
  summaryText: z.string().describe('The summarized text to convert to audio.'),
  voiceName: z.string().optional().describe('The desired voice for the audio. Defaults to Algenib.'),
});

export type ConvertSummaryToAudioInput = z.infer<typeof ConvertSummaryToAudioInputSchema>;

const ConvertSummaryToAudioOutputSchema = z.object({
  audioDataUri: z.string().describe('The audio data in WAV format as a data URI.'),
});

export type ConvertSummaryToAudioOutput = z.infer<typeof ConvertSummaryToAudioOutputSchema>;

export async function convertSummaryToAudio(input: ConvertSummaryToAudioInput): Promise<ConvertSummaryToAudioOutput> {
  return convertSummaryToAudioFlow(input);
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

const convertSummaryToAudioFlow = ai.defineFlow(
  {
    name: 'convertSummaryToAudioFlow',
    inputSchema: ConvertSummaryToAudioInputSchema,
    outputSchema: ConvertSummaryToAudioOutputSchema,
  },
  async input => {
    const { summaryText, voiceName = 'Algenib' } = input;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
      prompt: summaryText,
    });

    if (!media) {
      throw new Error('No media returned from TTS generation.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    return {
      audioDataUri: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
