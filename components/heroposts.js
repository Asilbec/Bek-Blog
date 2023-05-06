import Image from "next/image";
import Link from "next/link";
import { cx } from "@utils/all";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { PhotographIcon } from "@heroicons/react/outline";
import CategoryLabel from "@components/blog/category";

export default function HeroPostList({
  post,
  aspect,
  preloadImage,
  vis
}) {
  const imageProps = post?.mainImage
    ? GetImage(post.mainImage)
    : null;
  const AuthorimageProps = post?.author?.image
    ? GetImage(post.author.image)
    : null;

  return vis !== false ? (
    <>
      <div className="cursor-pointer group relative mt-10">
        <div
          className={cx(
            "relative overflow-hidden transition-all bg-gray-100 dark:bg-gray-800 ",
            aspect === "landscape" ? "aspect-video" : "aspect-square"
          )}>
          <Link href={`/post/${post.slug.current}`}>
            <a>
              {imageProps ? (
                <Image
                  src={imageProps.src}
                  loader={imageProps.loader}
                  blurDataURL={imageProps.blurDataURL}
                  alt={post.mainImage.alt || "Thumbnail"}
                  placeholder="blur"
                  sizes="80vw"
                  //sizes="(max-width: 640px) 90vw, 480px"
                  layout="fill"
                  objectFit="cover"
                  priority={preloadImage ? true : false}
                  className="transition-all hover:scale-105"
                />
              ) : (
                <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <PhotographIcon />
                </span>
              )}
            </a>
          </Link>
        </div>
        <div className="">
          <CategoryLabel categories={post.categories} />
          <a
            href={`/author/${post.author.slug.current}`}
            className="mb-2 hover:underline text-coolGray-900 font-bold absolute bottom-0">
            {format(parseISO(post.publishedAt), "MMMM do, yyyy")}
          </a>
        </div>

        <h2 className=" text-xl font-extrabold tracking-normal text-brand-primary dark:text-white mb-14">
          <Link href={`/post/${post.slug.current}`}>
            <span
              className="
              transition-all
          ">
              {post.title}
            </span>
          </Link>
        </h2>
      </div>
    </>
  ) : (
    <></>
  );
}
