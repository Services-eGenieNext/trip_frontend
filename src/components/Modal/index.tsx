import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import RatingStars from "@/components/UIComponents/RatingStars";
import InputField from "../UIComponents/InputField/InputField";
import { validateHeaderValue } from "http";
import Textarea from "../UIComponents/InputField/textarea";

interface IReview {
  first_name: string;
  last_name: string;
  review: string;
}

export default function Modal({ openModal, setOpenModal, modalFor }: any) {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState<IReview>({
    first_name: "",
    last_name: "",
    review: "",
  });

  const handleValue = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(value, "vlauessss");
  }, [value]);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (openModal == true) {
      setOpen(openModal);
    }
    if (open == false) {
      setOpenModal(open);
    }
  }, [openModal, open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-auto1">
                <div className="bg-white md:px-10 px-5 pt-14 pb-10">
                  <div className="w-full">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <p className="text-[#2D2D2D] text-[33px] font-medium">
                        Write Your Review
                      </p>
                      <div className="mt-5 flex justify-center items-center w-full">
                        <div className="flex lg:flex-row flex-col items-center lg:justify-between justify-center w-full lg:gap-x-8 gap-x-0 lg:gap-y-0 md:gap-y-8 gap-y-2">
                          <p className="uppercase text-[12px] font-medium">
                            please rate us
                          </p>
                          <div className="flex items-center md:gap-x-1 gap-x-0">
                            <RatingStars />
                          </div>
                            <InputField
                              type="text"
                              label="FIRST NAME"
                              value={value.first_name}
                              onChange={(e) => {
                                handleValue(e);
                              }}
                              placeholder="Jhon"
                              name="first_name"
                              className="md:mt-0 mt-7"
                            />
                            <InputField
                              type="text"
                              label="LAST NAME"
                              value={value.last_name}
                              onChange={(e) => {
                                handleValue(e);
                              }}
                              placeholder="Jhon"
                              name="last_name"
                              className="md:mt-0 mt-7"
                            />
                        </div>
                      </div>
                      <Textarea
                              label="WRITE YOUR REVIEW"
                              value={value.review}
                              onChange={(e) => {
                                handleValue(e);
                              }}
                              placeholder="Jhon"
                              name="review"
                              className="mt-7"
                            />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 pb-14 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#009DE2] px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
