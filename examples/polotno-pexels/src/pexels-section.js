import React from "react";
import { InputGroup } from "@blueprintjs/core";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { getImageSize } from "polotno/utils/image";
import { SectionTab } from "polotno/side-panel";
import { useInfiniteAPI } from "polotno/utils/use-api";
import { t } from "polotno/utils/l10n";
import { getCrop } from "polotno/utils/image";
import SiPexels from "@meronex/icons/si/SiPexels";

// this is a demo key just for that project
// (!) please don't use it in your projects
// to create your own API key please go here: https://polotno.com/login
const key = "nFA5H9elEytDyPyvKL7T";

// use Polotno API proxy into Pexels
// WARNING: don't use on production! Use your own proxy and Pexles API key
const API = "https://api.polotno.com/api";
const getPexelsAPI = ({ query, page }) =>
  `${API}/get-pexels?query=${query}&per_page=20&page=${page}&KEY=${key}`;

export const PexelsPanel = ({ store }) => {
  const { setQuery, loadMore, isReachingEnd, data, isLoading, error } =
    useInfiniteAPI({
      defaultQuery: "",
      getAPI: ({ page, query }) => getPexelsAPI({ page, query }),
      getSize: (lastResponse) =>
        lastResponse.total_results / lastResponse.per_page,
    });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <InputGroup
        leftIcon="search"
        placeholder={t("sidePanel.searchPlaceholder")}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        type="search"
        style={{
          marginBottom: "20px",
        }}
      />
      <p style={{ textAlign: "center" }}>
        Photos by{" "}
        <a href="https://www.pexels.com/" target="_blank">
          Pexels
        </a>
      </p>
      <ImagesGrid
        images={data
          ?.map((item) => item.photos)
          .flat()
          .filter(Boolean)}
        getPreview={(image) => image.src.medium}
        onSelect={async (image, pos, element) => {
          // get url of image
          const src = image.src.large;

          // if we dropped image into svg element, le't apply mask for it
          if (element && element.type === "svg" && element.contentEditable) {
            element.set({ maskSrc: src });
            return;
          }

          // get image size
          const { width, height } = await getImageSize(src);

          // if we dropped into another image, let's just recalucate crop and apply new image
          if (element && element.type === "image" && element.contentEditable) {
            const crop = getCrop(element, {
              width,
              height,
            });
            element.set({ src, ...crop });
            return;
          }

          // otherwise let's create new image
          const x = (pos?.x || store.width / 2) - width / 2;
          const y = (pos?.y || store.height / 2) - height / 2;
          store.activePage?.addElement({
            type: "image",
            src,
            width,
            height,
            x,
            y,
          });
        }}
        isLoading={isLoading}
        error={error}
        loadMore={!isReachingEnd && loadMore}
        getCredit={(image) => (
          <span>
            Photo by{" "}
            <a href={image.photographer_url} target="_blank">
              {image.photographer}
            </a>{" "}
            on{" "}
            <a
              href="https://pexels.com/?utm_source=polotno&utm_medium=referral"
              target="_blank"
            >
              Pexels
            </a>
          </span>
        )}
      />
    </div>
  );
};

// define the new custom section
export const PexelsSection = {
  name: "pexels",
  Tab: (props) => (
    <SectionTab name="Pexels" {...props}>
      <SiPexels />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: PexelsPanel,
};
