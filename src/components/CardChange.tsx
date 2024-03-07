import React, { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

const CardChange = ({ id }: { id: string }) => {
  const router = useRouter();
  const [cardsInfo, setCardsInfo] = useState<any>([""]);
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("0");
  const [count, setCount] = useState("0");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (!isOpen) {
      saveChanges();
    }
  }, [isOpen]);

  async function deleteCard() {
    const confirmDelete = window.confirm(
      "Вы точно хотите удалить товар? Это действие нельзя отменить."
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/cards/${id}`);
        router.push("/");
        setCardsInfo({});
        closeModal();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  }

  async function saveChanges() {
    try {
      if (!photo || !about || !price || !count) {
        return;
      }

      const updatedCard = {
        photo: photo,
        about: about,
        price: Number(price),
        count: Number(count),
      };

      console.log(updatedCard);
      await axios.put(`http://localhost:3001/cards/${id}`, updatedCard);

      setCardsInfo(updatedCard);
      closeModal();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/cards?id=${id}`
        );
        setPhoto(response.data[0]?.photo || "");
        setAbout(response.data[0]?.about || "");
        setPrice(String(response.data[0]?.price || "0"));
        setCount(String(response.data[0]?.count || "0"));
        setCardsInfo(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="w-full h-[100%]">
      <div className="flex  flex-col w-full h-[100%] items-center">
        <div className="flex items-center justify-center h-[10%] mb-6">
          <h2 className="text-3xl">Информация о товаре и редактирвоание</h2>
        </div>

        <div className="w-[70%] h-[80%] flex justify-between rounded-[35px] ring-2 ring-gray-300 shadow-xl">
          <div className="rounded-[20px] h-[95%] w-[35%] relative m-3 flex flex-col">
            <div className="rounded-[20px] h-[90%] w-[100%] relative flex flex-col">
              {cardsInfo?.photo ? (
                <Image
                  src={cardsInfo?.photo}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[20px]"
                  priority={true}
                />
              ) : (
                <p>Изображение не найдено</p>
              )}
            </div>
            <button
              onClick={openModal}
              className="mt-5 text-2xl bg-white hover:bg-gray-200 text-black font-mono py-2 px-4 rounded-[10px] transition duration-300 ease-in-out"
            >
              Редактировать
            </button>
            <button
              onClick={deleteCard}
              className="mt-2 text-2xl bg-white hover:bg-gray-200 text-black font-mono py-2 px-4 rounded-[10px] transition duration-300 ease-in-out"
            >
              Удалить карточку
            </button>
          </div>

          <div className="flex flex-col w-[50%] justify-around">
            <div>
              <h3 className="text-5xl mb-4">Описание товара</h3>
              <p className="text-xl">{cardsInfo?.about}</p>
            </div>

            <div className="flex items-center">
              <p className="text-3xl">Цена</p>
              <span className="ml-7 text-2xl">{cardsInfo?.price},$</span>
            </div>

            <div className="flex items-center">
              <p className="text-3xl">Количество на складе</p>
              <span className="ml-7 text-2xl">{cardsInfo?.count}, шт</span>
            </div>
          </div>
        </div>
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
                    Редактирование товара
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-xl text-gray-500">
                      Здесь вы можете изменить карточку товара на вашем складе
                    </p>
                    <form action="" className="flex items-start flex-col mt-6">
                      <div className="relative flex flex-col">
                        <input
                          id="photo"
                          type="url"
                          value={photo}
                          onChange={(e) => setPhoto(e.target.value)}
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
                          onChange={(e) => setAbout(e.target.value)}
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
                          onChange={(e) => setPrice(e.target.value)}
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
                          onChange={(e) => setCount(e.target.value)}
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

export default CardChange;

