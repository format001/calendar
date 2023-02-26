import { createTable } from '../creator';
import {
  createWeekDaysNode,
  createDateNode,
  createControlArea
} from './creator';

import './index.scss';

export function render (container, year, month) {
  container.innerHTML = '';
  const oTable = createTable('my-calendar-table');
  const oTHead = document.createElement('thead');
  const oTBody = document.createElement('tbody');
  oTHead.className = 'my-calendar-head';
  oTBody.className = 'my-calendar-body';

  const controlArea = createControlArea(year, month);
  const weekDayNode = createWeekDaysNode();
  const dateTrs = createDateNode(year, month);

  oTHead.appendChild(weekDayNode);
  dateTrs.forEach(tr => {
    oTBody.appendChild(tr);
  })

  oTable.appendChild(oTHead);
  oTable.appendChild(oTBody);
  container.appendChild(controlArea);
  container.appendChild(oTable);
}

export function update (year, month) {
  const oTBody = document.querySelector('.my-calendar-body');
  const oTitleYear = document.querySelector('.title-year');
  const oTitleMonth = document.querySelector('.title-month');
  const dateTrs = createDateNode(year, month);
  
  oTBody.innerHTML = '';
  oTitleYear.innerText = year;
  oTitleMonth.innerText = month;

  dateTrs.forEach(tr => {
    oTBody.appendChild(tr);
  })
}