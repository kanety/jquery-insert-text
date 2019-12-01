import $ from 'jquery';

export default class InsertText {
  constructor(elem) {
    this.$elem = $(elem);
  }

  run(text, pos = 'caret') {
    this.insert(text, pos);
    this.$elem.focus();
  }

  insert(text, pos) {
    switch (pos) {
    case 'caret':
      this.insertAtCaret(text);
      break;
    case 'first':
      this.insertAt(text, 0);
      break;
    case 'last':
      this.insertAt(text, this.$elem.val().length);
      break;
    default:
      this.insertAt(text, pos);
      break;
    } 
  }

  insertAt(text, start, end = null) {
    end = end || start;

    let body = this.$elem.val();
    this.$elem.val(`${body.substring(0, start)}${text}${body.substring(end)}`);

    let pos = start + text.length
    this.$elem.get(0).setSelectionRange(pos, pos);
  }

  insertAtCaret(text) {
    let start = this.$elem.get(0).selectionStart;
    let end = this.$elem.get(0).selectionEnd;
    this.insertAt(text, start, end);
  }
}
