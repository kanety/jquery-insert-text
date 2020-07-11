describe('jquery-insert-text', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('insert', () => {
    let $textarea;

    beforeEach(() => {
      $textarea = $('#basic');
    });

    it('at caret', () => {
      $textarea.get(0).setSelectionRange(0, 6);
      $('#basic_caret').click();
      expect($textarea.val()).toEqual('INSERTED text');
    });

    it('at first', () => {
      $('#basic_first').click();
      expect($textarea.val()).toEqual('INSERTEDsample text');
    });

    it('at last', () => {
      $('#basic_last').click();
      expect($textarea.val()).toEqual('sample textINSERTED');
    });

    it('at specified position', () => {
      $('#basic_specified').click();
      expect($textarea.val()).toEqual('sampleINSERTED text');
    });
  });

  describe('contenteditable', () => {
    let $elem;

    beforeEach(() => {
      $elem = $('#editable');
    });

    it('at caret', () => {
      let $select = $elem.contents().filter((i, elem) => elem.nodeType == 3).last()
      let selection = document.getSelection();
      let range = document.createRange();
      range.setStart($select[0], 1);
      range.setEnd($select[0], 5);
      selection.removeAllRanges();
      selection.addRange(range);
      $('#editable_caret').click();
      expect($elem.text()).toEqual('sample INSERTED');
    });

    it('at first', () => {
      $('#editable_first').click();
      expect($elem.text()).toEqual('INSERTEDsample text');
    });

    it('at last', () => {
      $('#editable_last').click();
      expect($elem.text()).toEqual('sample textINSERTED');
    });

    it('at specified position', () => {
      $('#editable_specified').click();
      expect($elem.text()).toEqual('sampleINSERTED text');
    });
  });
});
