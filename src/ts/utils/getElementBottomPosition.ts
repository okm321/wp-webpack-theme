/**
 * 指定されたHTML要素の一番下部分の垂直位置を返す
 * @param el - HTMLエレメント
 */
export const getElementBottomPosition = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  return rect.bottom + scrollTop;
};
