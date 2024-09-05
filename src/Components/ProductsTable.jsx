import React, { useEffect, useState } from "react";
import DeleteModal from "./DeletModal/DeleteModal";
import DetailsModal from "./DetailsModal/DetailsModal";
import EditModal from "./EditModal/EditModal";
import { AiOutlineDollar } from "react-icons/ai";
import ErrorBox from "./ErrorBox";
import { useNavigate } from "react-router-dom"; // For navigation

export default function ProductsTable({ allProducts, getAllProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [error, setError] = useState(false); // State for handling errors

  const [productID, setProductID] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState(null);

  const [productNewTitle, setProductNewTitle] = useState('');
  const [productNewPrice, setProductNewPrice] = useState('');
  const [productNewCount, setProductNewCount] = useState('');
  const [productNewImg, setProductNewImg] = useState('');
  const [productNewPopularity, setProductNewPopularity] = useState('');
  const [productNewSale, setProductNewSale] = useState('');
  const [productNewColors, setProductNewColors] = useState('');

  const navigate = useNavigate();

  // Check if token exists in localStorage
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  // Fetch products and handle loading state
  useEffect(() => {
    const fetchProducts = async () => {
      setError(false); // Reset error state
      try {
        await getAllProducts();
      } catch (err) {
        setError(true);
      }
    };

    fetchProducts();
  }, [getAllProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 ثانیه تاخیر برای شبیه‌سازی بارگذاری
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteYes = async () => {
    try {
      const response = await fetch(`https://66a7a18753c13f22a3d08204.mockapi.io/product/${productID}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      console.log("Product deleted");
      setIsShowDeleteModal(false);
      getAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteNo = () => {
    setIsShowDeleteModal(false);
  };

  const closeDetailmodal = () => {
    setIsShowDetailsModal(false);
  };

  const updateProductInfos = async (event) => {
    event.preventDefault();
    const newProductsInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors
    };

    try {
      const response = await fetch(`https://66a7a18753c13f22a3d08204.mockapi.io/product/${productID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProductsInfos)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();
      console.log("Product updated:", result);
      setIsShowEditModal(false);
      getAllProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle button clicks based on authentication status
  const handleButtonClick = (action, product) => {
    if (!isAuthenticated()) {
      navigate('/login'); // Redirect to login page
      return;
    }

    switch (action) {
      case 'details':
        setMainProductInfos(product);
        setIsShowDetailsModal(true);
        break;
      case 'delete':
        setProductID(product.id);
        setIsShowDeleteModal(true);
        break;
      case 'edit':
        setIsShowEditModal(true);
        setProductID(product.id);
        setProductNewTitle(product.title || '');
        setProductNewPrice(product.price || '');
        setProductNewCount(product.count || '');
        setProductNewImg(product.img || '');
        setProductNewPopularity(product.popularity || '');
        setProductNewSale(product.sale || '');
        setProductNewColors(product.colors || '');
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-5 h-screen">
          <div className="spinner-border animate-spin inline-block w-10 h-10 border-dashed border-4 rounded-full border-current border-t-transparent text-blue-600" role="status">
          </div>
        </div>
      ) : error || allProducts.length === 0 ? ( // Check if there's an error or no products
        <ErrorBox msg="هیچ محصولی یافت نشد" />
      ) : (
        <div className="flex   justify-centr md:max-w-lg  lg:max-w-7xl xl:mr-0 xl:max-w-full overflow-x-auto flex-col md:mr-32 lg:mr-8 xl:mr-3">
       <table className="mt-7 bg-white rounded-lg text-sm md:text-base w-full">
  <thead>
    <tr className="text-center">
      <th className="p-2 md:p-3 lg:p-5 w-1/5">عکس</th>
      <th className="p-2 md:p-3 lg:p-5 w-1/5">اسم</th>
      <th className="p-2 md:p-3 lg:p-5 w-1/5">قیمت</th>
      <th className="p-2 md:p-3 lg:p-5 w-1/5">موجودی</th>
      <th className="p-2 md:p-3 lg:p-5 w-1/5">عملیات</th>
    </tr>
  </thead>
  <tbody>
    {allProducts.map((product) => (
      <tr key={product.id} className="text-center">
        <td className="p-2 md:p-3 lg:p-5">
          <img
            className="w-28 h-12 md:w-36 md:h-20 lg:h-24 xl:h-32 rounded-lg mx-auto"
            src={product.img}
            alt="Product"
          />
        </td>
        <td className="p-2 md:p-3 lg:p-5">{product.title || "بدون عنوان"}</td>
        <td className="p-2 md:p-3 lg:p-5">{product.price || "نامشخص"}</td>
        <td className="p-2 md:p-3 lg:p-5">{product.count || "نامشخص"}</td>
        <td className="p-2 md:p-3 lg:p-5 lg:pt-10 flex flex-wrap lg:flex-nowrap  justify-center gap-1 md:gap-2">
          <button
            className="p-1 md:p-3 rounded-lg text-white bg-blue-600"
            onClick={() => handleButtonClick('details', product)}
          >
            جزییات
          </button>
          <button
            className="p-1 md:p-3 rounded-lg text-white bg-blue-600"
            onClick={() => handleButtonClick('delete', product)}
          >
            حذف
          </button>
          <button
            className="p-1 md:p-3 rounded-lg text-white bg-blue-600"
            onClick={() => handleButtonClick('edit', product)}
          >
            ویرایش
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        {isShowDeleteModal && (
          <DeleteModal
          
            submitAction={handleDeleteYes}
            cancelAction={handleDeleteNo}
          />
        )}
        {isShowDetailsModal && (
          <DetailsModal onHide={closeDetailmodal}>
            <div className="overflow-x-auto">
              <table className="rounded-lg bg-white w-full">
                <thead>
                  <tr className="text-center">
                    <th className="p-3 md:p-5">اسم</th>
                    <th className="p-3 md:p-5">محبوبیت</th>
                    <th className="p-3 md:p-5">فروش</th>
                    <th className="p-3 md:p-5">رنگ‌ها</th>
                  </tr>
                </thead>
                <tbody>
                  {mainProductInfos ? (
                    <tr className="text-center">
                      <td className="p-3 md:p-5">{mainProductInfos.title || "بدون عنوان"}</td>
                      <td className="p-3 md:p-5">{mainProductInfos.popularity || "نامشخص"}%</td>
                      <td className="p-3 md:p-5">{mainProductInfos.sale || "نامشخص"}</td>
                      <td className="p-3 md:p-5">{mainProductInfos.colors || "نامشخص"}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="p-3 md:p-5" colSpan="4">
                        اطلاعاتی یافت نشد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button
                className="mt-4 p-2 bg-blue-600 text-white rounded-lg"
                onClick={closeDetailmodal}
              >
                بستن
              </button>
            </div>
          </DetailsModal>
        )}
        {isShowEditModal && (
          <EditModal
            onClose={() => setIsShowEditModal(false)}
            onSubmit={updateProductInfos}
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 w-full bg-slate-200 pr-5 rounded-lg">
                <AiOutlineDollar />
                <input
                  type="text"
                  className="border-none rounded-lg bg-slate-200 outline-none text-sm md:text-lg w-full p-2"
                  placeholder="عنوان جدید را وارد کنید"
                  value={productNewTitle}
                  onChange={(e) => setProductNewTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full bg-slate-200 pr-5 rounded-lg">
                <AiOutlineDollar />
                <input
                  type="text"
                  className="border-none rounded-lg bg-slate-200 outline-none text-sm md:text-lg w-full p-2"
                  placeholder="قیمت جدید را وارد کنید"
                  value={productNewPrice}
                  onChange={(e) => setProductNewPrice(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full bg-slate-200 pr-5 rounded-lg">
                <AiOutlineDollar />
                <input
                  type="text"
                  className="border-none rounded-lg bg-slate-200 outline-none text-sm md:text-lg w-full p-2"
                  placeholder="موجودی جدید را وارد کنید"
                  value={productNewCount}
                  onChange={(e) => setProductNewCount(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full bg-slate-200 pr-5 rounded-lg">
                <AiOutlineDollar />
                <input
                  type="text"
                  className="border-none rounded-lg bg-slate-200 outline-none text-sm md:text-lg w-full p-2"
                  placeholder="آدرس کاور جدید را وارد کنید"
                  value={productNewImg}
                  onChange={(e) => setProductNewImg(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full bg-slate-200 pr-5 rounded-lg">
                <AiOutlineDollar />
                <input
                  type="text"
                  className="border-none rounded-lg bg-slate-200 outline-none text-sm md:text-lg w-full p-2"
                  placeholder="محبوبیت جدید را وارد کنید"
                  value={productNewPopularity}
                  onChange={(e) => setProductNewPopularity(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full bg-slate-200 pr-5 rounded-lg">
                <AiOutlineDollar />
                <input
                  type="text"
                  className="border-none rounded-lg bg-slate-200 outline-none text-sm md:text-lg w-full p-2"
                  placeholder="میزان فروش را وارد کنید"
                  value={productNewSale}
                  onChange={(e) => setProductNewSale(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full bg-slate-200 pr-5 rounded-lg">
                <AiOutlineDollar />
                <input
                  type="text"
                  className="border-none rounded-lg bg-slate-200 outline-none text-sm md:text-lg w-full p-2"
                  placeholder="تعداد رنگ بندی را وارد کنید"
                  value={productNewColors}
                  onChange={(e) => setProductNewColors(e.target.value)}
                />
              </div>
            </div>
          </EditModal>
        )}
      </div>
      )}
    </>
  );
}



