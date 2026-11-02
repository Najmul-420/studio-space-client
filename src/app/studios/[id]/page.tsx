import StudioDetail from './StudioDetail';

export default async function StudioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StudioDetail id={id} />;
}
