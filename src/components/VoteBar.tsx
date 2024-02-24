/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { collection } from "firebase/firestore";
import { type FunctionComponent, useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

interface VoteBarProps {
  state: number;
  answer: string;
}

export const VoteBar: FunctionComponent<VoteBarProps> = ({ answer, state }) => {
  const firestore = useFirestore();

  const vote = collection(firestore, "votes");

  const { status, data } = useFirestoreCollectionData(vote);
  console.log("data", data);

  const votes =
    status === "success"
      ? parseInt(data.find((a) => a.NO_ID_FIELD === String(state))?.[answer])
      : 0;
  const overall =
    status === "success"
      ? parseInt(data.find((a) => a.NO_ID_FIELD === String(state))?.totalCount)
      : 0;

  status === "success" &&
    console.log(
      data.find((a) => a.NO_ID_FIELD === String(state)),
      "votes",
      votes,
    );
  status === "success" &&
    console.log(
      data.find((a) => a.NO_ID_FIELD === String(state)),
      "overall",
      overall,
    );

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth((votes / overall) * 2006);
  }, [answer, overall, votes]);

  return status === "success" && answer === "D" && !votes ? (
    <></>
  ) : (
    <div className="flex h-[120px] flex-row items-center">
      <div
        className={`${votes !== 0 ? "border-r-0 " : ""}font-eng flex h-full flex-row items-center justify-center border-[20px] border-white bg-blue-600 px-10 text-[100px] text-white`}
      >
        {answer}
      </div>
      {width && (
        <div
          style={{ width: `${width}px` }}
          className={`h-full max-w-[2006px] border-[20px] border-white bg-gradient-to-r from-[#ab2e13] via-[#e59c19] to-[#e5df19] transition-all duration-200 ease-in-out`}
        />
      )}
    </div>
  );
};
