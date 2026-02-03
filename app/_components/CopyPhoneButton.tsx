"use client";

import { useState } from "react";

interface CopyPhoneButtonProps {
  phone: string;
}

export default function CopyPhoneButton({ phone }: CopyPhoneButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-foreground text-sm font-normal hover:underline cursor-pointer bg-transparent border-none p-0"
    >
      {copied ? "Copiado!" : "Copiar"}
    </button>
  );
}
