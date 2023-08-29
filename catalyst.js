"use strict";

import { rerender } from "./src/index";

var rendering = false;
var internalState;

function convertToHtml(vNode) {
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(`${vNode}`);
  }

  const $domElement = document.createElement(vNode.tagName);

  if (vNode.props.ui) {
    const styles = vNode.props.ui;
    Object.keys(styles).forEach((property) => {
      $domElement.style[property] = styles[property];
    });
  }

  if (vNode.props.onClick || vNode.props.onBlur) {
    Object.entries(vNode.props).forEach(([eventName, eventHandler]) => {
      $domElement.addEventListener(
        eventName === "onClick"
          ? "click"
          : eventName === "onBlur"
          ? "blur"
          : null,
        eventHandler
      );
    });
  }

  if (vNode.props.children) {
    vNode.props.children.forEach((vChild) => {
      const $child = convertToHtml(vChild);
      $domElement.appendChild($child);
    });
  }
  return $domElement;
}

function internalSetState(newState) {
  internalState = newState;
  rerender();
}

export function useState(initialState) {
  if (!rendering) {
    rendering = true;
    internalState = initialState;
  }
  return [internalState, internalSetState];
}
function createElement(elementType, props, ...children) {
  const vElementProps = {
    ...props,
    children,
  };
  if (typeof elementType === "function") {
    return elementType(vElementProps);
  }

  return {
    tagName: elementType,
    props: vElementProps,
  };
}
function render(initialVTree, $domRoot) {
  const $appHTML = convertToHtml(initialVTree);
  $domRoot.appendChild($appHTML);
}
export const Catalyst = { createElement, render };
