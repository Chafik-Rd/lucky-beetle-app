"use client";

import { useLanguageStore } from "@/src/contexts/LanguageStore";
import { Mail, MapPin, Phone } from "lucide-react";

export const Contact = () => {
  const trans = useLanguageStore((state) => state.trans);

  return (
    <div className="border-t border-gray-50 bg-[#FFFFFF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h1 className="text-primary mb-6 font-serif text-4xl font-bold">
              {trans.contact.title}
            </h1>
            <p className="mb-8 leading-relaxed text-gray-500">
              {trans.contact.subtitle}
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-full p-3">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {trans.contact.address}
                  </h4>
                  <p className="text-sm text-gray-500">
                    123 Green Rd, Bangkok 10900
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-full p-3">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {trans.contact.phone}
                  </h4>
                  <p className="text-sm text-gray-500">089-999-9999</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-full p-3">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {trans.contact.email}
                  </h4>
                  <p className="text-sm text-gray-500">hello@luckybeetle.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-[#F8F9FA] p-8">
            <h3 className="text-primary mb-6 text-xl font-bold">
              {trans.contact.formTitle}
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 px-4 py-3"
                placeholder={trans.contact.namePlace}
              />
              <input
                type="email"
                className="w-full rounded-lg border border-gray-200 px-4 py-3"
                placeholder="name@example.com"
              />
              <textarea
                rows={4}
                className="w-full rounded-lg border border-gray-200 px-4 py-3"
                placeholder={trans.contact.msgPlace}
              ></textarea>
              <button
                type="button"
                className="bg-primary w-full rounded-lg py-3 font-bold text-white"
              >
                {trans.contact.sendBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
