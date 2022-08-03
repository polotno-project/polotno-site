import React from 'react';
import DocItemFooter from '@theme-original/DocItemFooter';
import Giscus from '@giscus/react';

export default function DocItemFooterWrapper(props) {
  return (
    <>
      <DocItemFooter {...props} />
      <br />
      <br />
      <Giscus
        id="comments"
        repo="polotno-project/polotno-site"
        repoId="MDEwOlJlcG9zaXRvcnkyNDUxOTM5OTE="
        category="Comments"
        categoryId="DIC_kwDODp1dB84CQmcc"
        mapping="pathname"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </>
  );
}
