import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
}

export default function SEO({
  title = "FlowNote",
  description = "FlowNote 할 일 등록, 뉴스 모음, 블로그 포스트 아이디어 작성, 메모 생성 등 여러 기능의 봇들의 모음입니다.",
  keywords = "FlowNote, 할 일 관리, 뉴스, 블로그, 메모",
  ogImage,
  ogUrl,
  twitterCard,
}: SEOProps) {
  const fullTitle = title.includes("FlowNote") ? title : `FlowNote - ${title}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph 메타태그 (페이스북, 카카오톡 등) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter 카드 */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 추가적인 메타태그 */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
}
