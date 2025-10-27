export type CloudinaryBuilder = {
    width: (w: number) => CloudinaryBuilder;
    height: (h: number) => CloudinaryBuilder;
    url: () => string;
};

export function urlFor(value: any): CloudinaryBuilder {
    // Simple fluent interface to mimic previous urlFor(...).width(...).height(...).url()
    const cfg: {
        cloudName: string;
        transformations: string[];
        publicId: string;
    } = {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
        transformations: [],
        publicId: "",
    };

    if (!value) {
        cfg.publicId = "";
    } else if (typeof value === "string") {
        cfg.publicId = value;
    } else if (typeof value === "object") {
        // Support objects with public_id or url
        cfg.publicId = value.public_id || value.publicId || value.path || "";
        if (!cfg.publicId && value.url) {
            // if full URL provided, just return an object that returns the URL
            const ret: CloudinaryBuilder = {
                width: () => ret,
                height: () => ret,
                url: () => value.url,
            };
            return ret;
        }
    }

    const obj: CloudinaryBuilder = {
        width: (w: number) => {
            cfg.transformations = cfg.transformations.filter((t) => !t.startsWith("w_"));
            cfg.transformations.push(`w_${w}`);
            return obj;
        },
        height: (h: number) => {
            cfg.transformations = cfg.transformations.filter((t) => !t.startsWith("h_"));
            cfg.transformations.push(`h_${h}`);
            return obj;
        },
        url: () => {
            if (!cfg.publicId) return "";
            if (!cfg.cloudName) {
                // Fallback to a relative path if cloud name is missing
                return cfg.publicId.startsWith("http") ? cfg.publicId : cfg.publicId;
            }
            const t = cfg.transformations.join(",");
            const transformationPath = t ? `/${t}` : "";
            return `https://res.cloudinary.com/${cfg.cloudName}/image/upload${transformationPath}/${cfg.publicId}`;
        },
    };

    return obj;
}

export function buildImageUrl(value: any, width?: number | null, height?: number | null) {
    const builder = urlFor(value);
    if (!builder) return "";
    if (width) builder.width(width);
    if (height) builder.height(height);
    return builder.url();
}
