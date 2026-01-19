import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the type for blog post metadata
export interface BlogPost {
    slug: string;
    frontmatter: {
        title: string;
        date: string;
        description: string;
        [key: string]: any;
    };
    content: string;
}

const postsDirectory = path.join(process.cwd(), "public/blogs");

export function getBlogPosts(): BlogPost[] {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");

            const { data, content } = matter(fileContents);

            return {
                slug,
                frontmatter: data as BlogPost["frontmatter"],
                content,
            };
        });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.frontmatter.date < b.frontmatter.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getBlogPost(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            frontmatter: data as BlogPost["frontmatter"],
            content,
        };
    } catch (e) {
        return null;
    }
}
