import MainInput, { MainInputProps, MainInputRef } from "./MainInput";
import { forwardRef } from "react";
import { prompt } from "./stackSelector/types";
import Link from "next/link";

type InitialChatProps = MainInputProps & {
  initialValue?: string;
};

export const InitialChat = forwardRef<MainInputRef, InitialChatProps>(({
  value,
  onChange,
  onSubmit,
  isLoading,
  initialValue,
}, ref) => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <div>
      <h1
        className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight text-center text-primary md:whitespace-nowrap ">
        Qual tech você quer usar para integrar a Abacate? 🥑
      </h1>
      </div>
      <div className="h-40 w-full max-w-3xl flex flex-col justify-center items-center">
        {initialValue === prompt.lovable && (
          <div className="flex flex-row gap-4 items-center mb-4">
            <p className="text-sm text-muted-foreground text-center">
              Você pode{" "}
              <Link
                href="/lovable.txt" 
                download="abacatepay-lovable-prompt.txt"
                className="underline hover:text-muted-foreground/80 transition-colors"
              >
                baixar este prompt
              </Link>
              {" "}e usar na sua integração com a Lovable.
            </p>
          </div>
        )}
        <MainInput
          ref={ref}
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
          initialValue={initialValue}
        />
      </div>
      
    </div>
  );
});
