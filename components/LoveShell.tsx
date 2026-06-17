"use client";

import { LoveProvider } from "@/components/love/LoveProvider";
import LoveButton from "@/components/LoveButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import type { ReactNode } from "react";

export default function LoveShell({ children }: { children: ReactNode }) {
  return (
    <LoveProvider>
      {children}
      <LoveButton />
      <FloatingWhatsApp />
    </LoveProvider>
  );
}
