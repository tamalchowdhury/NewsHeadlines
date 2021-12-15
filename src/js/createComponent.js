export default function createComponent(classNames = [], tag = 'div') {
  const element = document.createElement(tag)
  element.classList.add(...classNames)
  return element
}
