import React from 'react';
import AskModal from '../common/AskModal';

const AskRemoveTestInfoModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title="시험 정보 삭제"
      description="시험 정보를 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveTestInfoModal;
