import Image from "next/image";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const Home = () => {
  const stats = [
    {
      data: "6.06B",
      title: "Malware attacks worldwide in 2023 (+10% from 2022)",
    },
    {
      data: "$30B+",
      title: "Lost globally to ransomware last year",
    },
    {
      data: "399%",
      title: "Rise in cryptojacking incidents in 2023",
    },
    {
      data: "100M",
      title: "Apple users at risk from 'Banshee macOS Stealer' malware",
    },
  ];

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
      title: "Fast Refresh",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
      title: "Analytics",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
      title: "Datacenter security",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
      title: "Build on your terms",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      title: "Safe to use",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      ),
      title: "Flexible",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.",
    },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 blur-xl h-full"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>
      <div className="relative z-10">
        <section>
          <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-8">
              <div className="flex-none space-y-5 text-center md:text-left">
                <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
                  MalBox
                </h1>
                <p>
                  Your all-in-one platform for automated dynamic malware
                  analysis.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-x-3 sm:text-sm">
                  <InteractiveHoverButton
                    className="bg-green-600 text-teal-100 text-lg py-3 px-6"
                    onClick={() => (window.location.href = "/upload")}
                  >
                    Get Started
                  </InteractiveHoverButton>
                </div>
              </div>
              <div className="flex-1">
                <Image
                  src="/hero.png"
                  alt="Description of image"
                  width={500}
                  height={500}
                  className="max-w-xl"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-x-12 items-center justify-between lg:flex md:px-8">
            <div className="lg:max-w-xl">
              <Image
                src="/why.png"
                className="rounded-lg"
                alt="Description of image"
                width={870}
                height={580}
              />
            </div>
            <div className="mt-6 gap-12 sm:mt-0 md:flex lg:block">
              <div className="max-w-2xl">
                <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                  Detect Faster, Analyze Smarter, Defend Stronger
                </h3>
                <p className="mt-3 max-w-xl">
                  Because Every Second Counts Against Malware!
                </p>
              </div>
              <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                <ul className="inline-grid gap-y-8 gap-x-14 grid-cols-2">
                  {stats.map((item, idx) => (
                    <li key={idx} className="">
                      <h4 className="text-4xl text-indigo-600 font-semibold">
                        {item.data}
                      </h4>
                      <p className="mt-3 font-medium">{item.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
            <div className="relative max-w-2xl mx-auto sm:text-center">
              <div className="relative z-10">
                <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                  What Makes MalBox Different?
                </h3>
                <p className="mt-3">
                  We provide an all-in-one platform for automated dynamic
                  malware analysis.
                </p>
              </div>
              <div
                className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
                style={{
                  background:
                    "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
                }}
              ></div>
            </div>
            <div className="relative mt-12">
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-white space-y-3 p-4 border rounded-lg"
                  >
                    <div className="text-indigo-600 pb-3">{item.icon}</div>
                    <h4 className="text-lg text-gray-800 font-semibold">
                      {item.title}
                    </h4>
                    <p>{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
