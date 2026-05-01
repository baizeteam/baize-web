"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const EDITOR_URL = "https://baize-editor.plume.vip?roomid=1";

export default function BaizeEditor() {
  const t = useTranslations("baizeEditorUI");
  const [loading, setLoading] = useState(true);

  return (
    <section className="py-8 md:py-12">
      <div className={"container"}>
        <div
          className={
            "relative aspect-video w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg dark:border-gray-700"
          }
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <div className="flex flex-col items-center gap-3">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t("loading")}
                </span>
              </div>
            </div>
          )}
          <iframe
            src={EDITOR_URL}
            className="h-full w-full"
            onLoad={() => setLoading(false)}
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </div>
    </section>
  );
}
