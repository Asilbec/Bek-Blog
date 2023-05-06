import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import {
  getClient,
  urlFor,
  usePreviewSubscription
} from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { postquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import PostList from "@components/postlist";
import HeroSection from "@components/herosection";

import { Analytics } from "@vercel/analytics/react";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;

  const router = useRouter();
  //console.log(router.query.category);

  const { data: posts } = usePreviewSubscription(postquery, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  //console.log(posts);
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;
  return (
    <>
      {posts && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Bek"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          <HeroSection post={posts[0]} />

          <h1 className="px-5 text-5xl md:text-6xl font-bold text-left mt-10 text-black dark:text-white">
            Recent Articles
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-5 gap-5 px-5">
            {posts.slice(1, 9).map(post => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              className="relative group inline-block py-4 px-7 font-semibold  text-white dark:text-black rounded-full bg-black dark:bg-white transition overflow-hidden"
              href="/blogs">
              <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform  transition duration-500" />
              <span className="relative">See More Articles</span>
            </a>
          </div>
        </Layout>
      )}
      <Analytics />
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postquery);
  const config = await getClient(preview).fetch(configQuery);

  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      postdata: post,
      // categories: categories,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
