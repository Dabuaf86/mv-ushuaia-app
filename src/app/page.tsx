import React from "react";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div className="container bg--default grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg--default text--colors_default p-4 rounded shadow">
        <Head>
          <title>MV/Ushuaia App</title>
          <meta name="description" content="MV/Ushuaia App for Antarctica Cruise" />
        </Head>
        <h1 className="text-2xl font-bold mb-5 text--colors_default text-center">Welcome to the MV/Ushuaia App</h1>
      </main>
    </div>
  );
};

export default Home;

