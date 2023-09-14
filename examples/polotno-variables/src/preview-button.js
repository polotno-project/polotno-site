import React from 'react';
import { Button, Classes, Dialog } from '@blueprintjs/core';

const ExportModal = ({ isOpen, store, onClose }) => {
  return (
    <Dialog
      icon="info-sign"
      onClose={onClose}
      title="Generate Previews"
      isOpen={isOpen}
    >
      <div className={Classes.DIALOG_BODY}></div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Dialog>
  );
};

export const PreviewButton = ({ store }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <Button
        intent="primary"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        Preview
      </Button>
      <ExportModal
        store={store}
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};
