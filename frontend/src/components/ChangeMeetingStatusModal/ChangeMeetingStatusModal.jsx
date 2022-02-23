import React, { useState, useEffect } from 'react';

import Modal from 'react-modal/lib/components/Modal';
import { useTranslation } from 'react-i18next';
import './ChangeMeetingStatusModal.scss';
import UpdateItemStatusModal from './UpdateItemStatusModal/UpdateItemStatusModal';
import ChangeMeetingStatusOuterModal from './ChangeMeetingStatusOuterModal/ChangeMeetingStatusOuterModal';
import MeetingItemStates from '../../constants/MeetingItemStates';

/**
 * This is a container component, that uses ChangesMeetingStatusOuterModal for the display of the
 * agenda item modal and its list of buttons and UpdateItemStatusModal
 *  for displaying the modal to change the item status
 *
 * props: item, itemRef, dropDownRef, setDisplaySetStatusModal, setDisableSort
 *    item
 *      The agenda item itself, from agendaItem.jsx
 *    itemRef
 *      Dom refernce to AgendaItem outer wrapper from agendaItem.jsx
 *    dropDownRef
 *      Dom reference to the button element in agendaItem.jsx
 *    setDisplaySetStatusModal
 *      Controls the display of the first outer modal
 *    setDisbleSort
 *      Disables sorting of agenda items while modal is displayed
 */

function buildButtonClasses(t) {
  return [
    {
      status: MeetingItemStates.PENDING,
      class: 'upComing',
      value: t('meeting.tabs.agenda.status.options.upcoming'),
    },
    {
      status: MeetingItemStates.IN_PROGRESS,
      class: 'inProgress',
      value: t('meeting.tabs.agenda.status.options.in-progress'),
    },
    {
      status: MeetingItemStates.COMPLETED,
      class: 'completed',
      value: t('meeting.tabs.agenda.status.options.completed'),
    },
    {
      status: 'toBeImplemented',
      class: 'onHold',
      value: t('meeting.tabs.agenda.status.options.on-hold'),
    },
    {
      status: MeetingItemStates.DEFERRED,
      class: 'deffered',
      value: t('meeting.tabs.agenda.status.options.deferred'),
    },
  ];
}

const ChangeMeetingStatusModal = ({
  item, itemRef, dropDownRef, setDisplaySetStatusModal, setDisableSort,
}) => {
  Modal.setAppElement('#root');
  const { t } = useTranslation();
  const [contentRef, setContentRef] = useState(null);
  const [showItemStatusModal, setShowItemStatusModal] = useState(false);
  const [buttonClasses] = useState(buildButtonClasses(t));
  const [oldStatus] = useState(buttonClasses.filter((elem) => elem.status === item.status)[0]);
  const [newStatus, setNewStatus] = useState(null);

  const modalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgb(31, 40, 71, 0.65)',
    },
  };

  useEffect(() => {
    // blur background, and hide the scroll bar it causes
    document.querySelector('#root').style.filter = 'blur(20px)';
    document.querySelector('#root').style.overflowX = 'hidden';

    return () => {
      // remove blur effect, reenable the scrollX
      document.querySelector('#root').style.filter = 'none';
      document.querySelector('#root').style.overflowX = 'visible';
    };
  }, []);

  return (
    <Modal contentRef={(node) => { setContentRef(node); }} style={modalStyle} className="ChangeMeetingStatusModal" isOpen>

      {!showItemStatusModal && (
      <ChangeMeetingStatusOuterModal
        contentRef={contentRef}
        item={item}
        itemRef={itemRef}
        dropDownRef={dropDownRef}
        setDisplaySetStatusModal={setDisplaySetStatusModal}
        setDisableSort={setDisableSort}
        setShowItemStatusModal={setShowItemStatusModal}
        setNewStatus={setNewStatus}
        buttonClasses={buttonClasses}
      />
      )}
      {showItemStatusModal
      && (
      <UpdateItemStatusModal
        setShowItemStatusModal={setShowItemStatusModal}
        item={item}
        oldStatus={oldStatus}
        newStatus={newStatus}
      />
      )}
    </Modal>
  );
};

export default ChangeMeetingStatusModal;
