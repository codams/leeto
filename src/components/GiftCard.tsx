import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GiftIcon,
  HomeIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/16/solid";
import { format, formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ProgressBar } from "./ProgressBar";
import { listBeneficiaries } from "../helper/listBeneficiaries";

export type beneficiary = {
  id: number;
  type: "user" | "companion" | "child";
  firstName: string;
  consumption: {
    allowedAmount: number;
    consumedAmount: number;
  };
};

export type GiftCardDetail = {
  id: number;
  description: string;
  name: string;
  openingDate: string;
  closingDate: string;
  allowedAmount: number;
  consumedAmount: number;
  beneficiaries: beneficiary[];
};

export const GiftCardDetail = ({ giftCardId }: { giftCardId: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["gift-card-detail"],
    queryFn: async (): Promise<GiftCardDetail> => {
      const response = await fetch(
        `http://localhost:3000/gift-cards/${giftCardId}`
      );
      return await response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="flex text-xl animate animate-bounce">Chargement</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="m-2 -ml-1 flex gap-4 flex-col">
        <div className="bg-red-200 w-fit p-4 rounded mt-2">
          <GiftIcon className="size-4 text-red-700" />
        </div>
        <div>
          <h2 className="semi-bold text-2xl">{data.name}</h2>
          <div className="flex flex-row gap-2 text-gray-600 ">
            <div className="flex items-center">
              <CalendarIcon className="size-4 text-black inline" />
              <span>
                {format(data.openingDate, "d LLL yyy", { locale: fr })}
              </span>
              <span> - </span>
              <span>
                {format(data.closingDate, "d LLL yyy", { locale: fr })}
              </span>
            </div>

            <div className="flex items-center">
              <ClockIcon className="size-4 inline text-gray-500" />
              <span>
                Se cloture dans{" "}
                {formatDistance(data.closingDate, new Date(), { locale: fr })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">
              {data.allowedAmount - data.consumedAmount + " €"}
            </p>
            <p>disponibles</p>
          </div>
          <div className="flex flex-col justify-end text-gray-500 w-full">
            <div>
              {data.consumedAmount + " € dépensés"} /{" "}
              {data.allowedAmount + " €"}
            </div>
            <div className="flex gap-2 w-1/2 items-center">
              <ProgressBar
                value={data.consumedAmount}
                max={data.allowedAmount}
              />

              <div className="inline w-full text-gray-900">
                <span>
                  {(Math.round(
                    (data.consumedAmount / data.allowedAmount) * 100
                  ) *
                    10) /
                    10}{" "}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-2 rounded sm:w-full  text-gray-700">
          <h4 className="font-semibold">Description de la carte cadeau</h4>
          <p>{data.description}</p>
        </div>
        <div className="flex xl:flex-row gap-6 sm:flex-col w-full">
          <div className="w-full border p-6 sm:p-4 rounded border-gray-300 flex flex-col">
            <div className="p-2 bg-green-300 rounded w-fit">
              <HomeIcon className="size-6 text-green-800" />
            </div>
            <div>
              <p>
                Quel(s) ayant(s)-droit validés bénéficient de cette cagnotte ?
              </p>
              <p className="text-gray-500">
                {/* TODO Add emoji */}
                {listBeneficiaries(data.beneficiaries)}{" "}
                {data.beneficiaries.length > 1
                  ? "sont éligibles"
                  : "est éligible"}
                .
              </p>
            </div>
          </div>
          <div className="w-full border p-6 sm:p-4 rounded border-gray-300 flex flex-col">
            <div className="p-2 bg-green-300 rounded w-fit">
              <PresentationChartLineIcon className="size-6 text-green-800" />
            </div>
            <p>Suivi de consommation</p>
            <div className="w-full flex flex-wrap">
              {data.beneficiaries.map((beneficiary: beneficiary) => {
                // I don't think a got a backend for this
                return (
                  <div
                    className={`${beneficiary.type === "user" ? "w-full" : "w-1/2"} p-2`}
                    key={beneficiary.id}
                  >
                    <span className="text-gray-500 text-sm">
                      {beneficiary.type === "user"
                        ? "Vous-même ⸱ "
                        : beneficiary.firstName + " ⸱ "}
                      <span className="inlineBlock">
                        {beneficiary.consumption.consumedAmount} € /{" "}
                        {beneficiary.consumption.allowedAmount} €
                      </span>
                    </span>
                    <div className="flex flex-row items-center gap-2">
                      <ProgressBar
                        max={beneficiary.consumption.allowedAmount}
                        value={beneficiary.consumption.consumedAmount}
                      />
                      <div className="inline w-fit text-nowrap">
                        <span className="text-xs">
                          {(Math.round(
                            (beneficiary.consumption.consumedAmount /
                              beneficiary.consumption.allowedAmount) *
                              100
                          ) *
                            10) /
                            10}{" "}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TODO Get the progress bar in a component */}
            {/* TODO Loop through beneficiaries to display a progress bar for each */}
          </div>
        </div>
      </div>
    );
  }

  return <div>Oups, pas de données</div>;
};
