import { urlFor } from "@lib/sanity";
import React from "react";
import CategoryLabel from "./blog/category";
import { parseISO, format } from "date-fns";
import Link from "next/link";

const TechBlogHero = ({ post }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-5 md:gap-10 md:min-h-[calc(100vh-30vh)]">
        <div className="relative aspect-video md:aspect-auto">
          <img
            alt="Thumbnail"
            src={urlFor(post.mainImage).url()}
            fetchpriority="high"
            decoding="async"
            data-nimg="fill"
            className="object-cover"
            sizes="100vw"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              color: "transparent"
            }}
          />
        </div>
        <div className="self-center px-5 pb-10">
          <CategoryLabel categories={post.categories} />
          <Link href={`/post/${post.slug.current}`}>
            <div className="max-w-2xl">
              <h1 className="  mt-2 hover:underline hover:cursor-pointer mb-3 text-3xl font-semibold tracking-tight text-black dark:text-white  lg:leading-tight text-brand-primary lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex mt-4 space-x-3 text-gray-500 md:mt-8 ">
                <div className="flex flex-col gap-3 md:items-center md:flex-row">
                  <div className="flex items-center gap-3">
                    <p className="text-gray-100 ">
                      {post.author.name}
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
                      <span className="text-white">
                        {post.estReadingTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TechBlogHero;
