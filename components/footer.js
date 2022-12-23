import Container from "@components/container";
import ThemeSwitch from "@components/themeSwitch";
import Image from "next/image";
import { myLoader } from "@utils/all";
import VercelLogo from "../public/img/vercel.svg";

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      <div className="flex justify-center gap-1 mt-1 text-sm text-center text-gray-500 dark:text-gray-600">
        <span> Made by Bek</span>
        <span>&middot;</span>
        <span>
          {" "}
          <a
            href="https://github.com/Asilbec"
            rel="noopener"
            target="_blank">
            Github
          </a>
        </span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <ThemeSwitch />
      </div>
    </Container>
  );
}
