import Image from "next/image";
import {
  createClient,
  createPreviewSubscriptionHook
} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import { config } from "./config";
import { CopyBlock, dracula } from "react-code-blocks";

import GetImage from "@utils/getImage";

if (!config.projectId) {
  throw Error(
    "The Project ID is not set. Check your environment variables."
  );
}
export const urlFor = source =>
  createImageUrlBuilder(config).image(source);

export const imageBuilder = source =>
  createImageUrlBuilder(config).image(source);

export const usePreviewSubscription =
  createPreviewSubscriptionHook(config);

// Barebones lazy-loaded image component
const ImageComponent = ({ value }) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <Image
      {...GetImage(value)}
      blurDataURL={GetImage(value).blurDataURL}
      objectFit="cover"
      sizes="(max-width: 800px) 100vw, 800px"
      alt={value.alt || " "}
      placeholder="blur"
      loading="lazy"
    />
  );
};

function MyCodeComponent(props) {
  return (
    <CopyBlock
      text={props.value.code}
      language={props.value.language}
      showLineNumbers={false}
      theme={dracula}
    />
  );
}

const components = {
  types: {
    image: ImageComponent,
    code: props => MyCodeComponent(props)
  },
  marks: {
    center: props => (
      <div className="text-center">{props.children}</div>
    ),
    highlight: props => (
      <span className="font-bold text-brand-primary">
        {props.children}
      </span>
    ),
    link: props => (
      <a href={props?.value?.href} target="_blank" rel="noopener">
        {props.children}
      </a>
    )
  }
};
// Set up Portable Text serialization
export const PortableText = props => (
  <PortableTextComponent components={components} {...props} />
);

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false
});

export const getClient = usePreview =>
  usePreview ? previewClient : client;
export default client;
