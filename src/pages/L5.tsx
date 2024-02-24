/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { VoteBar } from "@/components/VoteBar";
import { data } from "@/data";
import { doc } from "firebase/firestore";
import { type FunctionComponent } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";

/* eslint-disable @next/next/no-img-element */
const L5 = () => {
  const firestore = useFirestore();
  const currentVote = doc(firestore, "votes/settings");

  const { status, data: currentVoteState } = useFirestoreDocData(currentVote);

  return (
    <main className="relative flex min-h-screen w-screen flex-col justify-between overflow-hidden bg-[url('/YW_CS_1.webp')] bg-cover bg-center px-72">
      <img
        src="/YWSS_Logo.webp"
        alt="logo"
        className="absolute left-1/2 top-12 z-10 h-[300px] -translate-x-1/2 object-cover"
      />
      <div className="absolute bottom-40 flex w-full max-w-[3410px] flex-row justify-between gap-32">
        {status === "success" && <QuestionBox state={currentVoteState.state} />}
        {status === "success" && <VoteGroup state={currentVoteState.state} />}
        {status === "success" && (
          <QuestionBox state={currentVoteState.state} right />
        )}
      </div>
    </main>
  );
};

export default L5;

interface VoteGroupProps {
  state: number;
}

const VoteGroup: FunctionComponent<VoteGroupProps> = ({ state }) => {
  return (
    <div className="flex h-full max-h-[675px] w-full flex-col items-start justify-end gap-12">
      <VoteBar state={state} answer="A" />
      <VoteBar state={state} answer="B" />
      <VoteBar state={state} answer="C" />
      <VoteBar state={state} answer="D" />
    </div>
  );
};

interface QuestionBoxProps {
  state: number;
  right?: boolean;
}

const QuestionBox: FunctionComponent<QuestionBoxProps> = ({ state, right }) => {
  const firestore = useFirestore();

  const { status, data: voteSettings } = useFirestoreDocData(
    doc(firestore, "votes", "settings"),
  );

  return (
    status === "success" && (
      <div className="relative h-[624px] max-h-[624px] min-w-[500px] max-w-[500px] border-[20px] border-white bg-[#ab2e13] p-7 text-center text-[4.5rem] font-bold tracking-widest text-[#fff]">
        {voteSettings.showQR && (
          <img
            src="/frame.webp"
            alt="QR"
            className={`absolute -top-1/3 ${right ? "-right-1/2" : "-left-1/2"}`}
          />
        )}
        {data[state]?.question}
      </div>
    )
  );
};
