export function* composedAncestors(node: Node | null) {
  let current: Node | null = node;
  while (true) {
    current =
      current instanceof HTMLElement && current.assignedSlot
        ? current.assignedSlot
        : current instanceof ShadowRoot
        ? current.host
        : current.parentNode;
    if (current) {
      yield current;
    } else {
      break;
    }
  }
}

export function* selfAndComposedAncestors(node: Node | null) {
  if (node) {
    yield node;
    yield* composedAncestors(node);
  }
}

export function closestFocusableNode(node: Node | null) {
  for (const current of selfAndComposedAncestors(node)) {
    // @ts-ignore
    const target = current.focusTarget || current;
    const cast: any = target;
    const focusable =
      target instanceof HTMLElement &&
      target.tabIndex >= 0 &&
      !cast.disabled &&
      !(target instanceof HTMLSlotElement);
    if (focusable) {
      return target;
    }
  }
  return null;
}

/**
 * Return the first focusable element in the composed tree below the given root.
 * The composed tree includes nodes assigned to slots.
 *
 * This heuristic considers only the document order of the elements below the
 * root and whether a given element is focusable. It currently does not respect
 * the tab sort order defined by tabindex values greater than zero.
 */
export function firstFocusableElement(root: Node): HTMLElement | null {
  // CSS selectors for focusable elements from
  // https://stackoverflow.com/a/30753870/76472
  const focusableQuery =
    'a[href],area[href],button:not([disabled]),details,iframe,input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[contentEditable="true"],[tabindex]';
  // Walk the tree looking for nodes that match the above selectors.
  const walker = walkComposedTree(
    root,
    (node: Node) =>
      node instanceof HTMLElement &&
      node.matches(focusableQuery) &&
      node.tabIndex >= 0
  );
  // We only actually need the first matching value.
  const { value } = walker.next();
  // value, if defined, will always be an HTMLElement, but we do the following
  // check to pass static type checking.
  return value instanceof HTMLElement ? value : null;
}

/**
 * Walk the composed tree at the root for elements that pass the given filter.
 */
function* walkComposedTree(
  node: Node,
  filter: Function
): IterableIterator<Node> {
  if (filter(node)) {
    yield node;
  }
  let children;
  if (node instanceof HTMLElement && node.shadowRoot) {
    children = node.shadowRoot.children;
  } else {
    const assignedNodes =
      node instanceof HTMLSlotElement
        ? node.assignedNodes({ flatten: true })
        : [];
    children = assignedNodes.length > 0 ? assignedNodes : node.childNodes;
  }
  if (children) {
    for (let i = 0; i < children.length; i++) {
      yield* walkComposedTree(children[i], filter);
    }
  }
}
