export function styled(tagName = requiredArg('tagName')) {
  return (...args) => {
    const styleString = computeString(args);

    if (isDOMElement(tagName)) {
      return applyStyle(tagName, styleString);
    }
    return createElement(tagName, styleString);
  };
}

styled.all = (selector) =>
  document.querySelectorAll(selector).map((element) => element);

export const setTheme = (styled.setTheme = (theme = {}) => {
  styled.theme = { ...styled.theme, ...theme };
});

export function createElement(tag, styles) {
  const element = document.createElement(tag);

  return applyStyle(element, styles);
}

export function applyStyle(element, styles) {
  const id = generateUID();
  const className = `SE${id}`;
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-styled-element', id);
  styleElement.innerHTML = `.${className} {
    ${styles}
  }`;
  document.head.appendChild(styleElement);
  element.classList.add(className);

  return element;
}

function computeString([strings, ...expressions]) {
  return strings
    .reduce((acc, currentString, i) => {
      const expression = expressions[i];
      if (typeof expression === 'function') {
        const func = expression;
        const props = {};
        props.theme = styled.theme;
        return `${acc}${currentString}${func(props)}`;
      }
      return `${acc}${currentString}${expression}`;
    }, '')
    .replace('undefined', '');
}

export function globalCSS(css = requiredArg('CSS')) {
  const styleString = computeString([css]);
  const element = document.createElement('style');
  const styleContent = document.createTextNode(styleString);
  element.appendChild(styleContent);
  document.head.appendChild(element);
  return element;
}

export function isDOMElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (
      typeof obj === 'object' &&
      obj.nodeType === 1 &&
      typeof obj.style === 'object' &&
      typeof obj.ownerDocument === 'object'
    );
  }
}

export function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);

  return firstPart + secondPart;
}

// prettier-ignore
export const tags = styled.tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b',
'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details',
'dfn', 'div', 'dl', 'doctype', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label',
'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'meter', 'nav',
'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre',
'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select',
'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table',
'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track',
'u', 'ul', 'var', 'video', 'wbr'];

styled.tags.forEach((tag) => (styled[tag] = styled(tag)));

function requiredArg(arg) {
  throw new Error(`${arg} is required`);
}

window.styled = styled;
