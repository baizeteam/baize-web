import React from "react";

export default function PageInfo({
  title,
  description,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl pt-24 lg:pt-48">
      <div className="mb-8 text-center">
        <h1
          style={{
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
          className="from-primary inline-block bg-gradient-to-r via-purple-500 to-pink-500 text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
        >
          {title}
        </h1>
        <p className="mt-6 text-left indent-10 text-lg leading-8 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}
