/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FunctionComponent } from "react";

import { doc, increment, updateDoc } from "firebase/firestore";
import { useGameState } from "@/stores/useGame";
import { useFirestore } from "reactfire";
import { data } from "@/data";

interface VoteButtonProps {
  state: number;
  label: "a" | "b" | "c" | "d";
  admin?: boolean;
}

export const VoteButton: FunctionComponent<VoteButtonProps> = ({
  state,
  label,
  admin,
}) => {
  const localGameState = useGameState();
  const firestore = useFirestore();
  const incrementCounter = async () => {
    // @ts-expect-error unable to type returned data type from firebase
    localGameState.answers(state);
    await updateDoc(doc(firestore, "votes", String(state)), {
      [label.toUpperCase()]: increment(1),
      totalCount: increment(1),
    });
  };

  return (
    (admin ?? data[state]?.[label]) && (
      <button
        // @ts-expect-error unable to type returned data type from firebase
        disabled={localGameState[parseInt(state)] || admin}
        onClick={() => incrementCounter()}
        className="relative flex w-full cursor-pointer flex-row items-center justify-center border-4 border-b-[12px] border-white bg-[#ab2e13] px-3 py-2 text-xl font-bold uppercase text-white shadow-xl"
      >
        <span className="absolute -left-7 -top-3 border-4 border-white bg-blue-800 p-1 px-2">
          {label}
        </span>
        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
        {data[state]?.[label] || "-"}
      </button>
    )
  );
};
