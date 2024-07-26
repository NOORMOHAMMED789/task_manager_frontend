import Link from "next/link";
import { getDateFormat } from "../Helpers";

const Card = ({ data }) => {
    return (
      <div className="px-1 py-1 flex gap-3 flex-col">
        {data.map((card) => (
          <div
            key={card?.taskId}
            className="bg-blue-200 px-2 py-2 rounded-md hover:bg-slate-200"
          >
            <div className="text-[12px] md:text-[16px] lg:text-[18px] font-bold mb-1">
              {card?.name}
            </div>
            <div className="text-[12px] md:text-[14px] lg:text-[16px] mb-1">
              {card?.description}
            </div>
            <div className="text-[12px] md:text-[14px] lg:text-[16px] mb-1 text-left">
              {getDateFormat(card.createdAt)}
            </div>
            <div className="text-right flex flex-row gap-3 justify-end items-end">
              <Link
                href={`/dashboard/tasks/delete/${card.taskId}`}
                className="px-1.5 hover:shadow-xl hover:cursor-pointer rounded-lg py-1.5 bg-red-400 text-white text-[12px] md:text-[14px] lg:text-[14px]"
              >
                Delete
              </Link>
              <Link
                href={`/dashboard/tasks/edit/${card.taskId}`}
                className="px-1.5 hover:shadow-xl hover:cursor-pointer rounded-lg py-1.5 bg-blue-400 text-white text-[12px] md:text-[14px] lg:text-[14px]"
              >
                Edit
              </Link>
              <Link
                href={`/dashboard/tasks/view-details/${card.taskId}`}
                className="px-1.5 hover:shadow-xl hover:cursor-pointer rounded-lg py-1.5 bg-blue-600 text-white text-[12px] md:text-[14px] lg:text-[14px]"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
}

export default Card