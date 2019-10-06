export function adjustParentPosition(element: HTMLElement) {
  if (!element) return;
  let parent = element.parentElement as HTMLElement;
  element.style.visibility = 'hidden';
  if (parent) {
    parent.style.position = 'relative';
    element.style.visibility = 'visible';
  } else {
    console.warn(
      `react-use-fetcher cannot set this component's parent element position to 'relative'`
    );
  }
}

export function adjustBorderRadius(element: HTMLElement) {
  if (!element) return;
  let child = element.children[0] as HTMLElement;
  if (child) {
    element.style.borderRadius = child.style.borderRadius;
  } else {
    console.warn(`react-use-fetcher couldn't adjust the wrapper's border radius`);
  }
}
