"use client";
import { useWorker, WORKER_STATUS } from "@koale/useworker";
import bubbleSort from "./bublesort";
import nextImg from "@/public/next.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
const numbers = [...Array(50000)].map(() =>
  Math.floor(Math.random() * 1000000)
);

let turn = 0;

function infiniteLoop() {
  const logo = document.querySelector(".App-logo");
  turn += 8;
  (logo as any).style.transform = `rotate(${turn % 360}deg)`;
}

export default function Page() {
  const [sortStatus, setSortStatus] = useState(false);
  const [sortWorker, { status: sortWorkerStatus }] = useWorker(bubbleSort);
  console.log("WORKER:", sortWorkerStatus);

  const onSortClick = () => {
    setSortStatus(true);
    const result = bubbleSort(numbers);
    setSortStatus(false);
    console.log("Buble Sort", result);
    toast(`no web worker:Buble Sort 被執行 ${result} `);
  };

  const onWorkerSortClick = () => {
    sortWorker(numbers).then((result) => {
      console.log("Buble Sort useWorker()", result);
      toast(`web worker: 被執行完成 ${result}`);
    });
  };

  useEffect(() => {
    const loopInterval = setInterval(infiniteLoop, 100);
    return () => clearInterval(loopInterval);
  }, []);
  return (
    <>
      <div className="fixed w-1/3 h-1/3 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <Image src={nextImg} alt="logo" className="App-logo" />
      </div>
      <Toaster />
      <div className="flex gap-4">
        <Button onClick={onSortClick} disabled={sortStatus}>
          不觸發 web worker
        </Button>
        <Button onClick={onWorkerSortClick} disabled={sortStatus}>
          觸發web worker
        </Button>
      </div>
    </>
  );
}
