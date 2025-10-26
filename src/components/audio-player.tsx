'use client';

import { useRef, useState, useEffect, type ChangeEvent } from 'react';
import { Play, Pause, Volume2, VolumeX, Rewind, FastForward, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AudioPlayerProps = {
  src: string;
};

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Reset player when src changes
    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [src]);
  
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeSliderChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = value[0];
      setVolume(value[0]);
    }
  };

  const handlePlaybackRateChange = (rate: string) => {
    const newRate = parseFloat(rate);
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if(audio) audio.currentTime += seconds;
  }

  return (
    <div className="w-full rounded-lg border bg-card p-4 shadow-sm">
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono tabular-nums">{formatTime(currentTime)}</span>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => skip(-10)}>
                <Rewind className="h-5 w-5" />
            </Button>
            <Button variant="default" size="icon" onClick={togglePlayPause} className="w-12 h-12">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => skip(10)}>
                <FastForward className="h-5 w-5" />
            </Button>
        </div>
        <span className="text-sm font-mono tabular-nums">{formatTime(duration)}</span>
      </div>
      <div className="mt-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleTimeSliderChange}
          className="w-full"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={() => handleVolumeChange([volume > 0 ? 0 : 1])}>
               {volume > 0 ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
           </Button>
           <Slider value={[volume]} max={1} step={0.1} onValueChange={handleVolumeChange} className="w-24"/>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="playback-speed">Playback Speed</Label>
                    <Select value={playbackRate.toString()} onValueChange={handlePlaybackRateChange}>
                        <SelectTrigger id="playback-speed">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0.5">0.5x</SelectItem>
                            <SelectItem value="1">1x (Normal)</SelectItem>
                            <SelectItem value="1.25">1.25x</SelectItem>
                            <SelectItem value="1.5">1.5x</SelectItem>
                            <SelectItem value="2">2x</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
