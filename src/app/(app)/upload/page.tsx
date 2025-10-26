import { PageHeader } from '@/components/page-header';
import { PodcastGenerator } from '@/components/podcast-generator';

export default function UploadPage() {
  return (
    <>
      <PageHeader
        title="Generate a New Podcast"
        description="Transform your documents into audio content in just a few clicks."
      />
      <PodcastGenerator />
    </>
  );
}
