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

  const AuthorimageProps = post?.author?.image
    ? GetImage(post.author.image)
    : null;

  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

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
            <div className="relative">
              <div className="relative bg-black text-white max-h-[80vh]">
                <Container className="flex flex-wrap py-10 md:py-20 items-center">
                  <div className="w-full md:w-1/2">
                    <CategoryLabel categories={post.categories} />
                    <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-3">
                      {post.title}
                    </h1>
                    <div className="flex items-center gap-3 text-white text-sm">
                      <time
                        className="text-gray-300"
                        dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toDateString()}
                      </time>
                      <span>
                        · {post.estReadingTime || "5"} min read
                      </span>
                    </div>
                    <div className="mt-5">
                      {post.categories.map(category => (
                        <CategoryLabel
                          key={category._id}
                          category={category}
                          className="mr-2"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    {post.mainImage && (
                      <div className="relative h-[300px] md:h-[400px] lg:h-[400px]">
                        <Image
                          src={imageProps.src}
                          loader={imageProps.loader}
                          blurDataURL={imageProps.blurDataURL}
                          alt={
                            post.mainImage?.alt || "Blog post image"
                          }
                          layout="fill"
                          objectFit="cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </Container>
              </div>
            </div>

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
