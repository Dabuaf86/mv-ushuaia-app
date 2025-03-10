import React from "react";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>MV/Ushuaia App</title>
        <meta name="description" content="MV/Ushuaia App for Antarctica Cruise" />
      </Head>
      <h1 className="text-2xl font-bold text-center">Welcome to the MV/Ushuaia App</h1>
    </div>
  );
};

export default Home;