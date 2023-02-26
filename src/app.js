import MyCalendar from './components/Calendar';

;(() => {
  MyCalendar('#app', (date) => {
    console.log(date);
  });
})();