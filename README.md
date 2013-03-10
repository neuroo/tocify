# tocify
Minimalist table of contents generator for Markdown generated HTML.

*tocify* will scan the content of the document and extract the heading (`h1`, `h2`, etc.) until it reaches the `toc_max_depth` limit. 
The script will generate anchors for each header element and add a reference the heading element in the table of contents. 

*tocify* assumes that the heading are well structured and the nesting is implied based on the level of the heading element. That means that if you have a structure such as:
```html
<h1>Main</h1>
<h2>Child 1</h2>
<h2>Child 2</h2>
```

The generated TOC will be like this:
```
- Main
  - Child 1
  - Child 2
```

However, if the structure is not consistent:
```html
<h1>Root</h1>
<h2>Root Child</h2>
<h1>Main</h1>
<h3>Child 1</h3>
<h2>Child 2</h2>
```
The `Child 1` element will be attached to a previous `h2` element, which is `Root Child` in this example.



## Dependencies
*tocify* uses [jQuery](http://jquery.com) and [Bootstrap CSS](http://twitter.github.com/bootstrap).

# Using it
Set the variables to locate the document source and TOC destination:

- `toc_root`: destination of the TOC
- `toc_document_root`: the main container of the document
- `toc_max_depth`: maximum depth of the headers to retrieve (default: 3)

Then, just include the `tocify.js` script at the end of your HTML document:
```html
<script src="/path/to/tocify.js" type="text/javascript"></script>
```

## Custom CSS for anchors
An anchor is generated for each header element and appended to the header content. You can customize it using CSS:

```css
a.toc-anchor-char {
  margin-left:  5px;
  padding-left: 5px;
  padding-right:5px;
  color: #ddd;
}

a.toc-anchor-char:hover {
  color: #363636;
}

@media print {
  a.toc-anchor-char {
    display: none;
  }  
}
```


# Author
You can find me on twitter [@rgaucher](https://twitter.com/rgaucher)