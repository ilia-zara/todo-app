import { createElement, clearRootElement } from "../../helpers.js";
import getBackToHomeButton from "../../events/statPageEvent.js";

function renderStatisticBlock(
  doc,
  totalCount,
  totalPostpone,
  totalComlpete,
  totalDelete
) {
  const statBlock = createElement(doc, "div");
  statBlock.id = "stat-block";
  const countAllTodo = createElement(doc, "p", "statistic-info");
  countAllTodo.innerHTML = `All Todos: ${totalCount}`;
  const countPostpone = createElement(doc, "p", "statistic-info");
  countPostpone.innerHTML = `Todos Postponed: ${totalPostpone}`;
  const countDone = createElement(doc, "p", "statistic-info");
  countDone.innerHTML = `Todos Completed: ${totalComlpete}`;
  const countDelete = createElement(doc, "p", "statistic-info");
  countDelete.innerHTML = `Todos Deleted: ${totalDelete}`;
  statBlock.append(countAllTodo);
  statBlock.append(countPostpone);
  statBlock.append(countDone);
  statBlock.append(countDelete);

  return statBlock;
}

function renderBackButton(doc) {
  const button = createElement(doc, "button", "back-button-stat-page");
  button.innerHTML = "Back to Todos list";
  return button;
}

export default function renderStatisticPage(
  doc,
  totalCount,
  totalPostpone,
  totalComlpete,
  totalDelete
) {
  const rootElement = clearRootElement(doc);

  const container = createElement(doc, "div");
  container.id = "container-statistic";

  const backButton = renderBackButton(doc);

  container.append(
    renderStatisticBlock(
      doc,
      totalCount,
      totalPostpone,
      totalComlpete,
      totalDelete
    )
  );
  container.append(backButton);
  rootElement.append(container);
  backButton.addEventListener("click", getBackToHomeButton);
}
