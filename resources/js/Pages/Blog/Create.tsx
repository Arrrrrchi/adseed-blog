import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

const Create = ({ auth }: PageProps) => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("blog.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    記事作成
                </h2>
            }
        >
            <Head title="Create" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputError message={errors.title} />
                                    <InputLabel
                                        htmlFor="title"
                                        value="タイトル"
                                    />
                                    <TextInput
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-1/4"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputError message={errors.content} />
                                    <InputLabel
                                        htmlFor="content"
                                        value="本文"
                                    />
                                    <TextInput
                                        type="text"
                                        name="content"
                                        value={data.content}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("content", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        作成
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
