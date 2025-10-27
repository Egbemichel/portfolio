import React from "react";

export function PortableText({ value }: { value: any }) {
    if (!value) return null;
    if (typeof value === "string") return <div>{value}</div>;
    if (Array.isArray(value))
        return (
            <div>
                {value.map((v: any, i: number) => (
                    <div key={i}>{typeof v === "string" ? v : JSON.stringify(v)}</div>
                ))}
            </div>
        );
    return <div>{String(value)}</div>;
}

export default PortableText;

