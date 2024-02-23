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
        {status === "success" && <QuestionBox state={currentVoteState.state} />}
      </div>
    </main>
  );
};

export default L5;

interface VoteGroupProps {
  state: number;
}

const VoteGroup: FunctionComponent<VoteGroupProps> = ({ state }) => {
  const firestore = useFirestore();
  const vote = doc(firestore, "votes", String(state));

  const { status, data } = useFirestoreDocData(vote);

  return (
    status === "success" && (
      <div className="flex h-full max-h-[675px] w-full flex-col items-start justify-end gap-12">
        <VoteBar
          votes={data.A}
          overall={parseInt(data.totalCount)}
          answer="A"
        />
        <VoteBar
          votes={data.B}
          overall={parseInt(data.totalCount)}
          answer="B"
        />
        <VoteBar
          votes={data.C}
          overall={parseInt(data.totalCount)}
          answer="C"
        />
        <VoteBar
          votes={data.D}
          overall={parseInt(data.totalCount)}
          answer="D"
        />
      </div>
    )
  );
};

interface QuestionBoxProps {
  state: number;
}

const QuestionBox: FunctionComponent<QuestionBoxProps> = ({ state }) => {
  return (
    <div className="h-[624px] max-h-[624px] min-w-[500px] max-w-[500px] border-[20px] border-white bg-[#ab2e13] p-12 text-center text-[5rem] font-bold tracking-widest text-[#fff]">
      {data[state]?.question}
    </div>
  );
};
