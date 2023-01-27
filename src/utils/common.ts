
import memoizeOne from 'memoize-one';
import { rootName, scoreName } from "./constant";

export const $ = (name: string) => {
  return document.querySelector(name);
}

export const cel = (tagName: keyof HTMLElementTagNameMap) => {
  return document.createElement(tagName);
}

export const memoElement = memoizeOne(function (name) {
  return $(name);
})

export const getRoot = () => {
  return memoElement(rootName);
}
export const getScore = () => {
  return memoElement(scoreName);
}

export const shuffle = (array: string[]) => {
  var m = array.length,
    t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

