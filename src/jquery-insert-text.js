import $ from 'jquery';
import InsertText from './insert-text';

$.fn.insertText = function(text, pos) {
  return this.each((i, elem) => {
    new InsertText($(elem)).run(text, pos);
  });  
};
