"use client";

import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { IlustrasiCooking } from "../../../public/assets/index";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">
            <span className="font-semibold">Monday</span>, 12 April 2025
          </p>
        </div>
        <div className="flex justify-center items-center gap-8 bg-white rounded-lg p-8 w-full ">
          <div className="w-2/3">
            <h1 className="text-3xl font-semibold text-gray-900">
              Hi, Admin !
            </h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis et dolor neque earum est mollitia aperiam, assumenda
              repudiandae odit aspernatur.
            </p>
          </div>
          <div className="w-1/3 ">
            <Image
              src={IlustrasiCooking}
              alt="ilustrasi cooking"
              className="w-[300px] object-cover"
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-6  rounded-lg w-full">
          <div className="w-full bg-white rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Hi, Admin !
            </h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis et dolor neque earum est mollitia aperiam, assumenda
              repudiandae odit aspernatur.
            </p>
          </div>
          <div className="w-full bg-white rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Hi, Admin !
            </h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis et dolor neque earum est mollitia aperiam, assumenda
              repudiandae odit aspernatur.
            </p>
          </div>
          <div className="w-full bg-white rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Hi, Admin !
            </h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis et dolor neque earum est mollitia aperiam, assumenda
              repudiandae odit aspernatur.
            </p>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
