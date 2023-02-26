import { createTrs } from '../utils';
import {
  MONTHS
} from './config';

const domPool = {
  controlArea: null,
  monthNode: null
}

export function createMonthControlArea (year) {
  if (!domPool.controlArea) {
    domPool.controlArea = document.createElement('div');
    domPool.controlArea.className = 'month-control-area';

    domPool.controlArea.innerHTML = `
      <span class="month-control-btn btn-year-lt">&lt;&lt;</span>
      <span class="control-show">
        <span class="control-title">
          <span class="title-year">${ year }</span>
        </span>
      </span>
      <span class="month-control-btn btn-year-gt">&gt;&gt;</span>
    `
  } else {
    domPool.controlArea.querySelector('.title-year').innerText = year;
  }

  return domPool.controlArea;
}

export function createMonthNode (month) {
  if (!domPool.monthNode) {
    domPool.monthNode = createTrs(4); // [tr, tr, tr, tr]

    let index = 0;

    domPool.monthNode.forEach(tr => {
      for (let i = 0; i < 3; i ++) {
        const oTd = document.createElement('td');
        oTd.className = 'static-month';
        oTd.setAttribute('data-month', index + 1);
        
        if (index + 1 === month) {
          oTd.className += ' current';
        }

        oTd.innerText = MONTHS[index ++];
        tr.appendChild(oTd);
      }
    })
  }

  return domPool.monthNode;
}