import React, {useEffect, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {useDispatch, useSelector} from "react-redux";
import {closeModalComments} from "../../features/EmployeSModalToggle/employesModalToggle.js";

export default function CommentModal() {

    const isOpen = useSelector((state) => state.employesModal.isOpenComments);
    const dispatch = useDispatch();
    const [comments, setComments] = useState([
        {
            id: 1,
            user: {name: "John Doe"},
            comment: "<p>Bu birinchi comment</p>",
            created_at: "2 soat oldin",
        },
        {
            id: 2,
            user: {name: "Jane Smith"},
            comment: "<p>Ikkinchi comment matni</p>",
            created_at: "1 soat oldin",
        },
    ]);

    const openModal = () => {


        const quill = new Quill("#quill-comment-editor", {
            theme: "snow",
        });
        setEditor(quill);

    };


    const [editor, setEditor] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const quill = new Quill("#quill-comment-editor", {
                theme: "snow",
            });
            setEditor(quill);
        }
    }, [isOpen]);


    useEffect(() => {

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);


    const saveComment = () => {
        if (!editor) return;
        const html = editor.root.innerHTML;
        setComments([
            ...comments,
            {
                id: Date.now(),
                user: {name: "New User"},
                comment: html,
                created_at: "hozir",
            },
        ]);

    };

    return (
        <>


            <div
                className={`${isOpen ? "w-1/3 opacity-1" : " w-0 opacity-0"}  fixed overflow-scroll  scrollbar-hide top-0 right-0 bottom-0 h-[100dvh] bg-white shadow-2xl z-10   transition-all duration-300 ease-in-out   flex flex-col justify-between items-start `}>

                <div className="bg-white w-full px-6 shadow-lg h-full overflow-y-auto scrollbar-hide relative flex flex-col">
                    {/* Header */}
                    <div className={"flex items-center justify-between border-b border-blue p-4"}>
                        <p className={'text-blue font-bold text-lg'}>Comments</p>
                        <div onClick={() => dispatch(closeModalComments())}
                             className={'w-[30px] h-[30px] cursor-pointer hover:bg-gray-100 rounded center'}>
                            <i className={'fas fa-times text-blue '}></i>
                        </div>
                    </div>


                    <div className="flex-1 pt-5">
                        <div className="px-5 ">
                            <div className="  overflow-hidden bg-white">
                                <div
                                    id="quill-comment-editor"
                                    className="min-h-96   text-blue"
                                >
                                </div>
                            </div>
                        </div>


                        <div className="px-5 py-4 flex justify-end">
                            <button
                                type="button"
                                onClick={saveComment}
                                className="px-4 py-1 h-[35px] w-1/4 bg-blue text-white rounded text-sm font-semibold hover:ring-2 ring-blue transition"
                            >
                                Send <i className={"fa-solid fa-paper-plane"}></i>
                            </button>
                        </div>

                        <div className="space-y-3 px-5 pb-5">
                            {comments.map((c) => (
                                <div
                                    key={c.id}
                                    className="border-2 rounded-md shadow  bg-bacWhite overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700">

                                        <div className={'w-[25px] h-[25px] bg-purple-500 center rounded'}>
                                            <i className={'fa-solid fa-comment-dots  text-white'}></i>
                                        </div>


                                        <span className="font-bold text-blue">
                                                {c.user.name}
                                        </span>


                                        <span className="text-xs text-[#22c55e] bg-[#D3F3DF] font-semibold px-2 py-[2px] rounded">
                                            {c.created_at}
                                        </span>
                                    </div>


                                    <div
                                        className="mt-1 text-sm text-blue font-semibold leading-relaxed bg-white px-4 py-3"
                                        dangerouslySetInnerHTML={{__html: c.comment}}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
