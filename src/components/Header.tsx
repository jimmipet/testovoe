import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Header = ({ onCardAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [photo, setPhoto] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("0");
  const [count, setCount] = useState("0");

  const generateUniqueId = () => {
    return uuidv4();
  };

  const closeModal = () => {
    if (isFormValid) {
      addCardToServer();
      setIsOpen(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    setIsFormValid(false);
  };

  const handlePhotoChange = (value) => {
    setPhoto(value);
    checkFormValidity();
  };

  const handleAboutChange = (value) => {
    setAbout(value);
    checkFormValidity();
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    checkFormValidity();
  };

  const handleCountChange = (value) => {
    setCount(value);
    checkFormValidity();
  };

  const checkFormValidity = () => {
    const isValid =
      photo.trim() !== "" &&
      about.trim() !== "" &&
      price.trim() !== "" &&
      count.trim() !== "";
    setIsFormValid(isValid);
  };

  const addCardToServer = () => {
    const newCard = {
      id: generateUniqueId(),
      photo: photo,
      about: about,
      price: Number(price),
      count: Number(count),
    };

    axios
      .post("http://localhost:3001/cards", newCard)
      .then((response) => {
        console.log("Card added successfully:", response.data);
        onCardAdded();
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error adding card to server:", error);
      });
  };

  return (
    <div className="flex items-center justify-between h-[100px] sticky top-0 bg-white mb-6 z-10 px-4">
      <h1 className="text-4xl">Каталог Товаров на складе</h1>
      <div className=" justify-end">
        <button
          onClick={openModal}
          className="text-xl bg-white hover:bg-gray-200 text-black font-mono py-2 px-4 rounded-md transition duration-300 ease-in-out"
          disabled={isFormValid}
        >
          Добавить карточку
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Добавление товара
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-xl text-gray-500">
                      Здесь вы можете добавить товар на склад
                    </p>
                    <form action="" className="flex items-start flex-col mt-6">
                      <div className="relative flex flex-col">
                        <input
                          id="photo"
                          type="url"
                          value={photo}
                          onChange={(e) => handlePhotoChange(e.target.value)}
                          className="w-80 md:w-85 h-[calc(3.5rem + 2px)] p-4 font-normal text-base bg-white bg-clip-padding-box border border-gray-300 rounded-md transition duration-150 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-outline-blue focus:placeholder-opacity-0 focus:bg-gray-100"
                        />
                        <label
                          className={`absolute top-0 left-0 h-full p-4 pointer-events-none border-transparent transform-origin-0 transition-transform duration-150 ease-in-out z-2 ${
                            photo
                              ? "text-sm -translate-y-4 text-gray-500"
                              : "text-gray-500"
                          }`}
                        >
                          Вставьте ссылку на фотографию
                        </label>
                      </div>

                      <div className="relative flex flex-col">
                        <input
                          id="about"
                          type="text"
                          value={about}
                          onChange={(e) => handleAboutChange(e.target.value)}
                          className="w-80 md:w-85 h-[calc(3.5rem + 2px)] p-4 font-normal text-base bg-white bg-clip-padding-box border border-gray-300 rounded-md transition duration-150 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-outline-blue focus:placeholder-opacity-0 focus:bg-gray-100"
                        />
                        <label
                          className={`absolute top-0 left-0 h-full p-4 pointer-events-none border-transparent transform-origin-0 transition-transform duration-150 ease-in-out z-2 ${
                            about
                              ? "text-sm -translate-y-4 text-gray-500"
                              : "text-gray-500"
                          }`}
                        >
                          Измените описание
                        </label>
                      </div>

                      <div className="relative flex flex-col">
                        <input
                          id="about"
                          type="number"
                          value={price}
                          onChange={(e) => handlePriceChange(e.target.value)}
                          className="w-80 md:w-85 h-[calc(3.5rem + 2px)] p-4 font-normal text-base bg-white bg-clip-padding-box border border-gray-300 rounded-md transition duration-150 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-outline-blue focus:placeholder-opacity-0 focus:bg-gray-100"
                        />
                        <label
                          className={`absolute top-0 left-0 h-full p-4 pointer-events-none border-transparent transform-origin-0 transition-transform duration-150 ease-in-out z-2 ${
                            price
                              ? "text-sm -translate-y-4 text-gray-500"
                              : "text-gray-500"
                          }`}
                        >
                          Измените цену
                        </label>
                      </div>

                      <div className="relative flex flex-col">
                        <input
                          id="about"
                          type="number"
                          value={count}
                          onChange={(e) => handleCountChange(e.target.value)}
                          className="w-80 md:w-85 h-[calc(3.5rem + 2px)] p-4 font-normal text-base bg-white bg-clip-padding-box border border-gray-300 rounded-md transition duration-150 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-outline-blue focus:placeholder-opacity-0 focus:bg-gray-100"
                        />
                        <label
                          className={`absolute top-0 left-0 h-full p-4 pointer-events-none border-transparent transform-origin-0 transition-transform duration-150 ease-in-out z-2 ${
                            count
                              ? "text-sm -translate-y-4 text-gray-500"
                              : "text-gray-500"
                          }`}
                        >
                          Измените количество на складе
                        </label>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Header;
