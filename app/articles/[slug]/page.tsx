import type { Metadata } from 'next';
import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props, metadata: Metadata): Promise<Metadata> {
  const data = await getDetail(params.slug);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url || metadata.metadataBase + '/og-image.png'],
    },
  };
}

export default async function Page({ params }: Props) {
  const data = await getDetail(params.slug);
  return <Article data={data} />;
}
