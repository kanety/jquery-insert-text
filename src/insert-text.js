import $ from 'jquery';

export default class InsertText {
  constructor(elem) {
    this.$elem = $(elem);

    let tag = this.$elem.prop('tagName').toLowerCase();
    if (tag == 'input' || tag == 'textarea') {
      this.instance = new InputTag(this.$elem);
    } else {
      this.instance = new EditableTag(this.$elem);
    }
  }

  run(text, pos = 'caret') {
    this.$elem.focus();
    this.instance.insert(text, pos);
    this.$elem.focus();
  }
}

class InputTag {
  constructor(elem) {
    this.$elem = $(elem);
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

  insertAtCaret(text) {
    let start = this.$elem.get(0).selectionStart;
    let end = this.$elem.get(0).selectionEnd;
    this.insertAt(text, start, end);
  }

  insertAt(text, start, end = null) {
    end = end || start;

    let content = this.$elem.val();
    this.$elem.val(`${content.substring(0, start)}${text}${content.substring(end)}`);

    let pos = start + text.length
    this.$elem.get(0).setSelectionRange(pos, pos);
  }
}

class EditableTag {
  constructor(elem) {
    this.$elem = $(elem);
  }

  insert(text, pos) {
    switch (pos) {
    case 'caret':
      this.insertAtCaret(text);
      break;
    case 'first':
      this.insertAtFirst(text);
      break;
    case 'last':
      this.insertAtLast(text);
      break;
    default:
      this.insertAt(text, pos.selector, pos.position);
      break;
    } 
  }

  insertAtCaret(text) {
    let newNode = this.createNode(text);
    let selection = window.getSelection();
    let range = selection.getRangeAt(0); 
    range.deleteContents(); 
    range.insertNode(newNode);
    range.setStartAfter(newNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  insertAtFirst(text) {
    let newNode = this.createNode(text);
    this.$elem.prepend($(newNode));
    this.adjustSelection(newNode);
  }

  insertAtLast(text) {
    let newNode = this.createNode(text);
    this.$elem.append($(newNode));
    this.adjustSelection(newNode, false);
  }

  insertAt(text, selector, pos) {
    this.$elem.find(selector).each((i, elem) => {
      let $target = $(elem).contents().filter((i, elem) => elem.nodeType == 3).first();
      let newNode = this.createNode(text);
      let range = document.createRange();
      range.setStart($target.get(0), pos);
      range.insertNode(newNode);
    });
  }

  createNode(text) {
    let div = document.createElement('div');
    div.innerHTML = text;
    return div.firstChild; 
  }

  adjustSelection(node, after = true) {
    let selection = window.getSelection();
    let range = document.createRange();
    if (after) {
      range.setStartAfter(node);
    } else {
      range.setStartBefore(node);
    }
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
