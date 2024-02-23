import { type FunctionComponent } from "react";

interface VoteBarProps {
  votes: number;
  overall: number;
  answer: string;
}

export const VoteBar: FunctionComponent<VoteBarProps> = ({
  answer,
  votes,
  overall,
}) => {
  const width = (votes / overall) * 2006;
  return answer === "D" && !votes ? (
    <></>
  ) : (
    <div className="flex h-[120px] flex-row items-center">
      <div className="font-eng flex h-full flex-row items-center justify-center border-[20px] border-r-0 border-white bg-blue-600 px-10 text-[100px] text-white">
        {answer}
      </div>
      <div
        style={{ width: `${width}px` }}
        className={`${votes !== 0 ? "" : "border-l-0 "}h-full max-w-[2006px] border-[20px] border-white bg-gradient-to-r from-[#ab2e13] via-[#e59c19] to-[#e5df19] transition-all duration-150 ease-in-out`}
      ></div>
    </div>
  );
};
