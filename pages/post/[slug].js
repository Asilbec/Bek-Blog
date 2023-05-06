import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
  PortableText
} from "@lib/sanity";
import ErrorPage from "next/error";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { NextSeo } from "next-seo";
import defaultOG from "/public/img/opengraph.jpg";

import { singlequery, configQuery, pathquery } from "@lib/groq";
import CategoryLabel from "@components/blog/category";
import AuthorCard from "@components/blog/authorCard";
import { cx } from "@utils/all";
import HeroPostList from "@components/heroposts";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;

  const router = useRouter();
  const { slug } = router.query;

  const { data: post } = usePreviewSubscription(singlequery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const imageProps = post?.mainImage
    ? GetImage(post?.mainImage)
    : null;

  return (
    <>
      {post && siteConfig && (
        <>
          <NextSeo
            title={`${post.title} | OpenAI Blog`}
            description={post.excerpt || ""}
            openGraph={{
              title: `${post.title} | OpenAI Blog`,
              description: post.excerpt || "",
              url: `https://openai.com/blog/${post.slug.current}`,
              type: "article",
              article: {
                publishedTime: post.publishedAt,
                modifiedTime: post._updatedAt,
                tags: post.categories.map(category => category.title)
              }
            }}
          />
          <Layout>
            <>
              <div className="grid md:grid-cols-2 gap-5 md:gap-10 md:min-h-[calc(100vh-30vh)]">
                <div className="relative aspect-video md:aspect-auto">
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%"
                    }}>
                    <Image
                      src={imageProps.src}
                      loader={imageProps.loader}
                      blurDataURL={imageProps.blurDataURL}
                      alt={post.mainImage?.alt || "Blog post image"}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                </div>

                <div className="self-center px-5 pb-10">
                  <CategoryLabel categories={post.categories} />
                  <div className="max-w-2xl">
                    <h1 className="mt-2  mb-3 text-3xl font-semibold tracking-tight text-black dark:text-white lg:leading-tight text-brand-primary lg:text-5xl">
                      {post.title}
                    </h1>
                    <div className="flex mt-4 space-x-3 text-gray-500 md:mt-8 ">
                      <div className="flex flex-col gap-3 md:items-center md:flex-row">
                        <>
                          <div className="flex items-center gap-3">
                            <p className="text-gray-100 ">
                              <Link
                                href={`/author/${post.author.slug.current}`}>
                                {post.author.name}
                              </Link>
                              <span className="hidden pl-2 md:inline">
                                {" "}
                                ·
                              </span>
                            </p>
                          </div>
                          <div>
                            <div className="flex space-x-2 text-sm md:flex-row md:items-center">
                              <time
                                className="text-white"
                                dateTime="2022-10-21T06:05:00.000Z">
                                {format(
                                  parseISO(post.publishedAt),
                                  "MMMM dd, yyyy"
                                )}
                              </time>
                              <span className="hidden pl-2 md:inline">
                                {" "}
                                ·
                              </span>
                              <span className="text-white">
                                {post.estReadingTime} min read
                              </span>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>

            <Container className="py-10 md:py-20">
              <article className="max-w-screen-lg mx-auto ">
                <div className="mx-auto my-3 prose max-w-xl dark:prose-invert prose-a:text-blue-500">
                  {post.body && <PortableText value={post.body} />}
                </div>
                <div className="flex justify-center mt-7 mb-7">
                  <Link href="/">
                    <a className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                      ← View all posts
                    </a>
                  </Link>
                </div>
                {post.author && <AuthorCard author={post.author} />}
              </article>
            </Container>
          </Layout>
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(singlequery, {
    slug: params.slug
  });

  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postdata: { ...post },
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(pathquery);
  return {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug
        }
      })) || [],
    fallback: true
  };
}
