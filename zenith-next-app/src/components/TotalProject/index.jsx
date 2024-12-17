export const TotalProject = ({ styles, projects, text }) => {
  return (
    <div
      className={`cursor-pointer flex items-center justify-center w-[173px] h-[128px] rounded-[30px]  border-[1px] ${styles} `}
    >
      <div className="flex items-center justify-center flex-col">
        <span className={` text-[40px] lg:text-[48px] font-semibold ${styles}`}>
          {projects}
        </span>
        <h1 className={`text-[12px] lg:text-[14px] font-medium ${styles}`}>{text}</h1>
      </div>
    </div>
  );
};
