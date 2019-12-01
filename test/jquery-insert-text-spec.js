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
});
