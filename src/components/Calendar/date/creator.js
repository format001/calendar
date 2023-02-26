import { WEEK_DAYS } from './config';
import { 
  getLastMonthRestDays, 
  getMonthDayCount, 
  getNextMonthRestDays,
  getFormatDate
} from './utils';

import {
  getDateInfo,
  createTrs
} from '../utils';

const domPool = {
  weekDays: null,
  controlArea: null
}

export function createWeekDaysNode () {
  if (!domPool.weekDays) {
    domPool.weekDays = document.createElement('tr');
    domPool.weekDays.className = 'week-day';

    domPool.weekDays.innerHTML = WEEK_DAYS.map(item => (
      `<th>${ item }</th>`
    )).join('');
  }

  return domPool.weekDays;
}

export function createDateNode (year, month) {
  const lastMonthRestDays = getLastMonthRestDays(year, month);
  const currentMonthDayCount = getMonthDayCount(year, month);
  const nextMonthRestDays = getNextMonthRestDays(year, month);
  const dateTrArr = createTrs(6);

  const lastMonthRestDaysTD = createRestDaysTD(lastMonthRestDays);
  const currentMonthDaysTD = createCurrentDaysTD(currentMonthDayCount, year, month);
  const nextMonthRestDaysTD = createRestDaysTD(nextMonthRestDays);

  const tdArr = [
    ...lastMonthRestDaysTD,
    ...currentMonthDaysTD,
    ...nextMonthRestDaysTD
  ];

  let index = 0;

  dateTrArr.forEach(tr => {
    for (var i = 0; i < 7 && tdArr[index]; i ++) {
      tr.appendChild(tdArr[index ++]);
    }
  });

  return dateTrArr;
}

function createRestDaysTD (restDays) {
  return restDays.map(item => {
    const oTd = document.createElement('td');
    oTd.className = 'day rest-day';
    oTd.innerText = item;

    return oTd;
  })
}

function createCurrentDaysTD (currentDayCount, year, month) {
  let tdArr = [];

  const [
    currentYear,
    currentMonth,
    currentDate
  ] = getDateInfo();

  for (let i = 1; i <= currentDayCount; i ++) {
    const oTd = document.createElement('td');
    oTd.className = 'day current-day';
    
    if (currentYear === year && currentMonth === month && currentDate === i) {
      oTd.className += ' current';
    }

    oTd.innerText = i;
    oTd.setAttribute('data-date', getFormatDate(year, month, i));
    tdArr.push(oTd);
  }

  return tdArr;
}

export function createControlArea (year, month) {
  
  if (!domPool.controlArea) {
    domPool.controlArea = document.createElement('div');
    domPool.controlArea.className = 'control-area';

    domPool.controlArea.innerHTML = `
      <span class="control-btn btn-year-lt">&lt;&lt;</span>
      <span class="control-btn btn-month-lt">&lt;</span>
      <span class="control-show">
        <span class="control-title">
          <span class="title-year">${ year }</span>年
        </span>
        <span class="control-title">
          <span class="title-month">${ month }</span>月
        </span>
      </span>
      <span class="control-btn btn-month-gt">&gt;</span>
      <span class="control-btn btn-year-gt">&gt;&gt;</span>
    `;
  } else {
    domPool.controlArea.querySelector('.title-year').innerText = year;
    domPool.controlArea.querySelector('.title-month').innerText = month;
  }

  return domPool.controlArea;
}