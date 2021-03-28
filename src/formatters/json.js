const json = (diff) => {
  const nodeObject = {
    nodes: diff,
  };
  return `${JSON.stringify(nodeObject, null, 2)}\n`;
};

export default json;
