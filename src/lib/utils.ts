import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useReadContract } from "wagmi";
import { abi, Deploy } from "@/constants";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getParticipants(courseId: number) {
  const { data: coursePartcipants } = useReadContract({
    abi: abi,
    functionName: "numParticipants",
    address: Deploy,
    args: [courseId],
  });
  if (!coursePartcipants) {
    return 0;
  }
  return Number(coursePartcipants);
}
