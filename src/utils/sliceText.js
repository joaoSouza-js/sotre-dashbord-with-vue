export function sliceText(text="",maxLength=0,concat = '' ){
    const formatTitle = text.length > maxLength 
    ? product.title.slice(0, maxLength).concat(concat) 
    : text
  return formatTitle
}