import type { MetaFunction } from "@remix-run/node";
import { Button } from "@repo/ui/components/ui/button";
import { useNavigate } from "react-router-dom";

export const meta: MetaFunction = () => {
  return [
    { title: "GovernorHaus" },
    { name: "description", content: "Welcome to the future of work" },
  ];
};

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="font-sans grid grid-rows-[10px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex justify-center w-full mt-[-100px]">
          <img
            src="/images/governor.webp"
            alt="Governor"
            style={{ height: "300px" }}
          />
        </div>
        <h1 className="font-header text-4xl font-bold text-center">
          Welcome to the future of work
        </h1>
        <Button
          onClick={() => navigate("/launch")}
          className="font-header py-4 px-8 rounded-lg text-xl mx-auto"
        >
          Create a DAO
        </Button>
      </main>
    </div>
  );
}
