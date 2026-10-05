document.querySelectorAll('script[type^="math/tex"]').forEach(function (source) {
  var displayMode = source.type.indexOf('mode=display') !== -1;
  var output = document.createElement(displayMode ? 'div' : 'span');

  katex.render(source.textContent, output, {
    displayMode: displayMode,
    throwOnError: false
  });

  source.replaceWith(output);
});

renderMathInElement(document.body, {
  delimiters: [
    { left: '\\[', right: '\\]', display: true },
    { left: '\\(', right: '\\)', display: false }
  ],
  throwOnError: false
});
