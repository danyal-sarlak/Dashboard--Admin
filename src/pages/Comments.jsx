
import React, { useEffect, useLayoutEffect, useState } from "react";
import ErrorBox from "../Components/ErrorBox";
import DeleteModal from "../Components/DeletModal/DeleteModal";
import DetailsModal from "../Components/DetailsModal/DetailsModal";
import EditModal from "../Components/EditModal/EditModal";
import { useNavigate } from "react-router-dom";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [commentID, setCommentID] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // حالت لودینگ
  const [error, setError] = useState(false); // حالت خطا
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const Authorisation = localStorage.getItem('token');
    if (!Authorisation) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    setError(false); // ریست کردن خطا قبل از درخواست
    setIsLoading(true); // فعال کردن حالت لودینگ
    try {
      let res = await fetch(
        "https://66a8a3abe40d3aa6ff58c470.mockapi.io/comments"
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      let comments = await res.json();
      setAllComments(comments);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false); // غیرفعال کردن حالت لودینگ
    }
  };

  const closeDetailModal = () => {
    setIsShowDetailsModal(false);
  };
  const closeDeleteModal = () => {
    setIsShowDeleteModal(false);
  };
  const closeEditModal = () => {
    setIsShowEditModal(false);
  };

  const deleteComment = async () => {
    setIsShowDeleteModal(false);
    await fetch(
      `https://66a8a3abe40d3aa6ff58c470.mockapi.io/comments/${commentID}`,
      {
        method: "DELETE",
      }
    );
    setAllComments(allComments.filter((comment) => comment.id !== commentID));
    getAllComments();
  };

  const updatComment = async (event) => {
    event.preventDefault();
    const newComment = {
      body: mainCommentBody,
    };

    await fetch(
      `https://66a8a3abe40d3aa6ff58c470.mockapi.io/comments/${commentID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    );
    setIsShowEditModal(false);
    getAllComments();
  };

  return (
    <div className="flex justify-center md:pr-36 lg:pr-10 xl:pr-0 pr-0 mt-4 px-2">
      {isLoading ? ( // نمایش اسپینر در حالت لودینگ
        <div className="flex justify-center mt-5 h-screen">
          <div className="spinner-border animate-spin inline-block w-10 h-10 border-dashed border-4 rounded-full border-current border-t-transparent text-blue-600" role="status">
          </div>
        </div>
      ) : error || allComments.length === 0 ? ( // بررسی خطا و عدم وجود کامنت
        <div className="w-full">
          <ErrorBox msg="هیچ کامنتی یافت نشد" />
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr className="text-center">
                <th className="p-2">اسم کاربر</th>
                <th className="p-2">محصول</th>
                <th className="p-2">کامنت</th>
                <th className="p-2">تاریخ</th>
                <th className="p-2">ساعت</th>
                <th className="p-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {allComments.map((comment) => (
                <tr
                  key={comment.id}
                  className="text-center border-b hover:bg-gray-100"
                >
                  <td className="p-2">{comment.userID}</td>
                  <td className="p-2">{comment.productID}</td>
                  <td className="p-2">
                    <button
                      className="bg-blue-600 rounded-lg p-1 text-white"
                      onClick={() => {
                        setIsShowDetailsModal(true);
                        setMainCommentBody(comment.body);
                      }}
                    >
                      دیدن متن
                    </button>
                  </td>
                  <td className="p-2">{comment.date}</td>
                  <td className="p-2">{comment.hour}</td>
                  <td className="flex justify-center flex-col md:flex-row gap-2 p-2">
                    <button
                      className="bg-red-500 rounded-lg p-1 text-white"
                      onClick={() => {
                        setCommentID(comment.id);
                        setIsShowDeleteModal(true);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      className="bg-yellow-500 rounded-lg p-1 text-white"
                      onClick={() => {
                        setIsShowEditModal(true);
                        setMainCommentBody(comment.body);
                        setCommentID(comment.id);
                      }}
                    >
                      ویرایش
                    </button>
                    <button className="bg-green-500 rounded-lg p-1 text-white">
                      پاسخ
                    </button>
                    <button className="bg-blue-500 rounded-lg p-1 text-white">
                      تایید
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailModal}>
          <p className="w-[90%] max-w-lg p-4 bg-white">{mainCommentBody}</p>
          <button
            className="bg-blue-600 p-2 rounded-lg text-white"
            onClick={closeDetailModal}
          >
            بستن
          </button>
        </DetailsModal>
      )}
      {isShowDeleteModal && (
        <DeleteModal cancelAction={closeDeleteModal} submitAction={deleteComment} />
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updatComment}>
          <textarea
            value={mainCommentBody}
            onChange={(event) => setMainCommentBody(event.target.value)}
            className="w-full h-32 p-2 border rounded-md"
          />
        </EditModal>
      )}
    </div>
  );
}
