import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

type BlogType = {
    id: number;
    title: string;
    content: string;
};

interface IndexProps extends PageProps<{ blogs: BlogType[] }> {}

const Index = ({ auth, blogs }: IndexProps) => {
    const { delete: destroy } = useForm();
    const handleDelete = (id: number) => {
        destroy(route("blog.destroy", id), {
            preserveScroll: true, // 削除後に削除した要素の位置までスクロールする
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Blog
                </h2>
            }
        >
            <Head title="Blog Index" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div>
                                <Link href={route("blog.create")}>
                                    <PrimaryButton type="button">
                                        新規作成
                                    </PrimaryButton>
                                </Link>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>タイトル</th>
                                        <th>コンテンツ</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map((blog: BlogType) => {
                                        return (
                                            <tr key={blog.id}>
                                                <td className="border px-4 py-2">
                                                    {blog.title}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {blog.content}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        href={route(
                                                            "blog.edit",
                                                            blog.id
                                                        )}
                                                    >
                                                        <PrimaryButton
                                                            type="button"
                                                            className="bg-green-600 text-white"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    blog.id
                                                                )
                                                            }
                                                        >
                                                            編集
                                                        </PrimaryButton>
                                                    </Link>
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <PrimaryButton
                                                        type="button"
                                                        className="bg-red-600 text-white"
                                                        onClick={() =>
                                                            handleDelete(
                                                                blog.id
                                                            )
                                                        }
                                                    >
                                                        削除
                                                    </PrimaryButton>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
