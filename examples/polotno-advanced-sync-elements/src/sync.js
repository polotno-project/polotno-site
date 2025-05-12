import { reaction } from 'mobx';

// Utility to throttle execution of a function
const throttle = (callback, timeout = 500) => {
  let timeoutId = null;
  return () => {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback();
    }, timeout);
  };
};

// Replace {pageNumber} in text elements with their actual page index
const updatePageNumber = (element) => {
  const store = element.store;
  const page = element.page;
  const index = store.pages.indexOf(page);
  const baseText = element.custom?.text || element.text;

  element.set({
    text: baseText.replaceAll('{pageNumber}', index + 1),
  });
};

let lastNumberOfPages = 0;
const syncElements = (store) => {
  if (store.selectedElements.some((el) => el._editModeEnabled)) return;

  // First, update page numbers for all relevant text elements
  store.find((item) => {
    if (item.type === 'text' && !item._editModeEnabled) {
      updatePageNumber(item);
    }
  });

  // if number of pages changed, we need to add sync elements to all pages that has no sync id
  if (lastNumberOfPages !== store.pages.length) {
    lastNumberOfPages = store.pages.length;
    // find a page with any sync elements
    const page = store.pages.find((page) => {
      return page.children.some((el) => el.custom?.syncId);
    });
    if (page) {
      const syncElements = page.children.filter((el) => el.custom?.syncId);
      // now iterate over all pages that has no sync id and add them
      store.pages.forEach((page) => {
        if (!page.children.some((el) => el.custom?.syncId)) {
          syncElements.forEach((el) => {
            const json = el.toJSON();
            delete json.id;
            page.addElement(json);
          });
        }
      });
    }
  }

  // Update all synced elements (same syncId) to match the selected one
  const syncElement = store.selectedElements.find((el) => el.custom?.syncId);
  if (!syncElement) return;

  const zIndex = syncElement.parent.children.indexOf(syncElement);
  store.find((item) => {
    if (
      item !== syncElement &&
      item.custom?.syncId === syncElement.custom.syncId
    ) {
      const sourceProps = { ...syncElement.toJSON() };
      // we don't need to sync id
      delete sourceProps.id;
      // we don't need to sync text, because it is synced via custom prop
      delete sourceProps.text;

      const currentProps = item.toJSON();
      Object.keys(sourceProps).forEach((key) => {
        const from = currentProps[key];
        const to = sourceProps[key];
        if (JSON.stringify(from) !== JSON.stringify(to)) {
          console.log('set', key, from, to);
          item.set({ [key]: to });
        }
      });
      const oldZIndex = item.parent.children.indexOf(item);
      if (oldZIndex !== zIndex) {
        item.setZIndex(zIndex);
      }
    }
  });
};

// Observe element removals and notify callback
const onElementRemove = (store, callback) => {
  let lastIds = {};

  store.on(
    'change',
    throttle(() => {
      const newIds = {};
      store.find((item) => {
        newIds[item.id] = item;
      });

      Object.keys(lastIds).forEach((id) => {
        if (!newIds[id]) {
          callback(lastIds[id]);
        }
      });

      lastIds = newIds;
    })
  );
};

// Remove all elements with the same syncId as the deleted one
const setupSyncDeletion = (store) => {
  onElementRemove(store, (element) => {
    const syncId = element.custom?.syncId;
    if (!syncId) return;

    const idsToDelete = [];
    store.find((item) => {
      if (item.custom?.syncId === syncId) {
        idsToDelete.push(item.id);
      }
    });

    store.deleteElements(idsToDelete);
  });
};

// Watch for changes in edit mode and trigger sync when edit ends
const setupEditReaction = (store) => {
  let lastEditElement = null;

  reaction(
    () => store.find((item) => item._editModeEnabled === true),
    (editElement) => {
      if (editElement) {
        editElement.set({
          text: editElement.custom?.text || editElement.text,
        });
        lastEditElement = editElement;
      } else {
        if (lastEditElement) {
          lastEditElement.set({
            custom: {
              ...lastEditElement.custom,
              text: lastEditElement.text,
            },
          });
        }
        syncElements(store);
      }
    }
  );
};

// Attach syncing on general store changes
const setupSyncOnChange = (store) => {
  store.on(
    'change',
    throttle(() => {
      syncElements(store);
    })
  );
};

// Public setup function to enable all syncing behavior
export function setupSync(store) {
  setupSyncDeletion(store);
  setupEditReaction(store);
  setupSyncOnChange(store);
}
