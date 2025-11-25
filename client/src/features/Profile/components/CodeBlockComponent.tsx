import React, { useState } from 'react';
import { RiFileCopyLine, RiCheckLine } from 'react-icons/ri';

interface CodeBlockComponentProps {
    code: string;
    language?: string;
    title?: string;
}

const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({
    code,
    language = 'javascript',
    title = 'Code Snippet'
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-linesColor bg-cardItemBg">
            <div className="flex items-center justify-between px-4 py-2 bg-cardBg border-b border-linesColor">
                <span className="text-xs font-medium text-textColorWeak uppercase">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-medium text-textColorWeak hover:text-textColor transition-colors"
                >
                    {copied ? (
                        <>
                            <RiCheckLine className="text-green-500" />
                            <span className="text-green-500">Copied!</span>
                        </>
                    ) : (
                        <>
                            <RiFileCopyLine />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-textColor leading-relaxed">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

export default CodeBlockComponent;
