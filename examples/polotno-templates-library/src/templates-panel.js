import React from "react";
import { observer } from "mobx-react-lite";
import { useSWRInfinite } from "swr";

import { SectionTab } from "polotno/side-panel";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";

import { ImagesGrid } from "polotno/side-panel/images-grid";

export const TemplatesPanel = observer(({ store }) => {
  // load data
  const { data, error, mutate, size, setSize } = useSWRInfinite(
    (index) => `templates/page${index + 1}.json`
  );

  // do some calculations from the hook above
  const isLoadingInitialData = !data && !error;
  const isLoading =
    isLoadingInitialData ||
    !!(size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[0].total_pages === size);

  const loadMore = () => {
    if (!isReachingEnd) {
      setSize(size + 1);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <ImagesGrid
        shadowEnabled={false}
        images={data?.map((data) => data.items).flat()}
        getPreview={(item) => `/templates/${item.preview}`}
        isLoading={isLoading}
        onSelect={async (item) => {
          // download selected json
          const req = await fetch(`/templates/${item.json}`);
          const json = await req.json();
          // just inject it into store
          store.loadJSON(json);
        }}
        loadMore={loadMore}
        rowsNumber={1}
      />
    </div>
  );
});

// define the new custom section
export const TemplatesSection = {
  name: "templates",
  Tab: (props) => (
    <SectionTab name="Templates" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: TemplatesPanel
};
