"use client";

import dynamic from "next/dynamic";

const LanyardSection = dynamic(() => import("@/components/LanyardSection"), { ssr: false });

export default function LanyardDynamic() {
  return <LanyardSection />;
}
