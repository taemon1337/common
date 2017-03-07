function documentChildrenList(children) {
  if(typeof children === 'string') {
    children = JSON.parse(children);
  }

  if(children && typeof children.map === 'function') {
    return children.map(function(child) {
      return "<span title='"+JSON.stringify(child)+"' class='label label-default'>"+child.filename+"</span>"
    }).join(' ');
  } else {
    return '';
  }
}
