class Element {
  constructor(type,props,children){
    this.type=type;
    this.props=props;
    this.children=children;
  }
}
function createElement(type,props,children) {
  return new Element(type,props,children);
}

function setAttr(node,key,value) {
  switch(key){
    case 'value': //node为input或者textArea
          if(node.tagName.toUpperCase()=='INPUT'||node.tagName.toUpperCase()=='TEXTAREA'){
            node.value=value;
          }else{
            node.setAttribute(key,value);
          }
    break;
    case 'style':
      node.style.cssText=value;
    break;
    default:
      node.setAttribute(key,value);
    break;
  }
}

//渲染
function render(elObj) {
  let el=document.createElement(elObj.type);
  for(let key in elObj.props){
    //设置属性方法
    setAttr(el,key,elObj.props[key])
  }
  elObj.children.forEach(child=>{
    //防止子元素只是一个文本节点
    child=child instanceof Element?render(child):document.createTextNode(child);
    el.appendChild(child);
  })
  return el;
}

//渲染到页面中
function renderDom(el,target) {
  target.appendChild(el);
}
