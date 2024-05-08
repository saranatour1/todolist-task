import Image from "next/image";
import person from "../../../public/person.svg";
function FileInput() {
  return (
    <div className="w-full flex flex-col items-end justify-end gap-y-[0.5rem]">
      <p className="flex flex-row-reverse justify-end gap-x-[0.63rem]">
        <span className="text-black-0">الصورة الشخصية</span>
        <span className="text-gray-2">(اختياري)</span>
      </p>

      <div className="flex items-center justify-start flex-row-reverse py-4 w-full gap-x-4">
        <div className="w-[4rem] h-[4rem] flex justify-center items-center bg-blue-1/70 rounded-full">
          <Image src={person} alt="person-icon" className="" />
        </div>
        <label className="cursor-pointer">
          <span className="px-4 py-2 text-blue-0 bg-blue-0/10">ارفاق صورة</span>
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}

export default FileInput;
