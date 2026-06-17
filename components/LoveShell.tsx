"use client";

import { LoveProvider } from "@/components/love/LoveProvider";
import LoveButton from "@/components/LoveButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import type { GalleryLoveImage } from "@/lib/db";
import type { ReactNode } from "react";

type InitialLove = {
  total: number;
  images: Record<string, GalleryLoveImage>;
};

type Props = {
  children: ReactNode;
  initialLove?: InitialLove;
};

export default function LoveShell({ children, initialLove }: Props) {
  return (
    <LoveProvider initialLove={initialLove}>
      {children}
      <LoveButton />
      <FloatingWhatsApp />
    </LoveProvider>
  );
}
