import React from 'react';
import Datetime from 'react-datetime';
import '../../react-datetime.css';
import { MdDateRange } from 'react-icons/md';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const DateInputWrapper = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
`;
const DateInput = styled.input`
  border: 1px solid ${palette.gray[5]};
  font-size: 1rem;
  width: 160px;
  text-align: center;
  margin-left: 10px;
`;

const OpenCalendarWrapper = styled.span`
  font-size: 1.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  align-items: center;
  text-align: center;

  &:hover {
    color: ${palette.gray[4]};
  }
`;

const MyDatePicker = ({ onChangeField, title = '날짜', selectedDate = '' }) => {
  const handleChange = e => {
    onChangeField({
      key: 'testDate',
      value: {
        year: e.format('YYYY'),
        month: e.format('M'),
        day: e.format('D'),
      },
    });
  };
  const renderInput = (props, openCalendar, closeCalendar) => {
    const clear = () => {
      props.onChange({ target: { value: '' } });
    };

    return (
      <DateInputWrapper>
        <h3>{title} : </h3>
        <DateInput {...props} />
        <OpenCalendarWrapper>
          <MdDateRange onClick={openCalendar}></MdDateRange>
        </OpenCalendarWrapper>
      </DateInputWrapper>
    );
  };

  return (
    <Datetime
      locale={'ko-kr'}
      defaultValue={selectedDate}
      timeFormat={false}
      dateFormat="YYYY년 M월 D일"
      onChange={handleChange}
      renderInput={renderInput}
      closeOnSelect={true}
    />
  );
};

export default MyDatePicker;
