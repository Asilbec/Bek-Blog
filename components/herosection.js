import { urlFor } from "@lib/sanity";
import React from "react";
import CategoryLabel from "./blog/category";
import { parseISO, format } from "date-fns";
import Link from "next/link";

const TechBlogHero = ({ post }) => {
  return (
    <div className="relative bg-white dark:bg-black text-white overflow-hidden min-h-screen md:h-[90vh] xl:min-h-0	xl:h-auto ">
      <div className="w-full mx-auto">
        <div className="flex flex-wrap md:flex-nowrap md:space-x-12 lg:space-x-24 py-20 px-4 sm:px-6 lg:px-8 h-fit items-center">
          <div className="w-full md:w-1/2">
            <Link href={`/post/${post.slug.current}`}>
              <h1 className="cursor-pointer hover:underline text-4xl max-w-5xl font-bold sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-9xl mb-4">
                <span className="text-black dark:text-white">
                  {post.title}
                </span>
              </h1>
            </Link>

            <p className="text-lg md:text-xl mb-4  max-w-3xl">
              {format(parseISO(post.publishedAt), "MMMM dd, yyyy")}
            </p>
            <div className="mb-4">
              <CategoryLabel categories={post.categories} />
            </div>
          </div>
          <div className="w-full md:w-1/2 max-w-4xl	">
            <img
              className="w-full h-auto object-contain md:object-cover rounded-lg"
              src={urlFor(post.mainImage).url()}
              alt="Blog post illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechBlogHero;
