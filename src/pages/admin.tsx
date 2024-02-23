/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { VoteButton } from "@/components/VoteButton";
import { data } from "@/data";
import { doc, increment, updateDoc } from "firebase/firestore";
import { FunctionComponent } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";

const AdminPage = () => {
  const firestore = useFirestore();
  const currentVote = doc(firestore, "votes/settings");

  const { status, data: currentVoteState } = useFirestoreDocData(currentVote);
  return (
    status === "success" && (
      <main className="relative flex min-h-screen flex-col gap-3 bg-[url(/YWSS_Mobile.png)] bg-[length:100dvw_100dvh] bg-center bg-no-repeat px-20 py-24">
        <div className="relative flex w-full cursor-pointer flex-row items-center justify-center border-4 border-white bg-[#e5df19] p-1 text-center text-xl font-bold uppercase text-[#ab2e13] shadow-xl">
          Current Question
          <br />
          {data[currentVoteState.state]?.question}
        </div>
        <AdminButton
          label="previous"
          incrementBy={-1}
          currentState={currentVoteState.state}
        />
        <AdminButton
          label="next"
          incrementBy={1}
          currentState={currentVoteState.state}
        />
        <div className="h-[100px]" />
        <div className="w-full text-center text-lg text-white">
          This round&apos;s options
        </div>
        <VoteButton state={currentVoteState.state} label="a" admin />
        <VoteButton state={currentVoteState.state} label="b" admin />
        <VoteButton state={currentVoteState.state} label="c" admin />
        <VoteButton state={currentVoteState.state} label="d" admin />
      </main>
    )
  );
};

export default AdminPage;

interface AdminButtonProps {
  incrementBy: number;
  label: string;
  currentState: number;
}

const AdminButton: FunctionComponent<AdminButtonProps> = ({
  incrementBy,
  label,
  currentState,
}) => {
  const firestore = useFirestore();

  const incrementCounter = async () => {
    await updateDoc(doc(firestore, "votes", "settings"), {
      state: increment(incrementBy),
    });
  };

  return (
    <button
      disabled={
        (label === "previous" && currentState === 1) ||
        (label === "next" && currentState === 4)
      }
      onClick={() => incrementCounter()}
      className="relative flex w-full cursor-pointer flex-row items-center justify-center border-4 border-white bg-[#ab2e13] px-3 py-1 text-xl font-bold uppercase text-white shadow-xl disabled:opacity-50"
    >
      {label}
    </button>
  );
};
