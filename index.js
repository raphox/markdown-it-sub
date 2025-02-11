// Process _italic_, *bold*, ~strike~

"use strict";

// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

function italic(state, silent) {
  var found,
    content,
    token,
    max = state.posMax,
    start = state.pos;

  if (state.src.charCodeAt(start) !== 0x5f /* _ */) {
    return false;
  }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 2 >= max) {
    return false;
  }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x5f /* _ */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token = state.push("italic_open", "em", 1);
  token.markup = "_";

  token = state.push("text", "", 0);
  token.content = content.replace(UNESCAPE_RE, "$1");

  token = state.push("italic_close", "em", -1);
  token.markup = "_";

  state.pos = state.posMax + 1;
  state.posMax = max;

  return true;
}

function bold(state, silent) {
  var found,
    content,
    token,
    max = state.posMax,
    start = state.pos;

  if (state.src.charCodeAt(start) !== 0x2a /* * */) {
    return false;
  }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 2 >= max) {
    return false;
  }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x2a /* * */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token = state.push("bold_open", "strong", 1);
  token.markup = "*";

  token = state.push("text", "", 0);
  token.content = content.replace(UNESCAPE_RE, "$1");

  token = state.push("bold_close", "strong", -1);
  token.markup = "*";

  state.pos = state.posMax + 1;
  state.posMax = max;

  return true;
}

function strike(state, silent) {
  var found,
    content,
    token,
    max = state.posMax,
    start = state.pos;

  if (state.src.charCodeAt(start) !== 0x7e /* ~ */) {
    return false;
  }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 2 >= max) {
    return false;
  }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x7e /* ~ */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token = state.push("strike_open", "strike", 1);
  token.markup = "~";

  token = state.push("text", "", 0);
  token.content = content.replace(UNESCAPE_RE, "$1");

  token = state.push("strike_close", "strike", -1);
  token.markup = "~";

  state.pos = state.posMax + 1;
  state.posMax = max;

  return true;
}

module.exports = function whatsapp_plugin(md) {
  md.inline.ruler.after("escape", "italic", italic);
  md.inline.ruler.after("italic", "bold", bold);
  md.inline.ruler.after("bold", "strike", strike);
};
