import createElement from '../../utils/create';
import { dragStart, dragEnd, dragOver, dragEnter, dragLeave, dragDrop } from './dragnDrop';
import createCategoryList from './categories';
import renderHistory from './history';
import translatePage from '../settings/language';
import app from '../../app';

export default function renderTransactionsPage() {
  localStorage.setItem('currency', app.user.currency);

  const accountsDiv = createElement(
    'div',
    'transactions-dashboard__item accounts',
    "<h4 data-i18n='accounts'>Accounts</h4>",
  );
  const expensesDiv = createElement(
    'div',
    'transactions-dashboard__item expenses',
    "<h4 data-i18n='expenses'>Expenses</h4>",
  );
  const incomeDiv = createElement('div', 'transactions-dashboard__item income', "<h4 data-i18n='income'>Income</h4>");

  const dashboard = createElement('div', 'col-8 transactions-dashboard', [accountsDiv, expensesDiv, incomeDiv]);
  const history = createElement('div', 'col-4 transactions-history');

  const row = createElement('div', 'row', [dashboard, history]);

  const mainContainer = createElement('div', 'container-xxl transactions-container', row);

  document.querySelector('main').append(mainContainer);

  createCategoryList('accounts', accountsDiv);
  createCategoryList('expenses', expensesDiv);
  createCategoryList('income', incomeDiv);

  renderHistory().then(() => {
    translatePage();
  });

  const draggables = document.querySelectorAll('[draggable="true"]');
  const accounts = document.querySelectorAll('[draggable="false"]');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
    draggable.addEventListener('dragend', dragEnd);
  });

  accounts.forEach((account) => {
    account.addEventListener('dragover', dragOver);
    account.addEventListener('dragenter', dragEnter);
    account.addEventListener('dragleave', dragLeave);
    account.addEventListener('drop', dragDrop);
  });
}
