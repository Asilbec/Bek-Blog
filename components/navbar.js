import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import Container from "@components/container";
import Link from "next/link";
import Image from "next/image";
import GetImage from "@utils/getImage";
import { myLoader } from "@utils/all";
import { useRouter } from "next/router";
import { cx } from "@utils/all";

export default function Navbar(props) {
  const leftmenu = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Blogs",
      href: "/blogs"
    },
    {
      label: "Contact",
      href: "/contact"
    }
  ];
  const router = useRouter();
  const route = router.route.toLocaleLowerCase();

  function giveBackLowerCase(passedRoute) {
    if (passedRoute.href === route) {
      return "text-sky-500";
    } else return "text-black dark:text-white";
  }

  const [scrollPosition, setScrollPosition] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setScrollPosition(currentScrollPosition);

      // Calculate opacity based on scroll position (100 is the threshold)
      const calculatedOpacity =
        currentScrollPosition > 100 ? 1 : currentScrollPosition / 100;
      setOpacity(calculatedOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mobilemenu = [...leftmenu];

  return (
    <div
      className={`w-full  py-2 px-2 absolute sticky z-10 top-0 bg-white dark:bg-black
       `}>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className=" flex  justify-between md:gap-10 ml-2 md:flex-nowrap">
                <Link href="/">
                  <a className="w-16 dark:hidden">
                    {props.logo ? (
                      <Image
                        {...GetImage(props.logo)}
                        alt="Logo"
                        sizes="(max-width: 640px) 100vw, 200px"
                        priority={true}
                      />
                    ) : (
                      <span className="block text-left">BekDev</span>
                    )}
                  </a>
                </Link>
                <Link href="/">
                  <a className="hidden w-16 dark:block">
                    {props.logoalt ? (
                      <Image
                        {...GetImage(props.logoalt)}
                        alt="Logo"
                        sizes="(max-width: 640px) 100vw, 200px"
                        priority={true}
                      />
                    ) : (
                      <span className="block text-left">BekDev</span>
                    )}
                  </a>
                </Link>
                <div className=" flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-start md:w-auto md:order-none md:flex-1">
                  {leftmenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <a
                        className={cx(
                          "hover:text-blue-500 px-5 py-2 text-2xl font-bold ",
                          giveBackLowerCase(item)
                        )}>
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between w-full md:w-auto md:mr-5">
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 ">
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>
              </div>
              <Disclosure.Panel>
                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                  {mobilemenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <a
                        className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}>
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </div>
  );
}
