'use client';
import React, { Children } from "react";

// export const TitleLogin = (props) => {
//   return (
//     <p className={`text-[14px] text-[#202224] font-normal mb-2 ${style}`}>
//       {children}
//     </p>
//   );
// };

export const TitleLogin = ({ children, styles }) => {
  return (
    <h1 className={`mb-16 text-mainColors-white sm:text-mainColors-white md:text-mainColors-white lg:text-mainColors-black sm:mb-0 font-poppins text-4xl sm:text-6xl md:text-5xl font-semibold ${styles}`}>
      {children}
    </h1>
  );
};

export const BlackTitle = ({ children, classname }) => {
  return (
    <h1 className={`text-[#343C6A] font-bold ${classname}`}>
      {children}
    </h1>
  );
};


export const DefaultParagraph = ({ children, className }) => {
  return (
    <p className={`${className} text-[#343C6A] text-[16px] leading-[24px]`}>
      {children}
    </p>
  );
};

export const NameCard = ({ children, style }) => {
  return (
    <p className={`text-[#343C6A] lg:text-base font-bold text-center text-2xl ${style}`}>
      {children}
    </p>
  )

}

export const TypeCollaborator = ({ children, style }) => {
  return (
    <p className={`text-[14px] text-[#202224] font-semibold opacity-60 text-center ${style}`}>
      {children}
    </p>
  )
}

export const EmailCollaborator = ({ children, style }) => {
  return (
    <p className={`text-[14px] text-[#202224] font-normal mb-2 ${style}`}>
      {children}
    </p>
  )
}

export const Title = ({ children, className }) => {
  return (
    <p className={`text-[hsl(var(--chart-1))] font-semibold text-[20px] leading-[24px] mt-12 ${className}`}>
      {children}
    </p>
  )
}

export const TitleHeader = ({ className, children }) => {
  return (
    <p className={`text-mainColors-black font-semibold text-[28px] ${className}`}>
      {children}
    </p>
  )
}

export const SubTitle = ({ children, classname }) => {
  return (
    <p className="w-[250px] h-[30px] text-[#343C6A] text-[24px] font-semibold">
      {children}
    </p>
  )

}

export const SmallTitle = ({ children, className }) => {
  return (
    <p className={`text-[#343C6A] font-semibold text-[20px] leading-[24px] ${className}`}>{children}</p>
  )
}



export const TypeTitleRisk = ({ children, classname }) => {
  return (
    <p className={`text-[hsl(var(--chart-1))] font-semibold text-[20px] leading-[24px] mt-12 ${classname}`}>{children}</p>
  )
}

export const Text = ({ children, className }) => {
  return (
    <p className={`text-base text-[#202224] font-normal ${className}`} >{children}</p>
  )
}



