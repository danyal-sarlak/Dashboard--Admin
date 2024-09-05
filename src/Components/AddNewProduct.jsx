
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function AddNewProduct({ getAllProducts }) {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState(""); // ذخیره رشته Base64
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColors, setNewProductColors] = useState("");
  const navigate = useNavigate();

  const newProductsInfos = {
    id: uuidv4(),
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: newProductImg, // تصویر به صورت رشته Base64
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProductColors,
  };

  // تابع برای آپلود و تبدیل تصویر به Base64
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProductImg(reader.result); // ذخیره رشته Base64
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addNewProduct = async (event) => {
    event.preventDefault();

    const Authorization = localStorage.getItem("token");

    if (!Authorization) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://66a7a18753c13f22a3d08204.mockapi.io/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Authorization}`,
          },
          body: JSON.stringify(newProductsInfos),
        }
      );

      const res = await response.json();
      console.log(res);
      getAllProducts();
      emptyInputs();
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  function emptyInputs() {
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductCount("");
    setNewProductImg("");
    setNewProductPopularity("");
    setNewProductSale("");
    setNewProductColors("");
  }

  return (
    <div className="flex flex-col items-center mt-4 w-full md:mr-14 lg:mr-4 xl:mr-1 px-4 sm:px-6 md:px-8">
      <div className="lg:w-full w-full lg:max-w-7xl xl:max-w-full md:max-w-lg">
        <h1 className="text-2xl font-extrabold pb-4">افزودن محصول جدید</h1>

        <form
          className="bg-white p-6 rounded-lg drop-shadow-2xl"
          onSubmit={addNewProduct}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <input
                className="bg-slate-200 rounded-lg w-full p-3"
                type="text"
                value={newProductTitle}
                onChange={(event) => setNewProductTitle(event.target.value)}
                placeholder="اسم محصول را بنویسید"
              />
            </div>
            <div>
              <input
                className="bg-slate-200 rounded-lg w-full p-3"
                type="text"
                value={newProductPrice}
                onChange={(event) => setNewProductPrice(event.target.value)}
                placeholder="قیمت محصول را بنویسید"
              />
            </div>
            <div>
              <input
                className="bg-slate-200 rounded-lg w-full p-3"
                type="text"
                value={newProductCount}
                onChange={(event) => setNewProductCount(event.target.value)}
                placeholder="موجودی محصول را بنویسید"
              />
            </div>
            <div>
              {/* ورودی آپلود تصویر */}
              <input
                className="bg-slate-200 rounded-lg w-full p-3"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                
              
              />
            </div>
            <div>
              <input
                className="bg-slate-200 rounded-lg w-full p-3"
                type="text"
                value={newProductPopularity}
                onChange={(event) => setNewProductPopularity(event.target.value)}
                placeholder="میزان محبوبیت محصول را بنویسید"
              />
            </div>
            <div>
              <input
                className="bg-slate-200 rounded-lg w-full p-3"
                type="text"
                value={newProductSale}
                onChange={(event) => setNewProductSale(event.target.value)}
                placeholder="میزان فروش محصول را بنویسید"
              />
            </div>
            <div>
              <input
                className="bg-slate-200 rounded-lg w-full p-3"
                type="text"
                value={newProductColors}
                onChange={(event) => setNewProductColors(event.target.value)}
                placeholder="تعداد رنگ بندی محصول را بنویسید"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-600 p-2 text-white rounded-xl border border-black"
              type="submit"
            >
              ثبت محصول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
