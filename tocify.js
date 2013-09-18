// `tocify.js`
// Minimalist Table of Contents generator for Markdown generated
// HTML documents.
// Developed by Romain Gaucher (@rgaucher), March 2013
(function($){
  var toc_root = "#toc";
  var toc_elmt = $(toc_root);
  var doc_anchor_char = "&#xb6;";
  var toc_max_depth = 3;
  var toc_document_root = "#document-container";
  var toc_document_root_headers = [];
  for (var i = 1; i<=toc_max_depth; i++) {
    toc_document_root_headers.push(toc_document_root + " h" + i.toString());
  }
  toc_document_root_headers = toc_document_root_headers.join(", ");

  if (toc_elmt === undefined) {
    console.log("The `toc_root` element must exist at this point...");
  }

  String.prototype.slugify = function() {
    return this.replace(/[^-a-zA-Z0-9,&\s]+/ig, '')
               .replace(/-/gi, "_")
               .replace(/\s/gi, "-")
               .toLowerCase();  
  };

  // We assume lots of stuff here. For now, for instance, this
  // only works with simple heading elements:
  //  <h1>Just text here</h1>
  // the nested HTML will be ignored.
  function extractTitle(elmt, level) {
    return $(elmt).text();
  }


  function appendSlugishAnchor(elmt, slug) {
    $(elmt)
    .prepend(
      $("<a />")
      .attr("name", slug)
      .text("")
    )
    .append(
      $("<a />")
      .attr("href", "#" + slug)
      .attr("class", "toc-anchor-char")
      .html(doc_anchor_char)
    );
  }


  function extractIndentLevel(headerTagName) {
    if (/^h(\d)$/i.test(headerTagName)) {
      return parseInt(headerTagName.charAt(1), 10);
    }
    return 1; // Default ident level is top-level
  }


  function appendTocElmt(current_title, current_slug, parent_elmt, add_slug) {
    var toc_element =
      $("<li />")
      .html(
        $("<a />")
        .attr("href", "#" + current_slug)
        .text(current_title)
      );

    //  .prepend('<span class="glyphicon glyphicon-minus"></span>');

    if (add_slug) {
      var slug_element = $("<ol />").text("");
      toc_element = toc_element.append(slug_element);
    }
    parent_elmt.append(toc_element);
    if (add_slug) {
      return slug_element;
    }
  }


  function retrieveHeaders(root_elmt, root_toc) {
    var indent_level = 1;
    var sized_stack = {
      0 : root_toc
    };

    $(toc_document_root_headers).each(function(index) {
      indent_level = extractIndentLevel(this.nodeName);

      if (!sized_stack.hasOwnProperty(indent_level)) {
        sized_stack[indent_level] = null;
      }

      // Extract info, append anchors
      var current_title = extractTitle(this);
      var current_slug = $(this).attr("id");
      if (!current_slug) {
        current_slug = current_title.slugify();
      }
      appendSlugishAnchor(this, current_slug);

      // Parent element to which we append a new toc-entry
      parent_elmt = sized_stack[indent_level - 1];
      if (parent_elmt !== null) {
	var add_slug = true;
	if (indent_level >= toc_max_depth) {
		add_slug = false;
	}
        var cur_elmt = appendTocElmt(current_title, current_slug, parent_elmt, add_slug);
        if (add_slug) {
          sized_stack[indent_level] = cur_elmt;
        }
      }
    });
  }


  function getDocumentRoot() {
    return $(toc_document_root);
  }


  function getRootElmt() {
    toc_elmt.append(
      $("<ol />")
      .attr("id", "toc-top-level")
    );
    return $("#toc-top-level");
  }

  retrieveHeaders(getDocumentRoot(), 
                  getRootElmt());

})(window.jQuery);