# jquery-insert-text

Insert text to input or editable element.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-insert-text --save

## Usage

Insert text at caret position of `<textarea>` or `contenteditable` elements:

```html
<textarea>sample text</textarea>
<div contenteditable="true">sample text</div>
```

```javascript
$('textarea').insertText('YOUR TEXT');
$('div[contenteditable]').insertText('YOUR TEXT');
```

### Options

Insert text at first position:

```javascript
$('textarea').insertText('YOUR TEXT', 'first');
```

Insert text at last position:

```javascript
$('textarea').insertText('YOUR TEXT', 'last');
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
