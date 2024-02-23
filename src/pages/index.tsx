/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
import { VoteButton } from "@/components/VoteButton";
import { data } from "@/data";
import { useGameState } from "@/stores/useGame";
import { doc } from "firebase/firestore";
import Head from "next/head";
import { useFirestore, useFirestoreDocData } from "reactfire";

export default function Home() {
  const firestore = useFirestore();
  const currentVote = doc(firestore, "votes/settings");

  const { status, data: currentVoteState } = useFirestoreDocData(currentVote);

  const localGameState = useGameState();
  return (
    <>
      <Head>
        <title>That&apos;s Us | YWKL</title>
        <meta name="description" content="YWKL That's Us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex min-h-screen flex-col bg-[url(/YWSS_Mobile.png)] bg-[length:100dvw_100dvh] bg-center bg-no-repeat py-5">
        <div className="flex h-full w-full flex-col items-center">
          <img src="/YWSS_Logo.webp" className="w-[300px]" alt="Logo" />
          {status === "success" && (
            <div className="font-chi mt-5 px-12 text-center text-3xl leading-[3.5rem] tracking-[0.75rem] text-white">
              {/* @ts-expect-error unable to type returned data type from firebase */}
              {localGameState[currentVoteState.state]
                ? "你已经完成了这轮的投票~"
                : data[currentVoteState.state]?.question}
            </div>
          )}
          {/* @ts-expect-error unable to type returned data type from firebase */}
          {status === "success" && !localGameState[currentVoteState.state] && (
            <div className="absolute bottom-24 flex w-[270px] flex-col gap-5">
              {status === "success" && (
                <VoteButton state={currentVoteState.state} label="a" />
              )}
              {status === "success" && (
                <VoteButton state={currentVoteState.state} label="b" />
              )}
              {status === "success" && (
                <VoteButton state={currentVoteState.state} label="c" />
              )}
              {status === "success" && (
                <VoteButton state={currentVoteState.state} label="d" />
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
