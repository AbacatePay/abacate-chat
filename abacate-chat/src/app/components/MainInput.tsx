import IconSubmit from "@icons/submite";
import { Loader2 } from "lucide-react";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export interface MainInputProps {
  value: string;
  onChange: (s: string) => void;
  onSubmit: (s: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

export default function MainInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  initialValue,
}: MainInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrlWithQuery = useCallback((queryValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (queryValue.trim().length >= 3) {
      params.set('query', encodeURIComponent(queryValue));
    } else {
      params.delete('query');
    }
    
    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    router.replace(newUrl);
  }, [router, searchParams]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    updateUrlWithQuery(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(initialValue || value);
    }
  };

  const onPressSubmitButton = () => {
    onSubmit(initialValue || value);
  };

  return (
    <div
      className="
        flex flex-col w-full max-w-3xl rounded-2xl h-full
        bg-alt-custom
        focus-within:ring-1 focus-within:ring-green-abc
        focus-within:shadow-[0_0_16px] focus-within:shadow-green-abc
        focus-within:outline-none
        px-4 pt-5 pb-3
        z-1
      "
    >
      
      <textarea
        ref={textareaRef}
        onChange={handleTextareaChange}
        placeholder="Quero integrar a abacate com..."
        className="w-full h-full resize-none text-gray-dark text-base font-normal placeholder-gray-placeholder focus:outline-none"
        onKeyDown={handleKeyPress}
        value={initialValue || value}
      />

      <div className="flex flex-1 justify-end items-center">
        <button
          disabled={isLoading || (value.length === 0 && !initialValue)}
          onClick={onPressSubmitButton}
          className="cursor-pointer disabled:opacity-50 disabled:cursor-auto bg-green-abc rounded-full"
        >
          {!isLoading ? (
            <IconSubmit />
          ) : (
            <Loader2 className="w-5 h-5 animate-spin m-2" />
          )}
        </button>
      </div>
    </div>
  );
}
