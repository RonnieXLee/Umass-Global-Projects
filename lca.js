function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) {
    return root;
  } else if (left || right) {
    return left || right;
  } else {
    return null;
  }
}

function lowestCommonAncestorShorthand(root, p, q) {
  if (!root || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestorShorthand(root.left, p, q);
  const right = lowestCommonAncestorShorthand(root.right, p, q);

  return left && right ? root : left || right;
}

module.exports = { TreeNode, lowestCommonAncestor };
