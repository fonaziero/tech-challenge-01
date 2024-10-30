"use client";

import PixelTop from "@/app/assets/Pixels1TopRight.png";
import PixelBottom from "@/app/assets/Pixels2BottomLeft.png";
import Cash from "@/app/assets/Ilustração1.png";
import CardContainer from "../card/container";
import { User } from "@/app/interfaces/user";

type BalanceCardProps = {
  user: User;
};

export default function BalanceCard({ user }: BalanceCardProps) {
  const currentDate = new Date();
  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const formattedDate = `${daysOfWeek[currentDate.getDay()]}, ${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;

  return (
    <CardContainer className="bg-darkBlue text-white items-center md:items-start mb-8">
      <img
        src={PixelTop.src}
        alt="Pixels Top Right"
        className="block md:block lg:hidden absolute top-0 left-0 sm:right-0 sm:left-auto"
      />
      <img
        src={PixelBottom.src}
        alt="Pixels Bottom Left"
        className="block md:block lg:hidden absolute bottom-0 right-0 sm:left-0 "
      />

      <div className="flex flex-col sm:h-full sm:w-full">
        <h2 className="text-lg font-semibold mb-10">Olá, {user?.name} ! :)</h2>
        <p className="text-xs">{formattedDate}</p>
      </div>
      <div className="flex flex-1 h-full w-full gap-10 sm:gap-0 flex-col sm:flex-row-reverse lg:flex-row justify-between lg:justify-end sm:pe-16">
        <div className="w-auto h-full flex self-center sm:self-start ">
          <div className="sm:w-full sm:text-left">
            <div className="border-b-2 border-white lg:border-red flex items-center gap-5 pb-3">
              <h3 className="text-md font-semibold">Saldo</h3>
              <span className="text-sm p-0 m-0 ">
                <i className={`fas fa-eye text-white lg:text-red`}></i>
              </span>
            </div>
            <div className="mt-3">
              <p className="text-sm mt-2">Conta Corrente</p>
              <h1 className="text-xl mt-1">
                {`R$ ${user.balance.toFixed(2)}`}
              </h1>
            </div>
          </div>
        </div>
        <div className="lg:hidden h-full w-full md:w-1/3 sm:w-1/2 sm:self-end self-center">
          <img
            src={Cash.src}
            alt="Pixels Bottom Left"
            className="block md:block lg:hidden h-full w-full z-10 relative"
          />
        </div>
      </div>
    </CardContainer>
  );
}