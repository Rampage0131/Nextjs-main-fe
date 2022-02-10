import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import markdownRendererStyles from "./MarkdownRenderer.module.scss";

const MarkdownRenderer = ({ rawMarkdown }: { rawMarkdown: string; }) => {
    const [styleManager, setStyleManager] = useState(undefined);

    useEffect(() => {
        import('react-syntax-highlighter/dist/esm/styles/prism')
            .then(theme => {
                setStyleManager(theme.materialOceanic);
            });
    });

    return (
        <div className={markdownRendererStyles.markdown_container}>
            <ReactMarkdown
                children={rawMarkdown}
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');

                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={styleManager}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            />
        </div>
    );
};

export default MarkdownRenderer;