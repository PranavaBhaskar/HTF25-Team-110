import { LayoutDashboard, Upload, History, User, Settings, LogOut } from 'lucide-react';

export const SIDEBAR_NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/upload', label: 'Upload', icon: Upload },
  { href: '/history', label: 'History', icon: History },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export const SIDEBAR_FOOTER_NAV_ITEMS = [
    { href: '/logout', label: 'Logout', icon: LogOut },
];


export const SUMMARY_LENGTH_OPTIONS = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'detailed', label: 'Detailed' },
];

export const TONE_OPTIONS = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'academic', label: 'Academic' },
  { value: 'friendly', label: 'Friendly' },
];

export const VOICE_OPTIONS = [
  { value: 'en-US-Standard-A', label: 'Male (Standard)' },
  { value: 'en-US-Wavenet-D', label: 'Male (Natural)' },
  { value: 'en-US-Standard-C', label: 'Female (Standard)' },
  { value: 'en-US-Wavenet-F', label: 'Female (Natural)' },
  { value: 'en-GB-Standard-B', label: 'British Male' },
  { value: 'en-GB-Standard-A', label: 'British Female' },
  { value: 'en-AU-Standard-B', label: 'Australian Male' },
  { value: 'en-AU-Standard-A', label: 'Australian Female' },
];

export const DUMMY_PODCASTS = [
    {
        id: '1',
        title: 'Quantum Mechanics Chapter 1 Summary',
        date: '2024-07-28',
        duration: '12:34',
        subject: 'Physics'
    },
    {
        id: '2',
        title: 'The Renaissance: A Cultural Rebirth',
        date: '2024-07-27',
        duration: '08:52',
        subject: 'History'
    },
    {
        id: '3',
        title: 'Introduction to Machine Learning',
        date: '2024-07-25',
        duration: '21:15',
        subject: 'Computer Science'
    },
    {
        id: '4',
        title: 'Cellular Respiration Explained',
        date: '2024-07-24',
        duration: '05:45',
        subject: 'Biology'
    }
]
