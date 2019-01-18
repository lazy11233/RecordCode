// 向上找到最近的指定组件
function findComponentUpward (context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
export { findComponentUpward };

// 向上找到所有指定组件
function findComponentsUpward (context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent);
      return parents.concat(findComponentUpward(parent, componentName));
    }
  } else {
    return [];
  }
}
export { findComponentsUpward };

// 向下找到最近的指定组件
function findComponentDownward (context, componentName) {
  const children = context.$children;
  let rlt = null;

  if (children.length) {
    for (const child of children) {
      const name = child.$options.name;

      if (name === componentName) {
        rlt = child;
        break;
      } else {
        rlt = findComponentDownward (child, componentName);
        if (rlt) break;
      }
    }
  }
  return rlt;
}
export { findComponentDownward };

// 向下找到所有指定组件
function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}
export { findComponentsDownward };

// 找到所有兄弟组件
function findBrotherComponents (context, componentName, exceptMe = true) {
  let rlt = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = rlt.findIndex(item => item._uid === context._uid);
  if (exceptMe) rlt.splice(index, 1);
  return rlt;
}
export { findBrotherComponents };
