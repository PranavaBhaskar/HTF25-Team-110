import { config } from 'dotenv';
config();

import '@/ai/flows/convert-summary-to-audio.ts';
import '@/ai/flows/customize-podcast-voice.ts';
import '@/ai/flows/summarize-uploaded-text.ts';