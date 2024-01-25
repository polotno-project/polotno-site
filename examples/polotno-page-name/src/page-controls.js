import React from 'react';
import { observer } from 'mobx-react-lite';

import { Button, EditableText, Tooltip } from '@blueprintjs/core';
import { t } from 'polotno/utils/l10n';

export const PageControls = observer(({ store, page, xPadding, yPadding }) => {
  const hasManyPages = store.pages.length > 1;
  const index = store.pages.indexOf(page);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: yPadding - 35 + 'px',
          left: xPadding + 'px',
        }}
      >
        <EditableText
          // we can use custom data to store page name into store
          value={page.custom?.name || 'Untitled page'}
          onChange={(val) => {
            page.set({
              custom: {
                ...page.custom,
                name: val,
              },
            });
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: yPadding - 40 + 'px',
          right: xPadding + 'px',
        }}
      >
        {hasManyPages && (
          <Tooltip content={t('workspace.moveUp')} disabled={index === 0}>
            <Button
              icon="chevron-up"
              minimal
              disabled={index === 0}
              onClick={() => {
                page.setZIndex(index - 1);
              }}
            ></Button>
          </Tooltip>
        )}
        {hasManyPages && (
          <Tooltip
            content={t('workspace.moveDown')}
            disabled={index === store.pages.length - 1}
          >
            <Button
              icon="chevron-down"
              minimal
              disabled={index === store.pages.length - 1}
              onClick={() => {
                const index = store.pages.indexOf(page);
                page.setZIndex(index + 1);
              }}
            ></Button>
          </Tooltip>
        )}
        <Tooltip content={t('workspace.duplicatePage')}>
          <Button
            icon="duplicate"
            minimal
            onClick={() => {
              page.clone();
            }}
          ></Button>
        </Tooltip>
        {hasManyPages && (
          <Tooltip content={t('workspace.removePage')}>
            <Button
              icon="trash"
              minimal
              onClick={() => {
                store.deletePages([page.id]);
              }}
            ></Button>
          </Tooltip>
        )}
        <Tooltip content={t('workspace.addPage')}>
          <Button
            icon="insert"
            minimal
            onClick={() => {
              const newPage = store.addPage({
                bleed: store.activePage?.bleed || 0,
              });
              const index = store.pages.indexOf(page);
              newPage.setZIndex(index + 1);
            }}
          ></Button>
        </Tooltip>
      </div>
    </>
  );
});
