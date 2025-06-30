import { Highlight } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
  isInline?: boolean;
}

export const CodeBlock = ({
  code,
  language = "text",
  isInline,
}: CodeBlockProps) => {
  if (isInline) {
    return (
      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-sm text-slate-800 dark:text-slate-200">
        {code}
      </code>
    );
  }

  return (
    <Highlight code={code.replace(/\n$/, "")} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="p-4 rounded-lg bg-code-dark dark:bg-slate-800 font-mono text-sm leading-6 max-w-full">
          <code className="block text-slate-900 dark:text-slate-50 overflow-x-auto whitespace-pre">
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className="whitespace-pre"
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
};
