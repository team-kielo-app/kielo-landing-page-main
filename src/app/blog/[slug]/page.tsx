import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import KieloNav from "@/components/KieloNav";
import Footer from "@/components/Footer";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Function to generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        return {
            title: "Post Not Found - Kielo",
        };
    }

    return {
        title: `${post.frontmatter.title} - Kielo Blog`,
        description: post.frontmatter.description,
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            type: "article",
            publishedTime: post.frontmatter.date,
        },
    };
}

// Static Params Generation
export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <div className="bg-[#fcfaf2] w-full flex justify-center px-4 md:px-0">
                <KieloNav />
            </div>
            <main className="bg-[#fcfaf2] min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
                        {/* Header */}
                        <header className="mb-8 border-b border-gray-100 pb-8">
                            <Link
                                href="/blog"
                                className="text-[#898bdb] hover:text-[#7678c9] font-medium inline-flex items-center mb-6 text-sm"
                            >
                                ← Back to Blog
                            </Link>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#374151] mb-4 tracking-tight leading-tight">
                                {post.frontmatter.title}
                            </h1>
                            <time className="text-[#6B7280] text-sm">
                                {post.frontmatter.date}
                            </time>
                        </header>

                        {/* Content */}
                        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-[#374151] prose-headings:font-bold prose-p:text-[#374151] prose-a:text-[#898bdb] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#374151] prose-blockquote:border-l-[#898bdb] prose-blockquote:bg-[#E8E4F8] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-code:text-[#898bdb] prose-code:bg-[#E8E4F8] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl prose-li:marker:text-[#898bdb] prose-th:text-[#374151] prose-hr:border-[#898bdb]/30">
                            <MDXRemote
                                source={post.content}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm],
                                    },
                                }}
                            />
                        </div>

                        {/* Footer */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <p className="text-[#374151] text-center italic mb-6">
                                Ready to start learning?
                            </p>
                            <div className="flex justify-center">
                                <Link
                                    href="/#download"
                                    className="bg-[#898bdb] hover:bg-[#7678c9] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
                                >
                                    Download Kielo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
