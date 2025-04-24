import React from "react";
import { redirect } from "next/navigation";

const Home: React.FC = () => {
  redirect("/home");
  return null; // Prevents rendering the rest of the component if redirecting

};

export default Home;

