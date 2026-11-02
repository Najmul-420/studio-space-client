import StudioBrowser from './StudioBrowser';

export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return <StudioBrowser initialCategory={category ?? 'All'} />;
}
