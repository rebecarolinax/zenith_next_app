"use client"
import { ButtonUser } from "../Button"
import ImageColaborador from "../../../src/assets/Icons/ImageCard.svg"
import ImgColaborador from "../../../src/assets/Icons/ImgCard.svg"
import { EmailCollaborator, NameCard, TypeCollaborator } from "../Text"
import Image from "next/image"

export const CollaboratorCard = ({ NomeColaborador, TipoColaborador, EmailColaborador, ImgColaborador }) => {
  return (
    <div className=" shadow-sm w-[380px] bg-mainColors-white rounded-2xl lg:w-[270px] h-[350px] lg:h-[280px] items-center flex flex-col justify-evenly transition transform hover:-translate-y-2 hover:shadow-lg">
      <div className="relative h-[150px] w-[150px] rounded-full">
        <Image
          fill
          className="rounded-full object-cover"
          src={ImgColaborador}
        />
      </div>

      <div>
        <NameCard>{NomeColaborador}</NameCard>
        <TypeCollaborator>{TipoColaborador}</TypeCollaborator>
        <EmailCollaborator>{EmailColaborador}</EmailCollaborator>
      </div>
    </div>
  )
}

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
// import { Image } from "lucide-react";
import React from "react";

export default function Box() {
  return (
    <Card className="w-[359px]">
      <CardContent className="p-0">
        <AspectRatio ratio={359 / 136} className="bg-muted">
          <div className="h-full w-full flex items-center justify-center">
            <Image
              className="h-[136px] w-full object-cover"
              aria-label="Mask"
            />
          </div>
        </AspectRatio>
      </CardContent>
    </Card>
  );
}
