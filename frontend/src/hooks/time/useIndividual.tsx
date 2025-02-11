import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import styled from 'styled-components';
import { InPresent } from './InPresent';
import { useDispatch } from 'react-redux';
import { clickIndividualTime, dragTimes } from '../../modules/individual';

export const useIndividual = () => {
  const { PickWeek, PickTime } = useSelector((state: RootState) => ({
    PickWeek: state.individual.PickWeek,
    PickTime: state.individual.PickTime,
  }));
  const [isDown, onChangeDown] = useState({
    drag: false,
    key: 9999,
  });
  const dispatch = useDispatch();
  const onClickDrag = (time: number, day: number) => {
    dispatch(dragTimes({ time, day }));
  };
  const onClickTime = (time: number, day: number) => {
    dispatch(clickIndividualTime({ time, day }));
  };
  return { PickWeek, PickTime, onClickDrag, isDown, onChangeDown, onClickTime };
};

const TimeTableWrapper = styled.div`
  display: flex;
  width: 60%;
  height: 100%;
  padding: 1rem;
`;

const TimeTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Time = styled.div`
  display: grid;
  max-height: 30rem;
  grid-template-columns: repeat(8, 1fr);
  box-sizing: border-box;
  text-align: center;
`;

const DayOfWeek = styled.div`
  margin-top: 3rem;
  font-size: 1.2rem;
  font-weight: bolder;
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25);
  :nth-child(1) {
    box-shadow: none;
    color: white;
  }
  :nth-child(2) {
    color: red;
  }
  :nth-child(8) {
    color: blue;
  }
`;
export default function Individual() {
  const { PickWeek, PickTime, onClickDrag, isDown, onChangeDown, onClickTime } =
    useIndividual();
  return (
    <TimeTableWrapper>
      <TimeTableContainer>
        <Time>
          {PickWeek.map((day: any) => (
            <DayOfWeek key={day.day}>{day.day}</DayOfWeek>
          ))}

          {PickTime.map((time: any, index: number) => (
            <InPresent
              isDown={isDown}
              onChangeDown={onChangeDown}
              onClickDrag={onClickDrag}
              time={time}
              key={index}
              onClickTime={onClickTime}
            ></InPresent>
          ))}
        </Time>
      </TimeTableContainer>
    </TimeTableWrapper>
  );
}
